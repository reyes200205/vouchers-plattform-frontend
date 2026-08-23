<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { roleCode, user } = useAuth()
const isCoordinator = computed(() => roleCode.value === 'coordinator')

const { createApplication, uploadApplicationDocument } = useApplications()
const toast = useToast()
const router = useRouter()

// El coordinador solo pertenece a una sucursal: las solicitudes que registra
// siempre son de esa sucursal, no puede elegir otra.
const coordinatorRole = computed(() => user.value?.roles?.find(r => r.code === 'coordinator') ?? null)
const coordinatorBranchId = computed(() => coordinatorRole.value?.branch_id ?? null)
const coordinatorBranchName = computed(() => coordinatorRole.value?.branch_name ?? null)

const schema = z.object({
  branch_id: z.number({ error: 'Tu usuario no tiene una sucursal asignada' }),
  first_name: z.string().min(2, 'El nombre es obligatorio y debe tener al menos 2 letras'),
  middle_name: z.string().optional(),
  last_name: z.string().min(2, 'El apellido paterno es obligatorio y debe tener al menos 2 letras'),
  second_last_name: z.string().optional(),
  gender: z.string().min(1, 'El género es obligatorio'),
  birth_date: z.string().min(1, 'La fecha de nacimiento es obligatoria').refine(value => {
    if (!value) return false
    const birth = new Date(value)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age >= 18
  }, 'El solicitante debe ser mayor de 18 años'),
  curp: z.string().min(1, 'La CURP es obligatoria').length(18, 'La CURP debe tener exactamente 18 caracteres').refine(value => isValidCurp(value), 'CURP inválida (18 caracteres, formato oficial)'),
  rfc: z.string().min(1, 'El RFC es obligatorio').length(13, 'El RFC debe tener exactamente 13 caracteres (Persona Física)').refine(value => isValidRfc(value), 'RFC con formato inválido'),
  home_phone: z.string().optional(),
  mobile_phone: z.string().min(10, 'El teléfono móvil debe tener al menos 10 dígitos'),
  email: z.string().min(1, 'El correo electrónico es obligatorio').email('Correo electrónico inválido'),
  street: z.string().min(1, 'La calle es obligatoria'),
  external_number: z.string().min(1, 'El número exterior es obligatorio'),
  neighborhood: z.string().min(1, 'La colonia es obligatoria'),
  city: z.string().min(1, 'La ciudad es obligatoria'),
  state: z.string().min(1, 'El estado es obligatorio'),
  postal_code: z.string().min(1, 'El código postal es obligatorio').length(5, 'El código postal debe tener exactamente 5 dígitos'),
  notes: z.string().optional(),
  requested_credit_limit: z.number({ error: 'Captura el límite de crédito solicitado' })
    .min(1000, 'El límite de crédito solicitado debe ser de al menos $1,000'),
  // Datos adicionales para la distribuidora
  applicant_age: z.number({ error: 'Captura la edad del solicitante' })
    .min(18, 'El solicitante debe ser mayor de edad (18 años o más)'),
  occupation_type: z.string().min(1, 'Selecciona la ocupación'),
  occupation_place: z.string().min(1, 'El lugar de ocupación es obligatorio'),
  occupation_position: z.string().min(1, 'El puesto o grado es obligatorio'),
  occupation_phone: z.string().min(1, 'El teléfono de ocupación es obligatorio'),
  occupation_years: z.number({ error: 'Especifica la antigüedad' }).min(0, 'La antigüedad no puede ser negativa'),
  housing_ownership_type: z.string().min(1, 'Selecciona la tenencia de vivienda'),
  housing_dimensions: z.string().min(1, 'Las dimensiones son obligatorias'),
  housing_years: z.number({ error: 'Especifica los años de vivienda' }).min(0, 'Los años no pueden ser negativos'),
  work_reference_name: z.string().min(1, 'La referencia laboral es obligatoria'),
  work_reference_phone: z.string().min(1, 'El teléfono de referencia es obligatorio')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  branch_id: coordinatorBranchId.value ?? undefined,
  first_name: '',
  middle_name: '',
  last_name: '',
  second_last_name: '',
  gender: undefined,
  birth_date: '',
  curp: '',
  rfc: '',
  home_phone: '',
  mobile_phone: '',
  email: '',
  street: '',
  external_number: '',
  neighborhood: '',
  city: '',
  state: '',
  postal_code: '',
  notes: '',
  requested_credit_limit: undefined,
  applicant_age: undefined,
  occupation_type: undefined,
  occupation_place: '',
  occupation_position: '',
  occupation_phone: '',
  occupation_years: undefined,
  housing_ownership_type: undefined,
  housing_dimensions: '',
  housing_years: undefined,
  work_reference_name: '',
  work_reference_phone: ''
})

// Familiares y cónyuge del solicitante
interface FamilyMember {
  name: string
  relationship: string
  phone: string
  age: number | undefined
}

const familyMembers = ref<FamilyMember[]>([{ name: '', relationship: '', phone: '', age: undefined }])

function addFamilyMember() {
  familyMembers.value.push({ name: '', relationship: '', phone: '', age: undefined })
}

function removeFamilyMember(index: number) {
  familyMembers.value.splice(index, 1)
}

// Vehículos del solicitante (si tiene)
interface Vehicle {
  brand: string
  model: string
  year: string
  plates: string
}

const vehicles = ref<Vehicle[]>([])

function addVehicle() {
  vehicles.value.push({ brand: '', model: '', year: '', plates: '' })
}

function removeVehicle(index: number) {
  vehicles.value.splice(index, 1)
}

// La fotografía de fachada la toma el verificador durante la visita de campo
// (ver components/verificador/VerifyModal.vue), no se captura en el alta.
const idFrontPath = ref<string | null>(null)
const idBackPath = ref<string | null>(null)
const proofOfAddressPath = ref<string | null>(null)

const submitting = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  if (!idFrontPath.value || !idBackPath.value || !proofOfAddressPath.value) {
    currentStep.value = 5
    toast.add({
      title: 'Faltan documentos obligatorios',
      description: 'Por favor, sube todos los documentos requeridos (INE frontal, INE reverso y comprobante de domicilio).',
      color: 'error'
    })
    submitting.value = false
    return
  }

  const data = event.data

  try {
    const application = await createApplication({
      branch_id: data.branch_id,
      person: {
        first_name: data.first_name,
        middle_name: data.middle_name || undefined,
        last_name: data.last_name,
        second_last_name: data.second_last_name || undefined,
        gender: (data.gender as 'M' | 'F' | 'OTHER' | undefined) || undefined,
        birth_date: data.birth_date || undefined,
        curp: data.curp || undefined,
        rfc: data.rfc || undefined,
        home_phone: data.home_phone || undefined,
        mobile_phone: data.mobile_phone || undefined,
        email: data.email || undefined,
        street: data.street || undefined,
        external_number: data.external_number || undefined,
        neighborhood: data.neighborhood || undefined,
        city: data.city || undefined,
        state: data.state || undefined,
        postal_code: data.postal_code || undefined,
        notes: data.notes || undefined
      },
      family_data: {
        members: familyMembers.value
          .filter(m => m.name || m.relationship || m.phone || m.age)
          .map(m => ({ name: m.name || null, relationship: m.relationship || null, phone: m.phone || null, age: m.age ?? null })),
        applicant_age: data.applicant_age ?? null,
        occupation: {
          type: data.occupation_type || null,
          place_name: data.occupation_place || null,
          position: data.occupation_position || null,
          phone: data.occupation_phone || null,
          years: data.occupation_years ?? null
        },
        housing: {
          ownership_type: data.housing_ownership_type || null,
          dimensions: data.housing_dimensions || null,
          years_at_address: data.housing_years ?? null,
          work_reference: {
            name: data.work_reference_name || null,
            phone: data.work_reference_phone || null
          }
        }
      },
      vehicles: vehicles.value
        .filter(v => v.brand || v.model || v.year || v.plates)
        .map(v => ({ brand: v.brand || null, model: v.model || null, year: v.year || null, plates: v.plates || null })),
      requested_credit_limit: data.requested_credit_limit ?? null,
      id_front_path: idFrontPath.value,
      id_back_path: idBackPath.value,
      proof_of_address_path: proofOfAddressPath.value
    })

    toast.add({
      title: 'Solicitud registrada',
      description: `La solicitud #${application.id} fue enviada a revisión.`,
      color: 'success'
    })

    await router.push('/registro-verificacion/coordinador/list')
  } catch (e) {
    console.error(e)
    toast.add({
      title: 'Error',
      description: extractApiErrorMessage(e, 'No se pudo registrar la solicitud. Verifica los datos e intenta de nuevo.'),
      color: 'error'
    })
  } finally {
    submitting.value = false
  }
}

const currentStep = ref(1)

const steps = [
  { number: 1, label: 'Datos Personales', icon: 'i-lucide-user' },
  { number: 2, label: 'Domicilio y Familiares', icon: 'i-lucide-home' },
  { number: 3, label: 'Ocupación, Vivienda y Vehículos', icon: 'i-lucide-briefcase' },
  { number: 4, label: 'Límite Solicitado', icon: 'i-lucide-dollar-sign' },
  { number: 5, label: 'Documentos', icon: 'i-lucide-file-text' }
]

function getStepForFieldName(name: string): number {
  const step1Fields = ['first_name', 'last_name', 'gender', 'birth_date', 'curp', 'rfc', 'home_phone', 'mobile_phone', 'email']
  const step2Fields = ['street', 'external_number', 'neighborhood', 'city', 'state', 'postal_code']
  const step3Fields = ['applicant_age', 'occupation_type', 'occupation_place', 'occupation_position', 'occupation_phone', 'occupation_years', 'housing_ownership_type', 'housing_years', 'housing_dimensions', 'work_reference_name', 'work_reference_phone']
  const step4Fields = ['requested_credit_limit']
  
  if (step1Fields.includes(name)) return 1
  if (step2Fields.includes(name)) return 2
  if (step3Fields.includes(name)) return 3
  if (step4Fields.includes(name)) return 4
  return 5
}

function onFormError(event: any) {
  const errors = event.errors || []
  if (errors.length > 0) {
    const firstErrorName = errors[0].name
    const step = getStepForFieldName(firstErrorName)
    if (step) {
      currentStep.value = step
    }
    toast.add({
      title: 'Faltan datos obligatorios',
      description: 'Por favor, revisa los campos marcados en rojo en las pestañas del formulario.',
      color: 'error'
    })
  }
}
</script>

<template>
  <UDashboardPanel id="register-distributors-new">
    <template #header>
      <UDashboardNavbar title="Alta de Distribuidor">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="!isCoordinator" class="p-6">
        <UAlert
          color="warning"
          variant="subtle"
          icon="i-lucide-lock"
          title="Acceso restringido"
          description="Solo el rol Coordinador puede registrar nuevas solicitudes de distribuidora."
        />
      </div>

      <div v-else-if="!coordinatorBranchId" class="p-6">
        <UAlert
          color="warning"
          variant="subtle"
          icon="i-lucide-triangle-alert"
          title="Sin sucursal asignada"
          description="Tu usuario coordinador no tiene una sucursal asignada. Contacta a un gerente para que te asigne una antes de registrar solicitudes."
        />
      </div>

      <UForm
        v-else
        id="new-application"
        :schema="schema"
        :state="state"
        class="p-6 space-y-6 w-full"
        @submit="onSubmit"
        @error="onFormError"
      >
        <!-- Stepper Component -->
        <div class="mb-8 border border-default bg-elevated/40 rounded-xl p-4 sm:p-5">
          <!-- Desktop Stepper -->
          <div class="hidden md:flex items-center justify-between gap-2">
            <div 
              v-for="step in steps" 
              :key="step.number" 
              class="flex items-center flex-1 last:flex-initial cursor-pointer"
              @click="currentStep = step.number"
            >
              <div class="flex items-center gap-3">
                <span 
                  class="size-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300"
                  :class="currentStep === step.number 
                    ? 'bg-primary text-white ring-4 ring-primary/20 scale-110 shadow-sm' 
                    : currentStep > step.number 
                      ? 'bg-success text-white' 
                      : 'bg-muted text-dimmed'"
                >
                  <UIcon v-if="currentStep > step.number" name="i-lucide-check" class="size-4" />
                  <UIcon v-else :name="step.icon" class="size-4" />
                </span>
                <div class="flex flex-col text-left">
                  <span class="text-[10px] text-muted font-semibold uppercase tracking-wider">Paso {{ step.number }}</span>
                  <span 
                    class="text-xs font-semibold transition-colors"
                    :class="currentStep === step.number ? 'text-highlighted font-semibold' : 'text-dimmed'"
                  >
                    {{ step.label }}
                  </span>
                </div>
              </div>
              <div 
                v-if="step.number < steps.length" 
                class="h-[2px] flex-1 mx-4 rounded-full transition-all duration-500"
                :class="currentStep > step.number ? 'bg-success' : 'bg-muted'"
              />
            </div>
          </div>

          <!-- Mobile Stepper -->
          <div class="md:hidden flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-[10px] text-muted font-semibold uppercase tracking-wider">
                Paso {{ currentStep }} de {{ steps.length }}
              </span>
              <span class="text-sm font-bold text-highlighted">
                {{ steps[currentStep - 1]?.label }}
              </span>
            </div>
            <div class="flex gap-1">
              <span 
                v-for="n in steps.length" 
                :key="n"
                class="h-1.5 rounded-full transition-all duration-300"
                :class="n === currentStep ? 'w-6 bg-primary' : 'w-2 bg-muted'"
              />
            </div>
          </div>
        </div>

        <!-- Paso 1: Datos Personales -->
        <div v-show="currentStep === 1" class="space-y-6">
          <UCard>
            <template #header>
              <h3 class="font-semibold text-base">
                Sucursal
              </h3>
            </template>

            <div class="flex items-center gap-2 text-sm">
              <UIcon name="i-lucide-building-2" class="size-4 text-dimmed" />
              <span class="font-medium">{{ coordinatorBranchName ?? `Sucursal #${coordinatorBranchId}` }}</span>
              <UBadge color="neutral" variant="subtle" size="sm">
                Tu sucursal asignada
              </UBadge>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="font-semibold text-base">
                Datos Personales del Solicitante
              </h3>
            </template>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="Nombre(s)" name="first_name" required>
                <UInput v-model="state.first_name" class="w-full" />
              </UFormField>
              <UFormField label="Segundo nombre" name="middle_name">
                <UInput v-model="state.middle_name" class="w-full" />
              </UFormField>
              <UFormField label="Apellido paterno" name="last_name" required>
                <UInput v-model="state.last_name" class="w-full" />
              </UFormField>
              <UFormField label="Apellido materno" name="second_last_name">
                <UInput v-model="state.second_last_name" class="w-full" />
              </UFormField>
              <UFormField label="Género" name="gender" required>
                <USelect
                  v-model="state.gender"
                  :items="[{ label: 'Masculino', value: 'M' }, { label: 'Femenino', value: 'F' }, { label: 'Otro', value: 'OTHER' }]"
                  placeholder="Selecciona..."
                  class="w-full"
                />
              </UFormField>
              <UFormField label="Fecha de nacimiento" name="birth_date" required>
                <UInput v-model="state.birth_date" type="date" class="w-full" />
              </UFormField>
              <UFormField label="CURP" name="curp" required>
                <UInput v-model="state.curp" class="w-full" maxlength="18" />
              </UFormField>
              <UFormField label="RFC" name="rfc" required>
                <UInput v-model="state.rfc" class="w-full" maxlength="13" />
              </UFormField>
              <UFormField label="Teléfono fijo" name="home_phone">
                <UInput v-model="state.home_phone" class="w-full" />
              </UFormField>
              <UFormField label="Teléfono móvil" name="mobile_phone" required>
                <UInput v-model="state.mobile_phone" class="w-full" />
              </UFormField>
              <UFormField label="Correo electrónico" name="email" required>
                <UInput v-model="state.email" type="email" class="w-full" />
              </UFormField>
            </div>
          </UCard>
        </div>

        <!-- Paso 2: Domicilio y Familiares -->
        <div v-show="currentStep === 2" class="space-y-6">
          <UCard>
            <template #header>
              <h3 class="font-semibold text-base">
                Domicilio
              </h3>
            </template>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="Calle" name="street" required>
                <UInput v-model="state.street" class="w-full" />
              </UFormField>
              <UFormField label="Número exterior" name="external_number" required>
                <UInput v-model="state.external_number" class="w-full" />
              </UFormField>
              <UFormField label="Colonia" name="neighborhood" required>
                <UInput v-model="state.neighborhood" class="w-full" />
              </UFormField>
              <UFormField label="Ciudad" name="city" required>
                <UInput v-model="state.city" class="w-full" />
              </UFormField>
              <UFormField label="Estado" name="state" required>
                <UInput v-model="state.state" class="w-full" />
              </UFormField>
              <UFormField label="Código postal" name="postal_code" required>
                <UInput v-model="state.postal_code" class="w-full" />
              </UFormField>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-base">
                  Familiares y Cónyuge
                </h3>
                <UButton
                  label="Agregar familiar"
                  icon="i-lucide-plus"
                  size="xs"
                  variant="subtle"
                  @click="addFamilyMember"
                />
              </div>
            </template>

            <div class="space-y-3">
              <div v-for="(member, index) in familyMembers" :key="index" class="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                <UFormField label="Nombre" class="md:col-span-2">
                  <UInput v-model="member.name" class="w-full" />
                </UFormField>
                <UFormField label="Parentesco">
                  <UInput v-model="member.relationship" placeholder="Esposo(a), padre, hijo(a)..." class="w-full" />
                </UFormField>
                <UFormField label="Teléfono">
                  <UInput v-model="member.phone" class="w-full" />
                </UFormField>
                <div class="flex items-end gap-2">
                  <UFormField label="Edad" class="flex-1">
                    <UInputNumber v-model="member.age" class="w-full" :min="0" />
                  </UFormField>
                  <UButton
                    icon="i-lucide-trash"
                    color="error"
                    variant="ghost"
                    :disabled="familyMembers.length === 1"
                    @click="removeFamilyMember(index)"
                  />
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Paso 3: Ocupación, Vivienda y Vehículos -->
        <div v-show="currentStep === 3" class="space-y-6">
          <UCard>
            <template #header>
              <h3 class="font-semibold text-base">
                Datos Adicionales para la Distribuidora
              </h3>
            </template>

            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-semibold text-dimmed mb-3">
                  Ocupación
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <UFormField label="Edad del solicitante" name="applicant_age" required>
                    <UInputNumber v-model="state.applicant_age" class="w-full" :min="0" />
                  </UFormField>
                  <UFormField label="Trabaja o estudia" name="occupation_type" required>
                    <USelect
                      v-model="state.occupation_type"
                      :items="[{ label: 'Trabaja', value: 'trabaja' }, { label: 'Estudia', value: 'estudia' }, { label: 'Otro', value: 'otro' }]"
                      placeholder="Selecciona..."
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField label="Nombre del trabajo o escuela" name="occupation_place" required>
                    <UInput v-model="state.occupation_place" class="w-full" />
                  </UFormField>
                  <UFormField label="Puesto o grado" name="occupation_position" required>
                    <UInput v-model="state.occupation_position" class="w-full" />
                  </UFormField>
                  <UFormField label="Teléfono del trabajo o escuela" name="occupation_phone" required>
                    <UInput v-model="state.occupation_phone" class="w-full" />
                  </UFormField>
                  <UFormField label="Antigüedad (años)" name="occupation_years" required>
                    <UInputNumber v-model="state.occupation_years" class="w-full" :min="0" />
                  </UFormField>
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-sm font-semibold text-dimmed">
                    Vehículos (si tiene)
                  </h4>
                  <UButton
                    label="Agregar vehículo"
                    icon="i-lucide-plus"
                    size="xs"
                    variant="subtle"
                    @click="addVehicle"
                  />
                </div>

                <div v-if="!vehicles.length" class="text-sm text-dimmed">
                  El solicitante no tiene vehículos registrados.
                </div>

                <div v-else class="space-y-3">
                  <div v-for="(vehicle, index) in vehicles" :key="index" class="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                    <UFormField label="Marca">
                      <UInput v-model="vehicle.brand" class="w-full" />
                    </UFormField>
                    <UFormField label="Modelo">
                      <UInput v-model="vehicle.model" class="w-full" />
                    </UFormField>
                    <UFormField label="Año">
                      <UInput v-model="vehicle.year" class="w-full" />
                    </UFormField>
                    <UFormField label="Placas">
                      <UInput v-model="vehicle.plates" class="w-full" />
                    </UFormField>
                    <UButton
                      icon="i-lucide-trash"
                      color="error"
                      variant="ghost"
                      @click="removeVehicle(index)"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 class="text-sm font-semibold text-dimmed mb-3">
                  Vivienda
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <UFormField label="Tenencia de la vivienda" name="housing_ownership_type" required>
                    <USelect
                      v-model="state.housing_ownership_type"
                      :items="[
                        { label: 'Propia', value: 'propia' },
                        { label: 'Rentada', value: 'rentada' },
                        { label: 'Propia (en proceso de liquidar)', value: 'liquidandola' },
                        { label: 'Infonavit', value: 'infonavit' },
                        { label: 'Crédito bancario', value: 'credito_bancario' }
                      ]"
                      placeholder="Selecciona..."
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField label="Años viviendo en el domicilio" name="housing_years" required>
                    <UInputNumber v-model="state.housing_years" class="w-full" :min="0" />
                  </UFormField>
                  <UFormField label="Dimensiones de la vivienda" name="housing_dimensions" required>
                    <UInput v-model="state.housing_dimensions" placeholder="Ej. 120 m²" class="w-full" />
                  </UFormField>
                  <div />
                  <UFormField label="Referencia laboral — nombre" name="work_reference_name" required>
                    <UInput v-model="state.work_reference_name" class="w-full" />
                  </UFormField>
                  <UFormField label="Referencia laboral — teléfono" name="work_reference_phone" required>
                    <UInput v-model="state.work_reference_phone" class="w-full" />
                  </UFormField>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Paso 4: Límite Solicitado -->
        <div v-show="currentStep === 4" class="space-y-6">
          <UCard>
            <template #header>
              <h3 class="font-semibold text-base">
                Límite Solicitado
              </h3>
            </template>

            <UFormField label="Límite de crédito solicitado" name="requested_credit_limit" required>
              <UInputNumber
                v-model="state.requested_credit_limit"
                class="w-full max-w-sm"
                :min="1000"
                :step="100"
              />
            </UFormField>
          </UCard>
        </div>

        <!-- Paso 5: Documentos -->
        <div v-show="currentStep === 5" class="space-y-6">
          <UCard>
            <template #header>
              <h3 class="font-semibold text-base">
                Documentos Escaneados
              </h3>
            </template>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="INE (frontal)" required>
                <ApplicationsEvidencePhotoCapture
                  v-model="idFrontPath"
                  :upload="file => uploadApplicationDocument(file, 'id_front')"
                  label="INE (frontal)"
                />
              </UFormField>
              <UFormField label="INE (reverso)" required>
                <ApplicationsEvidencePhotoCapture
                  v-model="idBackPath"
                  :upload="file => uploadApplicationDocument(file, 'id_back')"
                  label="INE (reverso)"
                />
              </UFormField>
              <UFormField label="Comprobante de domicilio" required>
                <ApplicationsEvidencePhotoCapture
                  v-model="proofOfAddressPath"
                  :upload="file => uploadApplicationDocument(file, 'proof_of_address')"
                  label="Comprobante de domicilio"
                />
              </UFormField>
            </div>
          </UCard>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between items-center pt-6 border-t border-default mt-6">
          <div>
            <UButton
              v-if="currentStep > 1"
              label="Anterior"
              color="neutral"
              variant="subtle"
              icon="i-lucide-arrow-left"
              @click="currentStep--"
            />
            <UButton
              v-else
              label="Cancelar"
              color="neutral"
              variant="subtle"
              to="/registro-verificacion"
            />
          </div>

          <div class="flex gap-2">
            <UButton
              v-if="currentStep < 5"
              label="Siguiente"
              color="primary"
              variant="solid"
              trailing-icon="i-lucide-arrow-right"
              @click="currentStep++"
            />
            <UButton
              v-else
              label="Registrar Solicitud"
              color="primary"
              variant="solid"
              type="submit"
              :loading="submitting"
            />
          </div>
        </div>
      </UForm>
    </template>
  </UDashboardPanel>
</template>
