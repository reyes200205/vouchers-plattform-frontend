<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Branch } from '~/types'
import type { AvailableManager } from '~/composables/useBranches'

const props = defineProps<{
  branch: Branch | null
}>()

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ updated: [] }>()

const schema = z.object({
  name: z.string().min(2, 'Too short'),
  address: z.string().optional(),
  phone: z.string().optional(),
  manager_user_id: z.any().optional(),
  is_active: z.boolean().optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
  address: '',
  phone: '',
  manager_user_id: undefined,
  is_active: true
})

watch(() => props.branch, (newBranch) => {
  if (newBranch) {
    state.name = newBranch.name
    state.address = newBranch.address || ''
    state.phone = newBranch.phone || ''
    state.manager_user_id = newBranch.manager?.id?.toString() || undefined
    state.is_active = newBranch.is_active
  }
}, { immediate: true })

const { updateBranch, listAvailableManagers } = useBranches()
const toast = useToast()
const submitting = ref(false)

const managers = ref<AvailableManager[]>([])
const managerItems = computed(() => {
  return (managers.value || []).map(m => ({
    label: `${m.name} (${m.username})`,
    value: m.id.toString()
  }))
})

onMounted(async () => {
  try {
    managers.value = await listAvailableManagers()
  } catch (e) {
    console.error('Error fetching available managers:', e)
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!props.branch) return
  submitting.value = true

  try {
    await updateBranch(props.branch.id, {
      name: event.data.name,
      address: event.data.address || undefined,
      phone: event.data.phone || undefined,
      manager_user_id: event.data.manager_user_id ? Number(event.data.manager_user_id) : undefined,
      is_active: event.data.is_active
    })

    toast.add({
      title: 'Sucursal actualizada',
      description: `La sucursal ${event.data.name} fue actualizada correctamente`,
      color: 'success'
    })

    open.value = false
    emit('updated')
  } catch (e) {
    console.error(e)
    toast.add({
      title: 'Error',
      description: 'No se pudo actualizar la sucursal. Verifica los datos e intenta de nuevo.',
      color: 'error'
    })
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <UModal v-model:open="open" title="Editar Sucursal" description="Modifica los datos de la sucursal seleccionada">
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Nombre" name="name">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField label="Dirección" name="address">
          <UInput v-model="state.address" class="w-full" />
        </UFormField>
        <UFormField label="Teléfono" name="phone">
          <UInput v-model="state.phone" class="w-full" />
        </UFormField>
        <UFormField label="Gerente" name="manager_user_id">
          <USelect
            v-model="state.manager_user_id"
            :items="managerItems"
            placeholder="Seleccionar gerente..."
            class="w-full"
          />
        </UFormField>
        <UFormField label="Estado" name="is_active">
          <UCheckbox v-model="state.is_active" label="Activa" />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="open = false"
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
    </template>
  </UModal>
</template>
