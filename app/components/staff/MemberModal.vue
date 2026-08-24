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
  second_last_name: z.string().max(100, 'Muy largo').optional().superRefine((value, ctx) => {
    if (!props.member && !value) {
      ctx.addIssue({ code: 'custom', message: 'Requerido' })
    }
  }),
  gender: z.string().optional().superRefine((value, ctx) => {
    if (!props.member && !value) {
      ctx.addIssue({ code: 'custom', message: 'Selecciona un género' })
    }
  }),
  birth_date: z.string().optional().superRefine((value, ctx) => {
    if (!props.member && !value) {
      ctx.addIssue({ code: 'custom', message: 'Requerido' })
      return
    }
    if (!value) return
    const birthDate = new Date(value)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    if (age < 18) {
      ctx.addIssue({ code: 'custom', message: 'El miembro de personal debe ser mayor de 18 años' })
    }
  }),
  curp: z.string().max(18, 'CURP inválida').optional().superRefine((value, ctx) => {
    if (!props.member && (!value || value.length !== 18)) {
      ctx.addIssue({ code: 'custom', message: 'CURP inválida (18 caracteres)' })
      return
    }
    if (value && !isValidCurp(value)) {
      ctx.addIssue({ code: 'custom', message: 'CURP con formato inválido' })
    }
  }),
  rfc: z.string().max(13, 'RFC inválido').optional().superRefine((value, ctx) => {
    if (!props.member && !value) {
      ctx.addIssue({ code: 'custom', message: 'Requerido' })
      return
    }
    if (value && !isValidRfc(value)) {
      ctx.addIssue({ code: 'custom', message: 'RFC con formato inválido' })
    }
  }),
  mobile_phone: z.string().max(20, 'Muy largo').optional().superRefine((value, ctx) => {
    if (!props.member && !value) {
      ctx.addIssue({ code: 'custom', message: 'Requerido' })
    }
  }),
  street: z.string().max(150, 'Muy largo').optional().superRefine((value, ctx) => {
    if (!props.member && !value) {
      ctx.addIssue({ code: 'custom', message: 'Requerido' })
    }
  }),
  external_number: z.string().max(30, 'Muy largo').optional().superRefine((value, ctx) => {
    if (!props.member && !value) {
      ctx.addIssue({ code: 'custom', message: 'Requerido' })
    }
  }),
  neighborhood: z.string().max(120, 'Muy largo').optional().superRefine((value, ctx) => {
    if (!props.member && !value) {
      ctx.addIssue({ code: 'custom', message: 'Requerido' })
    }
  }),
  city: z.string().max(120, 'Muy largo').optional().superRefine((value, ctx) => {
    if (!props.member && !value) {
      ctx.addIssue({ code: 'custom', message: 'Requerido' })
    }
  }),
  state: z.string().max(120, 'Muy largo').optional().superRefine((value, ctx) => {
    if (!props.member && !value) {
      ctx.addIssue({ code: 'custom', message: 'Requerido' })
    }
  }),
  postal_code: z.string().max(10, 'Muy largo').optional().superRefine((value, ctx) => {
    if (!props.member && !value) {
      ctx.addIssue({ code: 'custom', message: 'Requerido' })
    }
  }),
  username: z.string().email('Correo inválido').max(80, 'Muy largo'),
  password: z.string().optional().superRefine((value, ctx) => {
    if (!props.member && (!value || value.length < 8)) {
      ctx.addIssue({ code: 'custom', message: 'Mínimo 8 caracteres' })
    }
  }),
  role_code: z.string().min(1, 'Selecciona un rol'),
  branch_id: z.any().optional(),
  is_active: z.boolean()
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

const { user } = useAuth()
const { listSystemRoles, createStaff, updateStaff } = useStaff()
const toast = useToast()
const submitting = ref(false)

const branchManagerBranchId = computed(() => {
  return user.value?.roles?.find(r => r.code === 'branch_manager' && r.branch_id !== null)?.branch_id ?? null
})

const isBranchManager = computed(() => user.value?.roles?.some(r => r.code === 'branch_manager') ?? false)
const isSuperAdmin = computed(() => user.value?.roles?.some(r => r.code === 'super-admin') ?? false)

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
  mobile_phone: '',
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
    state.mobile_phone = member.person?.mobile_phone || ''
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
    state.mobile_phone = ''
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

watch(() => state.role_code, (newRole) => {
  if (newRole === 'general_manager') {
    state.branch_id = undefined
  }
})

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
        mobile_phone: event.data.mobile_phone || null,
        email: event.data.username,
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
        mobile_phone: event.data.mobile_phone || undefined,
        email: event.data.username,
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
      description: extractApiErrorMessage(e, 'No se pudo guardar el personal. Verifica los datos e intenta de nuevo.'),
      color: 'error'
    })
  } finally {
    submitting.value = false
  }
}

const formRef = ref<any>(null)
</script>

<template>
  <UModal
    v-model:open="open"
    :title="member ? 'Editar personal' : 'Nuevo miembro'"
    :description="member ? `Actualizar a ${member.username}` : 'Agrega un nuevo miembro al personal'"
    :ui="{ content: 'max-w-5xl' }"
  >
    <template #body>
      <UForm
        ref="formRef"
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
          <UFormField :required="!member" label="Apellido materno" name="second_last_name">
            <UInput v-model="state.second_last_name" class="w-full" />
          </UFormField>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <UFormField :required="!member" label="Género" name="gender">
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
          <UFormField :required="!member" label="Fecha de nacimiento" name="birth_date">
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
          <UFormField :required="!member" label="RFC" name="rfc">
            <UInput v-model="state.rfc" class="w-full" uppercase />
          </UFormField>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <UFormField :required="!member" label="Celular" name="mobile_phone">
            <UInput v-model="state.mobile_phone" class="w-full" />
          </UFormField>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <UFormField :required="!member" label="Calle" name="street">
            <UInput v-model="state.street" class="w-full" />
          </UFormField>
          <UFormField :required="!member" label="Número exterior" name="external_number">
            <UInput v-model="state.external_number" class="w-full" />
          </UFormField>
          <UFormField :required="!member" label="Colonia" name="neighborhood">
            <UInput v-model="state.neighborhood" class="w-full" />
          </UFormField>
          <UFormField :required="!member" label="C.P." name="postal_code">
            <UInput v-model="state.postal_code" class="w-full" />
          </UFormField>
          <UFormField :required="!member" label="Ciudad" name="city">
            <UInput v-model="state.city" class="w-full" />
          </UFormField>
          <UFormField :required="!member" label="Estado" name="state">
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

        <UFormField :required="state.role_code !== 'general_manager'" label="Sucursal" name="branch_id">
          <USelect
            v-model="state.branch_id"
            :items="branchItems"
            :disabled="isBranchManager || state.role_code === 'general_manager'"
            placeholder="Seleccionar sucursal..."
            class="w-full"
          />
        </UFormField>

        <UFormField v-if="member" label="Activo" name="is_active">
          <USwitch v-model="state.is_active" aria-label="Activo" />
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
