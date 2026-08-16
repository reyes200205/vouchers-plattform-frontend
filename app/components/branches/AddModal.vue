<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  name: z.string().min(2, 'Too short'),
  code: z.string().min(2, 'Too short'),
  phone: z.string().min(5, 'Invalid phone number'),
  manager: z.string().min(2, 'Too short'),
  location: z.string().min(2, 'Too short')
})
const open = ref(false)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
  code: '',
  phone: '',
  manager: '',
  location: ''
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Success',
    description: `Nueva sucursal ${event.data.name} agregada`,
    color: 'success'
  })
  open.value = false
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
        <UFormField label="Nombre" placeholder="Sucursal Centro" name="name">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField label="Código" placeholder="SUC-001" name="code">
          <UInput v-model="state.code" class="w-full" />
        </UFormField>
        <UFormField label="Teléfono" placeholder="555-0101" name="phone">
          <UInput v-model="state.phone" class="w-full" />
        </UFormField>
        <UFormField label="Administrador" placeholder="Carlos Pérez" name="manager">
          <UInput v-model="state.manager" class="w-full" />
        </UFormField>
        <UFormField label="Ubicación" placeholder="Ciudad de México, MX" name="location">
          <UInput v-model="state.location" class="w-full" />
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
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
