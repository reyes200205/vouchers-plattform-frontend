<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { AvailableManager } from '~/composables/useBranches'

const emit = defineEmits<{ created: [] }>()

const schema = z.object({
  name: z.string().min(2, 'Too short'),
  address: z.string().optional(),
  phone: z.string().optional(),
  manager_user_id: z.any().optional()
})
const open = ref(false)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
  address: '',
  phone: '',
  manager_user_id: undefined
})

const { createBranch, listAvailableManagers } = useBranches()
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
  submitting.value = true

  try {
    await createBranch({
      name: event.data.name,
      address: event.data.address || undefined,
      phone: event.data.phone || undefined,
      manager_user_id: event.data.manager_user_id ? Number(event.data.manager_user_id) : undefined
    })

    toast.add({
      title: 'Sucursal creada',
      description: `La sucursal ${event.data.name} fue creada correctamente`,
      color: 'success'
    })

    state.name = ''
    state.address = ''
    state.phone = ''
    state.manager_user_id = undefined
    open.value = false
    emit('created')
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudo crear la sucursal. Verifica los datos e intenta de nuevo.',
      color: 'error'
    })
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <UModal v-model:open="open" title="Nueva Sucursal" description="Agrega una nueva sucursal a la base de datos" :ui="{ content: 'max-w-xl' }">
    <UButton label="Nueva sucursal" icon="i-lucide-plus" />

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Nombre" placeholder="Sucursal Centro" name="name">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField label="Dirección" placeholder="Calle 123, Ciudad" name="address">
          <UInput v-model="state.address" class="w-full" />
        </UFormField>
        <UFormField label="Teléfono" placeholder="555-0101" name="phone">
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

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            label="Crear"
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
