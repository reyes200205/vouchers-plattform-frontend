<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Branch, SystemRole, StaffMember } from '~/types'

const STAFF_ROLE_CODES = ['coordinator', 'verifier', 'branch_manager', 'cashier']
const BRANCH_MANAGER_ROLE_CODES = ['cashier', 'coordinator', 'verifier']

const schema = z.object({
  first_name: z.string().min(2, 'Muy corto').max(100, 'Muy largo'),
  middle_name: z.string().max(100, 'Muy largo').optional(),
  last_name: z.string().min(2, 'Muy corto').max(100, 'Muy largo'),
  second_last_name: z.string().min(2, 'Muy corto').max(100, 'Muy largo'),
  gender: z.string().min(1, 'Selecciona el género'),
  birth_date: z.string().min(1, 'La fecha de nacimiento es obligatoria').superRefine((val, ctx) => {
    const birthDate = new Date(val);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      ctx.addIssue({
        code: 'custom',
        message: 'El miembro de personal debe ser mayor de 18 años'
      });
    }
  }),
  curp: z.string().superRefine((value, ctx) => {
    if (!value || value.length !== 18) {
      ctx.addIssue({ code: 'custom', message: 'CURP inválida (18 caracteres)' })
      return
    }
    if (!isValidCurp(value)) {
      ctx.addIssue({ code: 'custom', message: 'CURP con formato inválido' })
    }
  }),
  rfc: z.string().superRefine((value, ctx) => {
    if (!value || value.length < 10 || value.length > 13) {
      ctx.addIssue({ code: 'custom', message: 'RFC es obligatorio (10 a 13 caracteres)' })
      return
    }
    if (!isValidRfc(value)) {
      ctx.addIssue({ code: 'custom', message: 'RFC con formato inválido' })
    }
  }),
  mobile_phone: z.string().min(10, 'Mínimo 10 dígitos').max(20, 'Muy largo'),
  street: z.string().min(1, 'La calle es obligatoria').max(150, 'Muy largo'),
  external_number: z.string().min(1, 'El número exterior es obligatorio').max(30, 'Muy largo'),
  neighborhood: z.string().min(1, 'La colonia es obligatoria').max(120, 'Muy largo'),
  city: z.string().min(1, 'La ciudad es obligatoria').max(120, 'Muy largo'),
  state: z.string().min(1, 'El estado es obligatorio').max(120, 'Muy largo'),
  postal_code: z.string().min(5, 'Código postal inválido').max(10, 'Muy largo'),
  username: z.string().email('Correo inválido').max(80, 'Muy largo'),
  role_code: z.string().min(1, 'Selecciona un rol'),
  branch_id: z.any().optional(),
  is_active: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.role_code !== 'general_manager') {
    if (!data.branch_id || Number(data.branch_id) < 1) {
      ctx.addIssue({
        path: ['branch_id'],
        code: 'custom',
        message: 'Selecciona una sucursal'
      })
    }
  }
})

type Schema = z.output<typeof schema>

const route = useRoute()
const memberId = Number(route.params.id)

const { user, fetchMe } = useAuth()
const { listSystemRoles, getStaff, updateStaff } = useStaff()
const { listBranches } = useBranches()
const toast = useToast()
const router = useRouter()
const submitting = ref(false)

const branchManagerBranchId = computed(() => {
  return user.value?.roles?.find(r => r.code === 'branch_manager' && r.branch_id !== null)?.branch_id ?? null
})

const isBranchManager = computed(() => user.value?.roles?.some(r => r.code === 'branch_manager') ?? false)
const isSuperAdmin = computed(() => user.value?.roles?.some(r => r.code === 'super-admin') ?? false)

// Ver la misma nota en staff/new.vue: refresca la sesión guardada por si el
// rol/sucursal del gerente cambió después de su último login.
await fetchMe()

const { data: branches } = await useAsyncData<Branch[]>('staff-edit-branches', () => listBranches(), { default: () => [] })
const { data: member, status: memberStatus } = await useAsyncData<StaffMember>('staff-edit-member-' + memberId, () => getStaff(memberId))

const roles = ref<SystemRole[]>([])
const roleItems = computed(() => {
  const allowedRoles = [...STAFF_ROLE_CODES]
  if (isSuperAdmin.value) {
    allowedRoles.push('general_manager')
  }

  const available = isBranchManager.value
    ? roles.value.filter(r => BRANCH_MANAGER_ROLE_CODES.includes(r.code))
    : roles.value.filter(r => allowedRoles.includes(r.code))

  return available.map(r => ({
    label: r.description || r.code,
    value: r.code
  }))
})

const branchItems = computed(() => {
  let available = branches.value

  if (isBranchManager.value) {
    available = available.filter(b => b.id === branchManagerBranchId.value)
  } else if (state.role_code === 'general_manager') {
    // Un gerente general puede tener una sucursal "base" (ej. la matriz), pero
    // solo si esa sucursal no tiene ya su propio gerente de sucursal dedicado.
    // Igual conserva acceso a todas las sucursales sin importar cual elija aqui.
    available = available.filter(b => !b.manager || b.id === member.value?.home_branch?.id)
  }

  return available.map(b => ({
    label: b.name,
    value: b.id.toString()
  }))
})

const state = reactive<Partial<Schema>>({
  first_name: '',
  middle_name: '',
  last_name: '',
  second_last_name: '',
  gender: undefined,
  birth_date: '',
  curp: '',
  rfc: '',
  mobile_phone: '',
  street: '',
  external_number: '',
  neighborhood: '',
  city: '',
  state: '',
  postal_code: '',
  username: '',
  role_code: isBranchManager.value ? 'cashier' : undefined,
  branch_id: isBranchManager.value && branchManagerBranchId.value ? String(branchManagerBranchId.value) : undefined,
  is_active: true
})

watch(member, (val) => {
  if (val) {
    state.first_name = val.person?.first_name || ''
    state.middle_name = val.person?.middle_name || ''
    state.last_name = val.person?.last_name || ''
    state.second_last_name = val.person?.second_last_name || ''
    state.gender = val.person?.gender ?? undefined
    state.birth_date = val.person?.birth_date || ''
    state.curp = val.person?.curp || ''
    state.rfc = val.person?.rfc || ''
    state.mobile_phone = val.person?.mobile_phone || ''
    state.street = val.person?.street || ''
    state.external_number = val.person?.external_number || ''
    state.neighborhood = val.person?.neighborhood || ''
    state.city = val.person?.city || ''
    state.state = val.person?.state || ''
    state.postal_code = val.person?.postal_code || ''
    state.username = val.username
    state.role_code = val.roles.find(r => r.is_primary)?.code ?? val.roles[0]?.code
    state.branch_id = state.role_code === 'general_manager'
      ? (val.home_branch ? String(val.home_branch.id) : undefined)
      : String(val.roles.find(r => r.is_primary)?.branch_id ?? val.roles[0]?.branch_id ?? '')
    state.is_active = val.is_active
  }
}, { immediate: true })

// Si el rol cambia (a mano, en el formulario ya abierto) y la sucursal
// seleccionada ya no es valida para el rol nuevo (ej. paso a Gerente General
// y esa sucursal tiene su propio gerente dedicado), la limpiamos para no
// enviar un branch_id obsoleto sin que se note en la UI. No se dispara al
// hidratar desde member (arriba) porque branchItems ya refleja el rol y la
// sucursal recien asignados para ese momento.
watch(() => state.role_code, () => {
  if (!branchItems.value.some(b => b.value === state.branch_id)) {
    state.branch_id = undefined
  }
})

onMounted(async () => {
  try {
    roles.value = await listSystemRoles()
  } catch {
    toast.add({ title: 'Error', description: 'No se pudieron cargar los roles.', color: 'error' })
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    await updateStaff(memberId, {
      is_active: event.data.is_active,
      role_code: event.data.role_code,
      branch_id: event.data.branch_id ? Number(event.data.branch_id) : null,
      first_name: event.data.first_name,
      middle_name: event.data.middle_name || null,
      last_name: event.data.last_name,
      second_last_name: event.data.second_last_name,
      gender: event.data.gender,
      birth_date: event.data.birth_date,
      curp: event.data.curp,
      rfc: event.data.rfc,
      mobile_phone: event.data.mobile_phone,
      email: event.data.username,
      street: event.data.street,
      external_number: event.data.external_number,
      neighborhood: event.data.neighborhood,
      city: event.data.city,
      state: event.data.state,
      postal_code: event.data.postal_code
    })

    toast.add({
      title: 'Personal actualizado',
      description: `${event.data.first_name} ${event.data.last_name} fue actualizado correctamente`,
      color: 'success'
    })

    router.push('/general/staff')
  } catch (e: any) {
    const apiErrors = e?.data?.errors
    if ((e?.status === 422 || e?.statusCode === 422) && apiErrors) {
      const formattedErrors = Object.entries(apiErrors).map(([field, messages]) => ({
        name: field,
        message: (messages as string[])[0] || 'Dato inválido'
      }))
      formRef.value?.setErrors(formattedErrors)
    }

    toast.add({
      title: 'Error',
      description: extractApiErrorMessage(e, 'No se pudo actualizar el personal. Verifica los datos e intenta de nuevo.'),
      color: 'error'
    })
  } finally {
    submitting.value = false
  }
}

const formRef = ref<any>(null)
</script>

<template>
  <UDashboardPanel id="staff-edit">
    <template #header>
      <UDashboardNavbar :title="member ? `Editar: ${member.person?.first_name} ${member.person?.last_name}` : 'Editar Miembro'">
        <template #leading>
          <UButton
            icon="i-lucide-arrow-left"
            color="neutral"
            variant="ghost"
            to="/general/staff"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="memberStatus === 'pending'" class="flex items-center justify-center py-10">
        <UIcon name="i-lucide-loader-2" class="size-8 animate-spin text-muted" />
      </div>
      <div v-else-if="!member" class="p-6">
        <UAlert
          color="error"
          variant="subtle"
          icon="i-lucide-triangle-alert"
          title="Error al cargar"
          description="No se pudo encontrar al miembro del personal especificado."
        />
      </div>
      <div v-else class="w-full p-6">
        <UForm
          ref="formRef"
          :schema="schema"
          :state="state"
          class="space-y-6"
          @submit="onSubmit"
        >
          <UCard>
            <template #header>
              <h3 class="font-semibold text-base">Datos Personales</h3>
            </template>

            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              <UFormField required label="Género" name="gender">
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
              <UFormField required label="Fecha de nacimiento" name="birth_date">
                <UInput v-model="state.birth_date" type="date" class="w-full" />
              </UFormField>
              <UFormField required label="CURP" name="curp">
                <UInput
                  v-model="state.curp"
                  class="w-full uppercase"
                  placeholder="18 caracteres"
                />
              </UFormField>
              <UFormField required label="RFC" name="rfc">
                <UInput v-model="state.rfc" class="w-full uppercase" />
              </UFormField>
              <UFormField required label="Celular" name="mobile_phone">
                <UInput v-model="state.mobile_phone" class="w-full" />
              </UFormField>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="font-semibold text-base">Domicilio</h3>
            </template>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UFormField required label="Calle" name="street">
                <UInput v-model="state.street" class="w-full" />
              </UFormField>
              <UFormField required label="Número exterior" name="external_number">
                <UInput v-model="state.external_number" class="w-full" />
              </UFormField>
              <UFormField required label="Colonia" name="neighborhood">
                <UInput v-model="state.neighborhood" class="w-full" />
              </UFormField>
              <UFormField required label="C.P." name="postal_code">
                <UInput v-model="state.postal_code" class="w-full" />
              </UFormField>
              <UFormField required label="Ciudad" name="city">
                <UInput v-model="state.city" class="w-full" />
              </UFormField>
              <UFormField required label="Estado" name="state">
                <UInput v-model="state.state" class="w-full" />
              </UFormField>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="font-semibold text-base">Datos de Acceso y Permisos</h3>
            </template>

            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <UFormField required label="Nombre de usuario (Email)" name="username">
                <UInput v-model="state.username" class="w-full" />
              </UFormField>
              <UFormField required label="Rol" name="role_code">
                <USelect
                  v-model="state.role_code"
                  :items="roleItems"
                  placeholder="Seleccionar rol..."
                  class="w-full"
                />
              </UFormField>
              <UFormField
                :required="state.role_code !== 'general_manager'"
                label="Sucursal"
                :description="state.role_code === 'general_manager' ? 'Opcional: sucursal base. El gerente general conserva acceso a todas las sucursales.' : undefined"
                name="branch_id"
              >
                <USelect
                  v-model="state.branch_id"
                  :items="branchItems"
                  :disabled="isBranchManager"
                  placeholder="Seleccionar sucursal..."
                  class="w-full"
                />
              </UFormField>
              <UFormField label="Activo" name="is_active">
                <USwitch v-model="state.is_active" aria-label="Activo" />
              </UFormField>
            </div>
          </UCard>

          <div class="flex justify-end gap-3">
            <UButton
              label="Cancelar"
              color="neutral"
              variant="subtle"
              to="/general/staff"
            />
            <UButton
              label="Guardar Cambios"
              color="primary"
              variant="solid"
              type="submit"
              :loading="submitting"
            />
          </div>
        </UForm>
      </div>
    </template>
  </UDashboardPanel>
</template>
