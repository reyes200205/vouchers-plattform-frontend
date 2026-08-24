<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { applicantFullName, APPLICATION_STATUS_LABELS, type Application } from '~/composables/useApplications'

const props = defineProps<{
  applicationId: number | null
}>()

const emit = defineEmits<{ updated: [] }>()

const open = defineModel<boolean>('open', { default: false })

const { user } = useAuth()
const { getApplication, updateApplication } = useApplications()
const toast = useToast()

const detail = ref<Application | null>(null)
const detailLoading = ref(false)
const detailError = ref(false)
const editing = ref(false)
const submitting = ref(false)

async function loadDetail() {
  if (!props.applicationId) return

  detailLoading.value = true
  detailError.value = false
  editing.value = false

  try {
    detail.value = await getApplication(props.applicationId)
  } catch {
    detailError.value = true
  } finally {
    detailLoading.value = false
  }
}

watch(open, (isOpen) => {
  if (isOpen) loadDetail()
})

// Solo el verificador asignado puede corregir, y solo mientras la solicitud
// siga EN_REVISION (antes de registrar su verificación) — mismo candado que
// valida UpdateApplicationService en el backend; aquí solo evita mostrar un
// botón que el backend rechazaría.
const canEdit = computed(() => {
  return !!detail.value
    && detail.value.status === 'EN_REVISION'
    && detail.value.assigned_verifier?.id === user.value?.id
})

// Mismos campos que registro-verificacion/new.vue captura al dar de alta la
// solicitud (ver family_data/vehicles ahí) — el verificador debe poder
// corregir cualquiera de ellos, no solo los datos básicos de la persona.
const schema = z.object({
  first_name: z.string().min(2, 'Muy corto').max(100, 'Muy largo'),
  middle_name: z.string().max(100, 'Muy largo').optional(),
  last_name: z.string().min(2, 'Muy corto').max(100, 'Muy largo'),
  second_last_name: z.string().max(100, 'Muy largo').optional(),
  gender: z.enum(['M', 'F', 'OTHER']).optional(),
  birth_date: z.string().min(1, 'La fecha de nacimiento es obligatoria').superRefine((value, ctx) => {
    const birthDate = new Date(value)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    if (age < 18) {
      ctx.addIssue({ code: 'custom', message: 'El solicitante debe ser mayor de 18 años' })
    }
  }),
  curp: z.string().length(18, 'CURP inválida (18 caracteres)').superRefine((value, ctx) => {
    if (!isValidCurp(value)) {
      ctx.addIssue({ code: 'custom', message: 'CURP con formato inválido' })
    }
  }),
  rfc: z.string().length(13, 'RFC inválido (13 caracteres)').superRefine((value, ctx) => {
    if (!isValidRfc(value)) {
      ctx.addIssue({ code: 'custom', message: 'RFC con formato inválido' })
    }
  }),
  home_phone: z.string().max(30, 'Muy largo').optional(),
  mobile_phone: z.string().max(30, 'Muy largo').optional(),
  email: z.string().email('Correo inválido'),
  street: z.string().max(150, 'Muy largo'),
  external_number: z.string().max(30, 'Muy largo'),
  neighborhood: z.string().max(120, 'Muy largo'),
  city: z.string().max(120, 'Muy largo'),
  state: z.string().max(120, 'Muy largo'),
  postal_code: z.string().max(10, 'Muy largo'),
  street_references: z.string().optional(),
  notes: z.string().optional(),
  requested_credit_limit: z.union([z.number().positive(), z.string().regex(/^\d+(\.\d{1,2})?$/)]),
  occupation_type: z.string().optional(),
  occupation_monthly_income: z.number().min(0).optional(),
  occupation_place: z.string().optional(),
  occupation_position: z.string().optional(),
  occupation_phone: z.string().optional(),
  occupation_years: z.number().min(0).optional(),
  housing_ownership_type: z.string().optional(),
  housing_dimensions: z.string().optional(),
  housing_years: z.number().min(0).optional(),
  work_reference_name: z.string().optional(),
  work_reference_phone: z.string().optional()
})

type Schema = z.output<typeof schema>

// Estado local de edicion: sin null (a diferencia de ApplicationFamilyMember/
// ApplicationVehicle) porque UInput/USelect no aceptan null en su v-model.
interface EditableFamilyMember {
  name: string
  relationship: string
  phone: string
  age: number | null
}

interface EditableVehicle {
  brand: string
  model: string
  year: string
  plates: string
}

const state = reactive<Partial<Schema>>({})

const familyMembers = ref<EditableFamilyMember[]>([])
const vehicles = ref<EditableVehicle[]>([])

function addFamilyMember() {
  familyMembers.value.push({ name: '', relationship: '', phone: '', age: null })
}

function removeFamilyMember(index: number) {
  familyMembers.value.splice(index, 1)
}

function addVehicle() {
  vehicles.value.push({ brand: '', model: '', year: '', plates: '' })
}

function removeVehicle(index: number) {
  vehicles.value.splice(index, 1)
}

function startEditing() {
  if (!detail.value) return

  const p = detail.value.applicant
  state.first_name = p?.first_name ?? ''
  state.middle_name = p?.middle_name ?? ''
  state.last_name = p?.last_name ?? ''
  state.second_last_name = p?.second_last_name ?? ''
  state.gender = (p?.gender as 'M' | 'F' | 'OTHER' | undefined) ?? undefined
  state.birth_date = p?.birth_date ?? ''
  state.curp = p?.curp ?? ''
  state.rfc = p?.rfc ?? ''
  state.home_phone = p?.home_phone ?? ''
  state.mobile_phone = p?.mobile_phone ?? ''
  state.email = p?.email ?? ''
  state.street = p?.street ?? ''
  state.external_number = p?.external_number ?? ''
  state.neighborhood = p?.neighborhood ?? ''
  state.city = p?.city ?? ''
  state.state = p?.state ?? ''
  state.postal_code = p?.postal_code ?? ''
  state.street_references = p?.street_references ?? ''
  state.notes = p?.notes ?? ''
  state.requested_credit_limit = detail.value.requested_credit_limit ?? undefined

  const familyData = detail.value.family_data_json
  state.occupation_type = familyData?.occupation?.type ?? ''
  state.occupation_place = familyData?.occupation?.place_name ?? ''
  state.occupation_position = familyData?.occupation?.position ?? ''
  state.occupation_phone = familyData?.occupation?.phone ?? ''
  state.occupation_years = familyData?.occupation?.years ?? undefined
  state.occupation_monthly_income = familyData?.occupation?.monthly_income ?? undefined
  state.housing_ownership_type = familyData?.housing?.ownership_type ?? ''
  state.housing_dimensions = familyData?.housing?.dimensions ?? ''
  state.housing_years = familyData?.housing?.years_at_address ?? undefined
  state.work_reference_name = familyData?.housing?.work_reference?.name ?? ''
  state.work_reference_phone = familyData?.housing?.work_reference?.phone ?? ''

  familyMembers.value = (familyData?.members ?? []).map(m => ({
    name: m.name ?? '',
    relationship: m.relationship ?? '',
    phone: m.phone ?? '',
    age: m.age ?? null
  }))
  if (familyMembers.value.length === 0) {
    familyMembers.value.push({ name: '', relationship: '', phone: '', age: null })
  }

  vehicles.value = (detail.value.vehicles_json ?? []).map(v => ({
    brand: v.brand ?? '',
    model: v.model ?? '',
    year: v.year ?? '',
    plates: v.plates ?? ''
  }))

  editing.value = true
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!props.applicationId) return

  submitting.value = true

  try {
    detail.value = await updateApplication(props.applicationId, {
      person: {
        first_name: event.data.first_name,
        middle_name: event.data.middle_name || null,
        last_name: event.data.last_name,
        second_last_name: event.data.second_last_name,
        gender: event.data.gender,
        birth_date: event.data.birth_date || undefined,
        curp: event.data.curp,
        rfc: event.data.rfc,
        home_phone: event.data.home_phone,
        mobile_phone: event.data.mobile_phone,
        email: event.data.email,
        street: event.data.street,
        external_number: event.data.external_number,
        neighborhood: event.data.neighborhood,
        city: event.data.city,
        state: event.data.state,
        postal_code: event.data.postal_code,
        street_references: event.data.street_references || null,
        notes: event.data.notes || null
      },
      family_data: {
        members: familyMembers.value
          .filter(m => m.name || m.relationship || m.phone || m.age)
          .map(m => ({
            name: m.name || null,
            relationship: m.relationship || null,
            phone: m.phone || null,
            age: m.age ?? null
          })),
        occupation: {
          type: event.data.occupation_type || null,
          place_name: event.data.occupation_place || null,
          position: event.data.occupation_position || null,
          phone: event.data.occupation_phone || null,
          years: event.data.occupation_years ?? null,
          monthly_income: event.data.occupation_monthly_income ?? null
        },
        housing: {
          ownership_type: event.data.housing_ownership_type || null,
          dimensions: event.data.housing_dimensions || null,
          years_at_address: event.data.housing_years ?? null,
          work_reference: {
            name: event.data.work_reference_name || null,
            phone: event.data.work_reference_phone || null
          }
        }
      },
      vehicles: vehicles.value
        .filter(v => v.brand || v.model || v.year || v.plates)
        .map(v => ({
          brand: v.brand || null,
          model: v.model || null,
          year: v.year || null,
          plates: v.plates || null
        })),
      requested_credit_limit: event.data.requested_credit_limit
    })

    toast.add({ title: 'Solicitud actualizada', description: 'Los datos se corrigieron correctamente.', color: 'success' })
    editing.value = false
    emit('updated')
  } catch (e: any) {
    toast.add({
      title: 'Error',
      description: extractApiErrorMessage(e, 'No se pudo actualizar la solicitud. Verifica los datos e intenta de nuevo.'),
      color: 'error'
    })
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Detalle de la solicitud"
    description="Información completa capturada por el coordinador"
    :ui="{ content: 'max-w-6xl' }"
  >
    <template #body>
      <div class="max-h-[78vh] space-y-5 overflow-y-auto pr-1">
        <div v-if="detailLoading" class="flex items-center justify-center py-10">
          <UIcon name="i-lucide-loader-circle" class="size-6 animate-spin text-muted" />
        </div>

        <div v-else-if="detailError" class="flex items-center gap-2 rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
          <UIcon name="i-lucide-triangle-alert" class="size-4 shrink-0" />
          No se pudo cargar el detalle de la solicitud.
        </div>

        <template v-else-if="detail">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p class="text-lg font-semibold text-highlighted">
                {{ applicantFullName(detail.applicant) }}
              </p>
              <p class="text-xs text-muted">
                {{ detail.branch?.name }}
                <span v-if="detail.coordinator?.person"> · Coordinador: {{ applicantFullName(detail.coordinator.person) }}</span>
              </p>
            </div>
            <div class="flex items-center gap-2">
              <UBadge variant="subtle" color="warning">
                {{ APPLICATION_STATUS_LABELS[detail.status] ?? detail.status }}
              </UBadge>
              <UButton
                v-if="canEdit && !editing"
                label="Corregir datos"
                icon="i-lucide-pencil"
                color="neutral"
                variant="subtle"
                size="xs"
                @click="startEditing"
              />
            </div>
          </div>

          <UAlert
            v-if="!canEdit && !editing"
            color="neutral"
            variant="subtle"
            icon="i-lucide-info"
            title="Solo lectura"
            description="Solo el verificador asignado puede corregir esta solicitud, y únicamente mientras siga pendiente de verificación."
          />

          <UForm
            v-if="editing"
            :schema="schema"
            :state="state"
            class="space-y-5"
            @submit="onSubmit"
          >
            <div class="rounded-lg border border-default p-4">
              <p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
                Datos personales
              </p>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <UFormField required label="Nombre" name="first_name">
                  <UInput v-model="state.first_name" class="w-full" />
                </UFormField>
                <UFormField label="Segundo nombre" name="middle_name">
                  <UInput v-model="state.middle_name" class="w-full" />
                </UFormField>
                <UFormField required label="Apellido paterno" name="last_name">
                  <UInput v-model="state.last_name" class="w-full" />
                </UFormField>
                <UFormField required label="Apellido materno" name="second_last_name">
                  <UInput v-model="state.second_last_name" class="w-full" />
                </UFormField>
                <UFormField label="Género" name="gender">
                  <USelect
                    v-model="state.gender"
                    :items="[
                      { label: 'Masculino', value: 'M' },
                      { label: 'Femenino', value: 'F' },
                      { label: 'Otro', value: 'OTHER' }
                    ]"
                    placeholder="Seleccionar..."
                    class="w-full"
                  />
                </UFormField>
                <UFormField label="Fecha de nacimiento" name="birth_date">
                  <UInput v-model="state.birth_date" type="date" class="w-full" />
                </UFormField>
                <UFormField required label="CURP" name="curp">
                  <UInput v-model="state.curp" class="w-full uppercase" />
                </UFormField>
                <UFormField required label="RFC" name="rfc">
                  <UInput v-model="state.rfc" class="w-full uppercase" />
                </UFormField>
                <UFormField label="Teléfono de casa" name="home_phone">
                  <UInput v-model="state.home_phone" class="w-full" />
                </UFormField>
                <UFormField label="Celular" name="mobile_phone">
                  <UInput v-model="state.mobile_phone" class="w-full" />
                </UFormField>
                <UFormField required label="Correo" name="email">
                  <UInput v-model="state.email" class="w-full" />
                </UFormField>
                <UFormField label="Notas" name="notes" class="sm:col-span-2 lg:col-span-3">
                  <UTextarea v-model="state.notes" class="w-full" />
                </UFormField>
              </div>
            </div>

            <div class="rounded-lg border border-default p-4">
              <p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
                Domicilio
              </p>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <UFormField required label="Calle" name="street">
                  <UInput v-model="state.street" class="w-full" />
                </UFormField>
                <UFormField required label="Número exterior" name="external_number">
                  <UInput v-model="state.external_number" class="w-full" />
                </UFormField>
                <UFormField required label="Colonia" name="neighborhood">
                  <UInput v-model="state.neighborhood" class="w-full" />
                </UFormField>
                <UFormField required label="Ciudad" name="city">
                  <UInput v-model="state.city" class="w-full" />
                </UFormField>
                <UFormField required label="Estado" name="state">
                  <UInput v-model="state.state" class="w-full" />
                </UFormField>
                <UFormField required label="C.P." name="postal_code">
                  <UInput v-model="state.postal_code" class="w-full" />
                </UFormField>
                <UFormField label="Referencias del domicilio" name="street_references" class="sm:col-span-2 lg:col-span-3">
                  <UTextarea v-model="state.street_references" class="w-full" />
                </UFormField>
              </div>
            </div>

            <div class="rounded-lg border border-default p-4">
              <div class="mb-3 flex items-center justify-between">
                <p class="text-xs font-medium uppercase tracking-wide text-muted">
                  Familiares y cónyuge
                </p>
                <UButton
                  label="Agregar familiar"
                  icon="i-lucide-plus"
                  size="xs"
                  variant="subtle"
                  @click="addFamilyMember"
                />
              </div>

              <div class="space-y-3">
                <div
                  v-for="(member, index) in familyMembers"
                  :key="index"
                  class="grid grid-cols-1 items-end gap-3 sm:grid-cols-4"
                >
                  <UFormField label="Nombre">
                    <UInput v-model="member.name" class="w-full" />
                  </UFormField>
                  <UFormField label="Parentesco">
                    <USelect
                      v-model="member.relationship"
                      :items="[
                        { label: 'Esposo(a) / Cónyuge', value: 'Esposo(a)' },
                        { label: 'Padre / Madre', value: 'Padre/Madre' },
                        { label: 'Hijo(a)', value: 'Hijo(a)' },
                        { label: 'Hermano(a)', value: 'Hermano(a)' },
                        { label: 'Otro', value: 'Otro' }
                      ]"
                      placeholder="Selecciona..."
                      class="w-full"
                    />
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
            </div>

            <div class="rounded-lg border border-default p-4">
              <p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
                Ocupación
              </p>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <UFormField label="Trabaja o estudia" name="occupation_type">
                  <USelect
                    v-model="state.occupation_type"
                    :items="[
                      { label: 'Trabaja', value: 'trabaja' },
                      { label: 'Estudia', value: 'estudia' },
                      { label: 'Otro', value: 'otro' }
                    ]"
                    placeholder="Selecciona..."
                    class="w-full"
                  />
                </UFormField>
                <UFormField label="Nombre del trabajo o escuela" name="occupation_place">
                  <UInput v-model="state.occupation_place" class="w-full" />
                </UFormField>
                <UFormField label="Puesto o grado" name="occupation_position">
                  <UInput v-model="state.occupation_position" class="w-full" />
                </UFormField>
                <UFormField label="Teléfono del trabajo o escuela" name="occupation_phone">
                  <UInput v-model="state.occupation_phone" class="w-full" />
                </UFormField>
                <UFormField label="Antigüedad (años)" name="occupation_years">
                  <UInputNumber v-model="state.occupation_years" class="w-full" :min="0" />
                </UFormField>
                <UFormField label="Ganancia al mes" name="occupation_monthly_income">
                  <UInputNumber v-model="state.occupation_monthly_income" class="w-full" :min="0" />
                </UFormField>
              </div>
            </div>

            <div class="rounded-lg border border-default p-4">
              <div class="mb-3 flex items-center justify-between">
                <p class="text-xs font-medium uppercase tracking-wide text-muted">
                  Vehículos
                </p>
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
                <div
                  v-for="(vehicle, index) in vehicles"
                  :key="index"
                  class="grid grid-cols-1 items-end gap-3 md:grid-cols-5"
                >
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

            <div class="rounded-lg border border-default p-4">
              <p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
                Vivienda
              </p>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <UFormField label="Tenencia de la vivienda" name="housing_ownership_type">
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
                <UFormField label="Años viviendo en el domicilio" name="housing_years">
                  <UInputNumber v-model="state.housing_years" class="w-full" :min="0" />
                </UFormField>
                <UFormField label="Dimensiones de la vivienda" name="housing_dimensions">
                  <UInput v-model="state.housing_dimensions" placeholder="Ej. 120 m²" class="w-full" />
                </UFormField>
                <UFormField label="Referencia laboral — nombre" name="work_reference_name">
                  <UInput v-model="state.work_reference_name" class="w-full" />
                </UFormField>
                <UFormField label="Referencia laboral — teléfono" name="work_reference_phone">
                  <UInput v-model="state.work_reference_phone" class="w-full" />
                </UFormField>
              </div>
            </div>

            <div class="rounded-lg border border-default p-4">
              <p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
                Solicitud de crédito
              </p>
              <UFormField
                required
                label="Crédito solicitado"
                name="requested_credit_limit"
                class="max-w-xs"
              >
                <UInput
                  v-model="state.requested_credit_limit"
                  type="number"
                  min="0"
                  step="100"
                  class="w-full"
                />
              </UFormField>
            </div>

            <div class="flex justify-end gap-2">
              <UButton
                label="Cancelar"
                color="neutral"
                variant="subtle"
                :disabled="submitting"
                @click="editing = false"
              />
              <UButton
                label="Guardar corrección"
                color="primary"
                variant="solid"
                type="submit"
                :loading="submitting"
              />
            </div>
          </UForm>

          <ApplicationsApplicationDetailView v-else :detail="detail" />
        </template>
      </div>
    </template>
  </UModal>
</template>
