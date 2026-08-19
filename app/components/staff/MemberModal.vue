<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Branch, StaffMember, SystemRole } from '~/types'

const props = defineProps<{
  member: StaffMember | null
  branches: Branch[]
  allRoles?: boolean
}>()

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ created: [], updated: [] }>()

const STAFF_ROLE_CODES = ['coordinator', 'verifier', 'branch_manager', 'cashier']
// Roles que un gerente de sucursal puede crear/administrar en su propia
// sucursal. Debe reflejar exactamente ListStaffService::BRANCH_MANAGER_ROLES
// del backend — ahí es donde realmente se aplica la restricción; esta lista
// solo evita mostrarle al gerente opciones que el backend igual rechazaría.
const BRANCH_MANAGER_ROLE_CODES = ['cashier', 'coordinator', 'verifier']

const schema = z.object({
  first_name: z.string().min(2, 'Muy corto').max(100, 'Muy largo'),
  middle_name: z.string().max(100, 'Muy largo').optional(),
  last_name: z.string().min(2, 'Muy corto').max(100, 'Muy largo'),
  second_last_name: z.string().max(100, 'Muy largo').optional(),
  gender: z.string().optional(),
  birth_date: z.string().optional(),
  curp: z.string().max(18, 'CURP inválida').optional().superRefine((value, ctx) => {
    if (!props.member && (!value || value.length !== 18)) {
      ctx.addIssue({ code: 'custom', message: 'CURP inválida (18 caracteres)' })
    }
  }),
  rfc: z.string().max(13, 'RFC inválido').optional(),
  home_phone: z.string().max(20, 'Muy largo').optional(),
  mobile_phone: z.string().max(20, 'Muy largo').optional(),
  email: z.string().email('Correo inválido').max(150, 'Muy largo').optional(),
  street: z.string().max(150, 'Muy largo').optional(),
  external_number: z.string().max(30, 'Muy largo').optional(),
  neighborhood: z.string().max(120, 'Muy largo').optional(),
  city: z.string().max(120, 'Muy largo').optional(),
  state: z.string().max(120, 'Muy largo').optional(),
  postal_code: z.string().max(10, 'Muy largo').optional(),
  username: z.string().min(3, 'Muy corto').max(80, 'Muy largo'),
  password: z.string().optional().superRefine((value, ctx) => {
    if (!props.member && (!value || value.length < 8)) {
      ctx.addIssue({ code: 'custom', message: 'Mínimo 8 caracteres' })
    }
  }),
  role_code: z.string().min(1, 'Selecciona un rol'),
  branch_id: z.any().optional().superRefine((value, ctx) => {
    if (!value || Number(value) < 1) {
      ctx.addIssue({ code: 'custom', message: 'Selecciona una sucursal' })
    }
  }),
  is_active: z.boolean()
})

type Schema = z.output<typeof schema>

const { user } = useAuth()
const { listSystemRoles, createStaff, updateStaff } = useStaff()
const toast = useToast()
const submitting = ref(false)

const branchManagerBranchId = computed(() => {
  return user.value?.roles?.find(r => r.code === 'branch_manager' && r.branch_id !== null)?.branch_id ?? null
})

const isBranchManager = computed(() => user.value?.roles?.some(r => r.code === 'branch_manager') ?? false)

const roles = ref<SystemRole[]>([])
const roleItems = computed(() => {
  const available = isBranchManager.value
    ? roles.value.filter(r => BRANCH_MANAGER_ROLE_CODES.includes(r.code))
    : roles.value.filter(r => STAFF_ROLE_CODES.includes(r.code))

  return available.map(r => ({
    label: r.description || r.code,
    value: r.code
  }))
})

const branchItems = computed(() => {
  const available = isBranchManager.value
    ? props.branches.filter(b => b.id === branchManagerBranchId.value)
    : props.branches

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
  home_phone: '',
  mobile_phone: '',
  email: '',
  street: '',
  external_number: '',
  neighborhood: '',
  city: '',
  state: '',
  postal_code: '',
  username: '',
  password: '',
  role_code: isBranchManager.value ? 'cashier' : undefined,
  branch_id: isBranchManager.value && branchManagerBranchId.value ? String(branchManagerBranchId.value) : undefined,
  is_active: true
})

watch(() => props.member, (member) => {
  if (member) {
    state.first_name = member.person?.first_name || ''
    state.middle_name = member.person?.middle_name || ''
    state.last_name = member.person?.last_name || ''
    state.second_last_name = member.person?.second_last_name || ''
    state.gender = member.person?.gender ?? undefined
    state.birth_date = member.person?.birth_date || ''
    state.curp = member.person?.curp || ''
    state.rfc = member.person?.rfc || ''
    state.home_phone = member.person?.home_phone || ''
    state.mobile_phone = member.person?.mobile_phone || ''
    state.email = member.person?.email || ''
    state.street = member.person?.street || ''
    state.external_number = member.person?.external_number || ''
    state.neighborhood = member.person?.neighborhood || ''
    state.city = member.person?.city || ''
    state.state = member.person?.state || ''
    state.postal_code = member.person?.postal_code || ''
    state.username = member.username
    state.password = ''
    state.role_code = member.roles.find(r => r.is_primary)?.code ?? member.roles[0]?.code
    state.branch_id = String(member.roles.find(r => r.is_primary)?.branch_id ?? member.roles[0]?.branch_id ?? '')
    state.is_active = member.is_active
  } else {
    state.first_name = ''
    state.middle_name = ''
    state.last_name = ''
    state.second_last_name = ''
    state.gender = undefined
    state.birth_date = ''
    state.curp = ''
    state.rfc = ''
    state.home_phone = ''
    state.mobile_phone = ''
    state.email = ''
    state.street = ''
    state.external_number = ''
    state.neighborhood = ''
    state.city = ''
    state.state = ''
    state.postal_code = ''
    state.username = ''
    state.password = ''
    state.role_code = isBranchManager.value ? 'cashier' : undefined
    state.branch_id = isBranchManager.value && branchManagerBranchId.value ? String(branchManagerBranchId.value) : undefined
    state.is_active = true
  }
}, { immediate: true })

watch(open, async (isOpen) => {
  if (isOpen && roles.value.length === 0) {
    try {
      roles.value = await listSystemRoles()
    } catch {
      toast.add({ title: 'Error', description: 'No se pudieron cargar los roles.', color: 'error' })
    }
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    if (props.member) {
      await updateStaff(props.member.id, {
        is_active: event.data.is_active,
        role_code: event.data.role_code,
        branch_id: Number(event.data.branch_id),
        first_name: event.data.first_name,
        middle_name: event.data.middle_name || null,
        last_name: event.data.last_name,
        second_last_name: event.data.second_last_name || null,
        gender: event.data.gender || null,
        birth_date: event.data.birth_date || null,
        curp: event.data.curp || null,
        rfc: event.data.rfc || null,
        home_phone: event.data.home_phone || null,
        mobile_phone: event.data.mobile_phone || null,
        email: event.data.email || null,
        street: event.data.street || null,
        external_number: event.data.external_number || null,
        neighborhood: event.data.neighborhood || null,
        city: event.data.city || null,
        state: event.data.state || null,
        postal_code: event.data.postal_code || null
      })

      toast.add({
        title: 'Personal actualizado',
        description: `${event.data.first_name} ${event.data.last_name} fue actualizado correctamente`,
        color: 'success'
      })
      emit('updated')
    } else {
      await createStaff({
        first_name: event.data.first_name,
        middle_name: event.data.middle_name || undefined,
        last_name: event.data.last_name,
        second_last_name: event.data.second_last_name || undefined,
        gender: event.data.gender || undefined,
        birth_date: event.data.birth_date || undefined,
        curp: event.data.curp || '',
        rfc: event.data.rfc || undefined,
        home_phone: event.data.home_phone || undefined,
        mobile_phone: event.data.mobile_phone || undefined,
        email: event.data.email || undefined,
        street: event.data.street || undefined,
        external_number: event.data.external_number || undefined,
        neighborhood: event.data.neighborhood || undefined,
        city: event.data.city || undefined,
        state: event.data.state || undefined,
        postal_code: event.data.postal_code || undefined,
        username: event.data.username,
        password: event.data.password || '',
        role_code: event.data.role_code,
        branch_id: Number(event.data.branch_id)
      })

      toast.add({
        title: 'Personal creado',
        description: `${event.data.first_name} ${event.data.last_name} fue creado correctamente`,
        color: 'success'
      })

      state.first_name = ''
      state.middle_name = ''
      state.last_name = ''
      state.second_last_name = ''
      state.birth_date = ''
      state.curp = ''
      state.rfc = ''
      state.username = ''
      state.password = ''
      state.role_code = isBranchManager.value ? 'cashier' : undefined
      state.branch_id = isBranchManager.value ? branchManagerBranchId.value ?? undefined : undefined
      emit('created')
    }

    open.value = false
  } catch (e: unknown) {
    const message = e instanceof Error && 'data' in e
      ? JSON.stringify((e as { data?: { message?: string } }).data?.message ?? '')
      : ''
    toast.add({
      title: 'Error',
      description: message || 'No se pudo guardar el personal. Verifica los datos e intenta de nuevo.',
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
    :title="member ? 'Editar personal' : 'Nuevo miembro'"
    :description="member ? `Actualizar a ${member.username}` : 'Agrega un nuevo miembro al personal'"
    :ui="{ content: 'max-w-4xl' }"
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="grid grid-cols-2 gap-4">
          <UFormField required label="Nombre" name="first_name">
            <UInput v-model="state.first_name" class="w-full" />
          </UFormField>
          <UFormField label="Segundo nombre" name="middle_name">
            <UInput v-model="state.middle_name" class="w-full" />
          </UFormField>
          <UFormField required label="Apellido paterno" name="last_name">
            <UInput v-model="state.last_name" class="w-full" />
          </UFormField>
          <UFormField label="Apellido materno" name="second_last_name">
            <UInput v-model="state.second_last_name" class="w-full" />
          </UFormField>
        </div>

        <div class="grid grid-cols-2 gap-4">
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
          <UFormField
            v-if="!member"
            required
            label="CURP"
            name="curp"
          >
            <UInput
              v-model="state.curp"
              class="w-full uppercase"
              placeholder="18 caracteres"
            />
          </UFormField>
          <UFormField label="RFC" name="rfc">
            <UInput v-model="state.rfc" class="w-full" uppercase />
          </UFormField>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Teléfono de casa" name="home_phone">
            <UInput v-model="state.home_phone" class="w-full" />
          </UFormField>
          <UFormField label="Celular" name="mobile_phone">
            <UInput v-model="state.mobile_phone" class="w-full" />
          </UFormField>
          <UFormField label="Correo" name="email">
            <UInput v-model="state.email" type="email" class="w-full" />
          </UFormField>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Calle" name="street">
            <UInput v-model="state.street" class="w-full" />
          </UFormField>
          <UFormField label="Número exterior" name="external_number">
            <UInput v-model="state.external_number" class="w-full" />
          </UFormField>
          <UFormField label="Colonia" name="neighborhood">
            <UInput v-model="state.neighborhood" class="w-full" />
          </UFormField>
          <UFormField label="C.P." name="postal_code">
            <UInput v-model="state.postal_code" class="w-full" />
          </UFormField>
          <UFormField label="Ciudad" name="city">
            <UInput v-model="state.city" class="w-full" />
          </UFormField>
          <UFormField label="Estado" name="state">
            <UInput v-model="state.state" class="w-full" />
          </UFormField>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <UFormField required label="Nombre de usuario" name="username">
            <UInput v-model="state.username" class="w-full" />
          </UFormField>

          <UFormField
            v-if="!member"
            required
            label="Contraseña"
            name="password"
          >
            <UInput v-model="state.password" type="password" class="w-full" />
          </UFormField>
        </div>

        <UFormField required label="Rol" name="role_code">
          <USelect
            v-model="state.role_code"
            :items="roleItems"
            placeholder="Seleccionar rol..."
            class="w-full"
          />
        </UFormField>

        <UFormField required label="Sucursal" name="branch_id">
          <USelect
            v-model="state.branch_id"
            :items="branchItems"
            :disabled="isBranchManager"
            placeholder="Seleccionar sucursal..."
            class="w-full"
          />
        </UFormField>

        <UFormField v-if="member" label="Activo" name="is_active">
          <UToggle v-model="state.is_active" aria-label="Activo" />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            :label="member ? 'Guardar' : 'Crear'"
            color="primary"
            variant="solid"
            type="submit"
            :loading="submitting"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
