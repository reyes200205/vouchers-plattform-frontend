<script setup lang="ts">
import type { Application } from '~/composables/useApplications'

const props = defineProps<{
  detail: Application
}>()

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

function fmtDate(value: string | null | undefined) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

// Fechas puras (nacimiento) no llevan hora — mostrarla solo confunde. Se usa
// { timeZone: 'UTC' } porque el backend manda la fecha como medianoche UTC
// (2005-02-20T00:00:00.000000Z); sin esto, en zonas horarias negativas se
// recorre un día hacia atrás al formatear en la zona local del navegador.
function fmtBirthDate(value: string | null | undefined) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

function fmtValue(value: unknown) {
  if (value === null || value === undefined || value === '') return '—'
  return String(value)
}

const GENDER_LABELS: Record<string, string> = {
  M: 'Masculino',
  F: 'Femenino',
  OTHER: 'Otro'
}

function fmtGender(value: string | null | undefined) {
  if (!value) return '—'
  return GENDER_LABELS[value] ?? value
}

// family_data_json llega anidado tal cual lo arma registro-verificacion/new.vue
// (members / occupation / housing.work_reference), no como pares planos — ver
// ApplicationFamilyData en useApplications.ts.
const familyMembers = computed(() => (props.detail.family_data_json?.members ?? [])
  .filter(m => m.name || m.relationship || m.phone || m.age))

const occupation = computed(() => {
  const data = props.detail.family_data_json?.occupation
  if (!data || (!data.type && !data.place_name && !data.position && !data.phone && !data.years)) return null
  return data
})

const housing = computed(() => {
  const data = props.detail.family_data_json?.housing
  if (!data || (!data.ownership_type && !data.dimensions && !data.years_at_address && !data.work_reference?.name)) return null
  return data
})

const vehicles = computed(() => (props.detail.vehicles_json ?? [])
  .filter(v => v.brand || v.model || v.year || v.plates))

const externalAffiliationsEntries = computed(() => {
  const data = props.detail.external_affiliations_json
  if (!data) return []
  return Object.entries(data).filter(([, value]) => value !== null && value !== undefined && value !== '')
})

// Correcciones que el verificador hizo sobre lo que capturó el coordinador —
// gerencia necesita ver esto para decidir con la información correcta.
const corrections = computed(() => props.detail.verifier_corrections_json ?? [])

// Evidencia fotográfica de las DOS etapas: lo que subió la coordinadora al
// capturar la solicitud (INE, comprobante) y lo que subió el verificador en
// la visita (fachada, identificación con la persona).
//
// Se distingue "nunca se subió" (no hay *_path -> no aparece en la lista) de
// "se subió pero ahora mismo no se pudo generar el link" (hay *_path pero
// *_url vino null porque SpacesStorageService::temporaryUrlFor() atrapo un
// error -- credenciales, red, etc. -- y lo reporto en el log en vez de
// tumbar toda la pantalla). Antes ambos casos se veian identicos: la foto
// simplemente no aparecia, como si jamas se hubiera cargado, lo cual
// confundia "esto nunca se subio" con "esto fallo al mostrarse ahora".
interface EvidencePhoto {
  label: string
  url: string | null
  broken: boolean
}

const coordinatorPhotos = computed<EvidencePhoto[]>(() => {
  const items: EvidencePhoto[] = []
  if (props.detail.id_front_path) items.push({ label: 'INE (frente)', url: props.detail.id_front_url ?? null, broken: !props.detail.id_front_url })
  if (props.detail.id_back_path) items.push({ label: 'INE (reverso)', url: props.detail.id_back_url ?? null, broken: !props.detail.id_back_url })
  if (props.detail.proof_of_address_path) items.push({ label: 'Comprobante de domicilio', url: props.detail.proof_of_address_url ?? null, broken: !props.detail.proof_of_address_url })
  return items
})

const verifierPhotos = computed<EvidencePhoto[]>(() => {
  const verification = props.detail.verification
  const items: EvidencePhoto[] = []
  if (verification?.front_photo) items.push({ label: 'Foto de fachada', url: verification.front_photo_url ?? null, broken: !verification.front_photo_url })
  if (verification?.id_with_person_photo) items.push({ label: 'Identificación con la persona', url: verification.id_with_person_photo_url ?? null, broken: !verification.id_with_person_photo_url })
  if (verification?.proof_of_address_photo) items.push({ label: 'Comprobante de domicilio (visita)', url: verification.proof_of_address_photo_url ?? null, broken: !verification.proof_of_address_photo_url })
  return items
})
</script>

<template>
  <div class="space-y-5">
    <div class="rounded-lg border border-default p-4">
      <p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
        Datos personales
      </p>
      <div class="grid grid-cols-1 gap-x-4 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p class="text-xs text-muted">
            CURP
          </p>
          <p class="text-highlighted">
            {{ fmtValue(detail.applicant?.curp) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            RFC
          </p>
          <p class="text-highlighted">
            {{ fmtValue(detail.applicant?.rfc) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            Género
          </p>
          <p class="text-highlighted">
            {{ fmtGender(detail.applicant?.gender) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            Fecha de nacimiento
          </p>
          <p class="text-highlighted">
            {{ fmtBirthDate(detail.applicant?.birth_date) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            Teléfono de casa
          </p>
          <p class="text-highlighted">
            {{ fmtValue(detail.applicant?.home_phone) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            Celular
          </p>
          <p class="text-highlighted">
            {{ fmtValue(detail.applicant?.mobile_phone) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            Correo
          </p>
          <p class="text-highlighted">
            {{ fmtValue(detail.applicant?.email) }}
          </p>
        </div>
        <div v-if="detail.applicant?.notes" class="sm:col-span-2 lg:col-span-3">
          <p class="text-xs text-muted">
            Notas
          </p>
          <p class="text-highlighted">
            {{ detail.applicant.notes }}
          </p>
        </div>
      </div>
    </div>

    <div class="rounded-lg border border-default p-4">
      <p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
        Domicilio
      </p>
      <div class="grid grid-cols-1 gap-x-4 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <div class="sm:col-span-2 lg:col-span-3">
          <p class="text-xs text-muted">
            Dirección
          </p>
          <p class="text-highlighted">
            {{ [detail.applicant?.street, detail.applicant?.external_number, detail.applicant?.neighborhood, detail.applicant?.city, detail.applicant?.state, detail.applicant?.postal_code].filter(Boolean).join(', ') || '—' }}
          </p>
        </div>
        <div v-if="detail.applicant?.street_references" class="sm:col-span-2 lg:col-span-3">
          <p class="text-xs text-muted">
            Referencias del domicilio
          </p>
          <p class="mt-1 rounded-lg border border-default bg-elevated/40 p-2.5 text-xs text-highlighted">
            {{ detail.applicant.street_references }}
          </p>
        </div>
      </div>
    </div>

    <div class="rounded-lg border border-default p-4">
      <p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
        Solicitud de crédito
      </p>
      <div class="grid grid-cols-1 gap-x-4 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p class="text-xs text-muted">
            Crédito solicitado
          </p>
          <p class="text-highlighted">
            {{ money.format(Number(detail.requested_credit_limit || 0)) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            Categoría inicial
          </p>
          <p class="text-highlighted">
            {{ fmtValue(detail.initial_category_code) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            Resultado buró
          </p>
          <p class="text-highlighted">
            {{ detail.credit_bureau_result || 'Sin dato' }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            Prevale
          </p>
          <p class="text-highlighted">
            {{ detail.prevale_approved ? 'Aprobado' : 'Pendiente' }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            Enviada
          </p>
          <p class="text-highlighted">
            {{ fmtDate(detail.submitted_at) }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="familyMembers.length" class="rounded-lg border border-default p-4">
      <p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
        Familiares y cónyuge
      </p>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="text-xs text-muted">
              <th class="pb-1 pr-3 font-normal">
                Nombre
              </th>
              <th class="pb-1 pr-3 font-normal">
                Parentesco
              </th>
              <th class="pb-1 pr-3 font-normal">
                Teléfono
              </th>
              <th class="pb-1 font-normal">
                Edad
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(member, index) in familyMembers" :key="index" class="border-t border-default">
              <td class="py-1.5 pr-3 text-highlighted">
                {{ fmtValue(member.name) }}
              </td>
              <td class="py-1.5 pr-3 text-highlighted">
                {{ fmtValue(member.relationship) }}
              </td>
              <td class="py-1.5 pr-3 text-highlighted">
                {{ fmtValue(member.phone) }}
              </td>
              <td class="py-1.5 text-highlighted">
                {{ member.age ?? '—' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="occupation || housing" class="rounded-lg border border-default p-4">
      <p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
        Ocupación y vivienda
      </p>

      <div v-if="occupation" class="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p class="text-xs text-muted">
            Trabaja o estudia
          </p>
          <p class="text-highlighted">
            {{ fmtValue(occupation.type) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            Nombre del trabajo o escuela
          </p>
          <p class="text-highlighted">
            {{ fmtValue(occupation.place_name) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            Puesto o grado
          </p>
          <p class="text-highlighted">
            {{ fmtValue(occupation.position) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            Teléfono del trabajo o escuela
          </p>
          <p class="text-highlighted">
            {{ fmtValue(occupation.phone) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            Antigüedad
          </p>
          <p class="text-highlighted">
            {{ occupation.years !== null ? `${occupation.years} años` : '—' }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            Ganancia al mes
          </p>
          <p class="text-highlighted">
            {{ occupation.monthly_income !== null && occupation.monthly_income !== undefined ? money.format(occupation.monthly_income) : '—' }}
          </p>
        </div>
      </div>

      <div v-if="housing" class="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 border-t border-default pt-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p class="text-xs text-muted">
            Tenencia de la vivienda
          </p>
          <p class="text-highlighted">
            {{ fmtValue(housing.ownership_type) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            Dimensiones de la vivienda
          </p>
          <p class="text-highlighted">
            {{ fmtValue(housing.dimensions) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted">
            Años viviendo en el domicilio
          </p>
          <p class="text-highlighted">
            {{ housing.years_at_address !== null ? `${housing.years_at_address} años` : '—' }}
          </p>
        </div>
        <div v-if="housing.work_reference?.name" class="sm:col-span-2 lg:col-span-3">
          <p class="text-xs text-muted">
            Referencia laboral
          </p>
          <p class="text-highlighted">
            {{ housing.work_reference.name }}{{ housing.work_reference.phone ? ` · ${housing.work_reference.phone}` : '' }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="vehicles.length || externalAffiliationsEntries.length" class="rounded-lg border border-default p-4">
      <p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
        Vehículos y afiliaciones
      </p>

      <div v-if="vehicles.length" class="flex flex-wrap gap-2">
        <UBadge
          v-for="(vehicle, index) in vehicles"
          :key="index"
          variant="subtle"
          color="neutral"
        >
          {{ [vehicle.brand, vehicle.model, vehicle.year, vehicle.plates].filter(Boolean).join(' · ') || `Vehículo ${index + 1}` }}
        </UBadge>
      </div>

      <div v-if="externalAffiliationsEntries.length" class="mt-3 border-t border-default pt-3">
        <p class="mb-2 text-xs text-muted">
          Afiliaciones externas
        </p>
        <div class="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="[key, value] in externalAffiliationsEntries" :key="key">
            <p class="text-xs capitalize text-muted">
              {{ key.replace(/_/g, ' ') }}
            </p>
            <p class="text-highlighted">
              {{ fmtValue(value) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="corrections.length" class="rounded-lg border border-warning/40 bg-warning/5 p-4">
      <p class="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-warning">
        <UIcon name="i-lucide-pencil-line" class="size-3.5" />
        Corregido por el verificador
      </p>

      <div class="space-y-3">
        <div v-for="(entry, index) in corrections" :key="index" class="text-sm">
          <p class="text-xs text-muted">
            {{ entry.corrected_by_name }} · {{ fmtDate(entry.corrected_at) }}
          </p>
          <ul class="mt-1 space-y-1">
            <li v-for="change in entry.changes" :key="change.field" class="flex flex-wrap items-baseline gap-1.5">
              <span class="font-medium text-highlighted">{{ change.label }}:</span>
              <span class="text-muted line-through">{{ fmtValue(change.old_value) }}</span>
              <UIcon name="i-lucide-arrow-right" class="size-3 text-muted" />
              <span class="text-highlighted">{{ fmtValue(change.new_value) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="detail.verification" class="rounded-lg border border-default p-4">
      <p class="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
        Verificación en sitio
      </p>
      <div class="flex flex-wrap items-center gap-2 text-sm">
        <UBadge
          :color="detail.verification.result === 'VERIFICADA' ? 'success' : 'error'"
          variant="subtle"
          :label="detail.verification.result"
        />
        <span v-if="detail.verification.visit_date" class="text-xs text-muted">
          {{ fmtDate(detail.verification.visit_date) }}
        </span>
        <span v-if="detail.verification.distance_meters" class="text-xs text-muted">
          · {{ detail.verification.distance_meters }}m del domicilio declarado
        </span>
      </div>
      <p v-if="detail.verification.notes" class="mt-1 text-sm text-muted">
        {{ detail.verification.notes }}
      </p>
    </div>

    <div class="rounded-lg border border-default p-4">
      <p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
        Evidencia fotográfica
      </p>

      <div v-if="coordinatorPhotos.length" class="mb-4">
        <p class="mb-2 text-xs text-muted">
          Cargada por el coordinador al capturar la solicitud
        </p>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <a
            v-for="photo in coordinatorPhotos"
            :key="photo.label"
            :href="photo.url ?? undefined"
            :target="photo.url ? '_blank' : undefined"
            rel="noopener"
            class="group block overflow-hidden rounded-lg border"
            :class="photo.broken ? 'border-error/40 cursor-default' : 'border-default'"
          >
            <div v-if="photo.broken" class="flex aspect-square w-full flex-col items-center justify-center gap-1 bg-error/5 p-2 text-center">
              <UIcon name="i-lucide-image-off" class="size-5 text-error" />
              <p class="text-[11px] text-error">No se pudo cargar</p>
            </div>
            <img
              v-else
              :src="photo.url!"
              :alt="photo.label"
              class="aspect-square w-full object-cover transition group-hover:opacity-80"
            >
            <p class="truncate px-2 py-1 text-xs text-muted">{{ photo.label }}</p>
          </a>
        </div>
      </div>

      <div v-if="verifierPhotos.length">
        <p class="mb-2 text-xs text-muted">
          Cargada por el verificador durante la visita
        </p>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <a
            v-for="photo in verifierPhotos"
            :key="photo.label"
            :href="photo.url ?? undefined"
            :target="photo.url ? '_blank' : undefined"
            rel="noopener"
            class="group block overflow-hidden rounded-lg border"
            :class="photo.broken ? 'border-error/40 cursor-default' : 'border-default'"
          >
            <div v-if="photo.broken" class="flex aspect-square w-full flex-col items-center justify-center gap-1 bg-error/5 p-2 text-center">
              <UIcon name="i-lucide-image-off" class="size-5 text-error" />
              <p class="text-[11px] text-error">No se pudo cargar</p>
            </div>
            <img
              v-else
              :src="photo.url!"
              :alt="photo.label"
              class="aspect-square w-full object-cover transition group-hover:opacity-80"
            >
            <p class="truncate px-2 py-1 text-xs text-muted">{{ photo.label }}</p>
          </a>
        </div>
      </div>

      <p v-if="!coordinatorPhotos.length && !verifierPhotos.length" class="text-xs text-dimmed">
        No hay fotos de evidencia cargadas todavía.
      </p>
    </div>
  </div>
</template>
