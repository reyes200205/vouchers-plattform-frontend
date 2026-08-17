<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'default'
})

const schema = z.object({
  firstName: z.string().min(2, 'Muy corto'),
  lastName: z.string().min(2, 'Muy corto'),
  username: z.string().min(3, 'Muy corto'),
  password: z.string().min(8, 'Mínimo 8 caracteres')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  firstName: '',
  lastName: '',
  username: '',
  password: ''
})

const { createGeneralManager } = useGeneralManagers()
const toast = useToast()
const submitting = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    await createGeneralManager(event.data)

    toast.add({
      title: 'Gerente general creado',
      description: `El usuario ${event.data.username} fue registrado correctamente`,
      color: 'success'
    })

    state.firstName = ''
    state.lastName = ''
    state.username = ''
    state.password = ''
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudo registrar al gerente general. Verifica los datos e intenta de nuevo.',
      color: 'error'
    })
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="gm-page">
    <UCard class="gm-card">
      <template #header>
        <h1>Registrar Gerente General</h1>
        <p>Crea un nuevo usuario con rol de Gerente General.</p>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Nombre" name="firstName">
          <UInput v-model="state.firstName" class="w-full" />
        </UFormField>
        <UFormField label="Apellido" name="lastName">
          <UInput v-model="state.lastName" class="w-full" />
        </UFormField>
        <UFormField label="Usuario" name="username">
          <UInput v-model="state.username" class="w-full" />
        </UFormField>
        <UFormField label="Contraseña" name="password">
          <UInput v-model="state.password" type="password" class="w-full" />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Volver"
            color="neutral"
            variant="subtle"
            to="/admin"
          />
          <UButton
            label="Registrar"
            color="primary"
            variant="solid"
            type="submit"
            :loading="submitting"
          />
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<style scoped>
.gm-page {
  display: flex;
  justify-content: center;

  padding: 40px 20px;
}

.gm-card {
  width: 100%;
  max-width: 480px;
}

.gm-card h1 {
  margin: 0;
  font-size: 1.25rem;
}

.gm-card p {
  margin: 4px 0 0;
  color: var(--ui-text-muted, #6b7280);
  font-size: 0.875rem;
}
</style>
