<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const emit = defineEmits<{ created: [] }>()

const schema = z.object({
  code: z.string().min(2, 'Too short'),
  name: z.string().min(2, 'Too short'),
  address: z.string().optional(),
  phone: z.string().optional()
})
const open = ref(false)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  code: '',
  name: '',
  address: '',
  phone: ''
})

const { createBranch } = useBranches()
const toast = useToast()
const submitting = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    await createBranch({
      code: event.data.code,
      name: event.data.name,
      address: event.data.address || undefined,
      phone: event.data.phone || undefined
    })

    toast.add({
      title: 'Sucursal creada',
      description: `La sucursal ${event.data.name} fue creada correctamente`,
      color: 'success'
    })

    state.code = ''
    state.name = ''
    state.address = ''
    state.phone = ''
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
  <UModal v-model:open="open" title="Nueva Sucursal" description="Agrega una nueva sucursal a la base de datos">
    <UButton label="Nueva sucursal" icon="i-lucide-plus" />

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Código" placeholder="SUC-001" name="code">
          <UInput v-model="state.code" class="w-full" />
        </UFormField>
        <UFormField label="Nombre" placeholder="Sucursal Centro" name="name">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField label="Dirección" placeholder="Calle 123, Ciudad" name="address">
          <UInput v-model="state.address" class="w-full" />
        </UFormField>
        <UFormField label="Teléfono" placeholder="555-0101" name="phone">
          <UInput v-model="state.phone" class="w-full" />
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
