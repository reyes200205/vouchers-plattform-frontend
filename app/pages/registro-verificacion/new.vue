<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Branch } from '~/types'

const { roleCode, user } = useAuth()
const isCoordinator = computed(() => roleCode.value === 'coordinator')

const { listBranches } = useBranches()
const { createApplication } = useApplications()
const toast = useToast()
const router = useRouter()

const { data: branches } = await useAsyncData<Branch[]>('registro-verificacion-branches', () => listBranches(), {
  default: () => []
})

const coordinatorBranchId = computed(() => {
  const role = user.value?.roles?.find(r => r.code === 'coordinator')
  return role?.branch_id ?? null
})

const branchItems = computed(() => (branches.value ?? []).map(b => ({
  label: `${b.name} (${b.code})`,
  value: b.id
})))

const schema = z.object({
  branch_id: z.number({ error: 'Selecciona una sucursal' }),
  first_name: z.string().min(2, 'Muy corto'),
  middle_name: z.string().optional(),
  last_name: z.string().min(2, 'Muy corto'),
  second_last_name: z.string().optional(),
  gender: z.string().optional(),
  birth_date: z.string().optional(),
  curp: z.string().optional(),
  rfc: z.string().optional(),
  home_phone: z.string().optional(),
  mobile_phone: z.string().optional(),
  email: z.union([z.string().email('Correo inválido'), z.literal('')]).optional(),
  street: z.string().optional(),
  external_number: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  notes: z.string().optional(),
  requested_credit_limit: z.number().optional(),
  housing_type: z.string().optional(),
  housing_years: z.number().optional()
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
  housing_type: undefined,
  housing_years: undefined
})

interface FamilyReference {
  name: string
  relationship: string
  phone: string
}

const familyReferences = ref<FamilyReference[]>([{ name: '', relationship: '', phone: '' }])

function addFamilyReference() {
  familyReferences.value.push({ name: '', relationship: '', phone: '' })
}

function removeFamilyReference(index: number) {
  familyReferences.value.splice(index, 1)
}

interface ExternalAffiliation {
  organization: string
  membershipType: string
}

const externalAffiliations = ref<ExternalAffiliation[]>([{ organization: '', membershipType: '' }])

function addExternalAffiliation() {
  externalAffiliations.value.push({ organization: '', membershipType: '' })
}

function removeExternalAffiliation(index: number) {
  externalAffiliations.value.splice(index, 1)
}

const documentFields = [
  { key: 'facade', label: 'Fotografía de fachada' },
  { key: 'id_front', label: 'INE (frontal)' },
  { key: 'id_back', label: 'INE (reverso)' },
  { key: 'proof_of_address', label: 'Comprobante de domicilio' },
  { key: 'credit_bureau_report', label: 'Reporte de buró de crédito' }
]

const submitting = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

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
        references: familyReferences.value.filter(r => r.name || r.relationship || r.phone),
        housing: {
          type: data.housing_type || null,
          years_at_address: data.housing_years ?? null
        }
      },
      external_affiliations: {
        affiliations: externalAffiliations.value.filter(a => a.organization || a.membershipType)
      },
      requested_credit_limit: data.requested_credit_limit ?? null,
      id_front_path: null,
      id_back_path: null,
      proof_of_address_path: null,
      credit_bureau_report_path: null
    })

    toast.add({
      title: 'Solicitud registrada',
      description: `La solicitud #${application.id} fue enviada a revisión.`,
      color: 'success'
    })

    await router.push('/registro-verificacion/list')
  } catch (e) {
    console.error(e)
    toast.add({
      title: 'Error',
      description: 'No se pudo registrar la solicitud. Verifica los datos e intenta de nuevo.',
      color: 'error'
    })
  } finally {
    submitting.value = false
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

      <UForm
        v-else
        id="new-application"
        :schema="schema"
        :state="state"
        class="p-6 space-y-6 max-w-4xl"
        @submit="onSubmit"
      >
        <UCard>
          <template #header>
            <h3 class="font-semibold text-base">
              Sucursal
            </h3>
          </template>

          <UFormField label="Sucursal" name="branch_id" required>
            <USelect
              v-model="state.branch_id"
              :items="branchItems"
              placeholder="Selecciona la sucursal..."
              class="w-full max-w-sm"
            />
          </UFormField>
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
            <UFormField label="Género" name="gender">
              <USelect
                v-model="state.gender"
                :items="[{ label: 'Masculino', value: 'M' }, { label: 'Femenino', value: 'F' }, { label: 'Otro', value: 'OTHER' }]"
                placeholder="Selecciona..."
                class="w-full"
              />
            </UFormField>
            <UFormField label="Fecha de nacimiento" name="birth_date">
              <UInput v-model="state.birth_date" type="date" class="w-full" />
            </UFormField>
            <UFormField label="CURP" name="curp">
              <UInput v-model="state.curp" class="w-full" maxlength="18" />
            </UFormField>
            <UFormField label="RFC" name="rfc">
              <UInput v-model="state.rfc" class="w-full" maxlength="13" />
            </UFormField>
            <UFormField label="Teléfono fijo" name="home_phone">
              <UInput v-model="state.home_phone" class="w-full" />
            </UFormField>
            <UFormField label="Teléfono móvil" name="mobile_phone">
              <UInput v-model="state.mobile_phone" class="w-full" />
            </UFormField>
            <UFormField label="Correo electrónico" name="email">
              <UInput v-model="state.email" type="email" class="w-full" />
            </UFormField>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-semibold text-base">
              Domicilio y Vivienda
            </h3>
          </template>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Calle" name="street">
              <UInput v-model="state.street" class="w-full" />
            </UFormField>
            <UFormField label="Número exterior" name="external_number">
              <UInput v-model="state.external_number" class="w-full" />
            </UFormField>
            <UFormField label="Colonia" name="neighborhood">
              <UInput v-model="state.neighborhood" class="w-full" />
            </UFormField>
            <UFormField label="Ciudad" name="city">
              <UInput v-model="state.city" class="w-full" />
            </UFormField>
            <UFormField label="Estado" name="state">
              <UInput v-model="state.state" class="w-full" />
            </UFormField>
            <UFormField label="Código postal" name="postal_code">
              <UInput v-model="state.postal_code" class="w-full" />
            </UFormField>
            <UFormField label="Tipo de vivienda" name="housing_type">
              <USelect
                v-model="state.housing_type"
                :items="[{ label: 'Propia', value: 'propia' }, { label: 'Rentada', value: 'rentada' }, { label: 'Familiar', value: 'familiar' }]"
                placeholder="Selecciona..."
                class="w-full"
              />
            </UFormField>
            <UFormField label="Años viviendo en el domicilio" name="housing_years">
              <UInputNumber v-model="state.housing_years" class="w-full" :min="0" />
            </UFormField>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-base">
                Referencias Familiares
              </h3>
              <UButton
                label="Agregar referencia"
                icon="i-lucide-plus"
                size="xs"
                variant="subtle"
                @click="addFamilyReference"
              />
            </div>
          </template>

          <div class="space-y-3">
            <div v-for="(reference, index) in familyReferences" :key="index" class="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
              <UFormField label="Nombre">
                <UInput v-model="reference.name" class="w-full" />
              </UFormField>
              <UFormField label="Parentesco">
                <UInput v-model="reference.relationship" class="w-full" />
              </UFormField>
              <UFormField label="Teléfono">
                <UInput v-model="reference.phone" class="w-full" />
              </UFormField>
              <UButton
                icon="i-lucide-trash"
                color="error"
                variant="ghost"
                :disabled="familyReferences.length === 1"
                @click="removeFamilyReference(index)"
              />
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-base">
                Afiliación Externa
              </h3>
              <UButton
                label="Agregar afiliación"
                icon="i-lucide-plus"
                size="xs"
                variant="subtle"
                @click="addExternalAffiliation"
              />
            </div>
          </template>

          <div class="space-y-3">
            <div v-for="(affiliation, index) in externalAffiliations" :key="index" class="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              <UFormField label="Organización / Institución">
                <UInput v-model="affiliation.organization" class="w-full" />
              </UFormField>
              <UFormField label="Tipo de afiliación">
                <UInput v-model="affiliation.membershipType" class="w-full" />
              </UFormField>
              <UButton
                icon="i-lucide-trash"
                color="error"
                variant="ghost"
                :disabled="externalAffiliations.length === 1"
                @click="removeExternalAffiliation(index)"
              />
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-semibold text-base">
              Límite Solicitado
            </h3>
          </template>

          <UFormField label="Límite de crédito solicitado" name="requested_credit_limit">
            <UInputNumber v-model="state.requested_credit_limit" class="w-full max-w-sm" :min="0" />
          </UFormField>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-semibold text-base">
              Documentos Escaneados
            </h3>
          </template>

          <UAlert
            color="neutral"
            variant="subtle"
            icon="i-lucide-info"
            title="Subida de archivos pendiente"
            description="El backend aún no expone un endpoint para subir archivos. Estos campos se habilitarán cuando esté disponible; por ahora la solicitud se envía sin documentos adjuntos."
            class="mb-4"
          />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField v-for="doc in documentFields" :key="doc.key" :label="doc.label">
              <UInput type="file" disabled class="w-full" />
            </UFormField>
          </div>
        </UCard>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            to="/registro-verificacion"
          />
          <UButton
            label="Registrar Solicitud"
            color="primary"
            variant="solid"
            type="submit"
            :loading="submitting"
          />
        </div>
      </UForm>
    </template>
  </UDashboardPanel>
</template>
