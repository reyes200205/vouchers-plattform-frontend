<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Branch, DistributorCategory } from '~/types'

const toast = useToast()
const { user } = useAuth()
const { listBranchCategories, createCategory, updateCategory, moveCategory } = useCategories()
const { listBranches } = useBranches()

const canManage = computed(() => user.value?.permissions?.includes('categories.manage') ?? false)
const isGeneralManager = computed(() => user.value?.permissions?.includes('branches.manage') ?? false)

const branchManagerBranchId = computed(() => {
  return user.value?.roles?.find(r => r.code === 'branch_manager' && r.branch_id !== null)?.branch_id ?? null
})

const { data: branches } = await useAsyncData<Branch[]>('categories-branches', () => listBranches(), { default: () => [] })

const selectedBranchId = ref<number | undefined>(branchManagerBranchId.value ?? branches.value[0]?.id ?? undefined)

watch([branchManagerBranchId, branches], () => {
  if (!selectedBranchId.value && branchManagerBranchId.value) {
    selectedBranchId.value = branchManagerBranchId.value
  }
  if (!selectedBranchId.value && !branchManagerBranchId.value && branches.value[0]) {
    selectedBranchId.value = branches.value[0].id
  }
}, { immediate: true })

const { data: categories, status, refresh } = await useAsyncData(
  'branch-categories',
  () => {
    if (!selectedBranchId.value) {
      return Promise.resolve({ data: [], meta: { current_page: 1, last_page: 1, per_page: 50, total: 0 } })
    }
    return listBranchCategories(selectedBranchId.value)
  },
  {
    watch: [selectedBranchId],
    default: () => ({ data: [], meta: { current_page: 1, last_page: 1, per_page: 50, total: 0 } })
  }
)

const schema = z.object({
  code: z.string().min(2, 'Muy corto').max(30, 'Muy largo'),
  name: z.string().min(2, 'Muy corto').max(100, 'Muy largo'),
  commission_percentage: z.coerce.number().min(0, 'Mínimo 0').max(100, 'Máximo 100'),
  is_active: z.boolean()
})

type Schema = z.output<typeof schema>

interface CategoryFormState {
  code: string
  name: string
  commission_percentage: string
  is_active: boolean
}

const state = reactive<CategoryFormState>({
  code: '',
  name: '',
  commission_percentage: '',
  is_active: true
})

const isEditOpen = ref(false)
const selectedCategory = ref<DistributorCategory | null>(null)

const isMoveOpen = ref(false)
const moveTarget = ref<number | undefined>(undefined)
const moving = ref(false)
const categoryToMove = ref<DistributorCategory | null>(null)

function openMove(category: DistributorCategory) {
  categoryToMove.value = category
  moveTarget.value = branches.value.find(b => b.id !== selectedBranchId.value)?.id
  isMoveOpen.value = true
}

async function confirmMove() {
  if (!categoryToMove.value || !moveTarget.value) return
  moving.value = true

  try {
    await moveCategory(categoryToMove.value.id, moveTarget.value)
    toast.add({
      title: 'Categoría movida',
      description: `${categoryToMove.value.name} fue movida a otra sucursal`,
      color: 'success'
    })
    isMoveOpen.value = false
    await refresh()
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudo mover la categoría. Verifica que no exista otra con el mismo código o nombre.',
      color: 'error'
    })
  } finally {
    moving.value = false
  }
}

function openCreate() {
  selectedCategory.value = null
  state.code = ''
  state.name = ''
  state.commission_percentage = ''
  state.is_active = true
  isEditOpen.value = true
}

function openEdit(category: DistributorCategory) {
  selectedCategory.value = category
  state.code = category.code
  state.name = category.name
  state.commission_percentage = String(Number(category.commission_percentage))
  state.is_active = category.is_active
  isEditOpen.value = true
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!selectedBranchId.value) return

  try {
    const payload = {
      code: event.data.code,
      name: event.data.name,
      commission_percentage: event.data.commission_percentage.toFixed(4),
      is_active: event.data.is_active
    }

    if (selectedCategory.value) {
      await updateCategory(selectedBranchId.value, selectedCategory.value.id, payload)
      toast.add({
        title: 'Categoría actualizada',
        description: `${event.data.name} fue actualizada correctamente`,
        color: 'success'
      })
    } else {
      await createCategory(selectedBranchId.value, payload)
      toast.add({
        title: 'Categoría creada',
        description: `${event.data.name} fue creada correctamente`,
        color: 'success'
      })
    }

    isEditOpen.value = false
    await refresh()
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudo guardar la categoría. Verifica que el código y nombre no existan en la sucursal.',
      color: 'error'
    })
  }
}
</script>

<template>
  <UDashboardPanel id="categories">
    <template #header>
      <UDashboardNavbar title="Categorías de distribuidora">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <USelect
            v-if="isGeneralManager"
            v-model="selectedBranchId"
            :items="branches.map(b => ({ label: b.name, value: b.id as number }))"
            placeholder="Sucursal..."
            class="w-64"
          />
          <UButton
            v-if="canManage"
            label="Nueva categoría"
            icon="i-lucide-plus"
            color="primary"
            variant="solid"
            @click="openCreate()"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="status === 'pending'" class="flex items-center justify-center py-16">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
      </div>

      <div v-else class="flex h-full flex-col overflow-y-auto">
        <div v-if="categories.data.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
          <UIcon name="i-lucide-layers" class="size-12 text-dimmed" />
          <p class="mt-2 text-sm text-muted">
            No hay categorías para esta sucursal
          </p>
          <p v-if="canManage" class="text-sm text-dimmed">
            Crea la primera con el botón "Nueva categoría"
          </p>
        </div>

        <div v-else class="divide-y divide-default">
          <div v-for="category in categories.data" :key="category.id" class="flex items-center justify-between gap-3 px-6 py-4">
            <div class="flex min-w-0 items-center gap-3">
              <div class="flex size-10 items-center justify-center rounded-md bg-elevated">
                <UIcon name="i-lucide-medal" class="size-5 text-highlighted" />
              </div>

              <div class="min-w-0">
                <p class="truncate font-semibold text-highlighted">
                  {{ category.name }}
                </p>
                <p class="text-xs text-muted">
                  {{ category.code }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 text-sm">
              <span class="text-muted">
                Comisión
                <span class="font-semibold text-highlighted">{{ Number(category.commission_percentage) }}%</span>
              </span>
              <UBadge
                v-if="category.is_active"
                color="success"
                variant="subtle"
                label="Activa"
              />
              <UBadge
                v-else
                color="error"
                variant="subtle"
                label="Inactiva"
              />

              <UButton
                v-if="canManage"
                icon="i-lucide-pencil"
                color="neutral"
                variant="ghost"
                aria-label="Editar"
                @click="openEdit(category)"
              />
              <UButton
                v-if="isGeneralManager"
                icon="i-lucide-move"
                color="neutral"
                variant="ghost"
                aria-label="Mover a otra sucursal"
                @click="openMove(category)"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>

  <UModal
    v-model:open="isEditOpen"
    :title="selectedCategory ? 'Editar categoría' : 'Nueva categoría'"
    :description="selectedCategory ? `Actualizar ${selectedCategory.name}` : 'Define la comisión de la categoría'"
    :ui="{ content: 'max-w-lg' }"
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="grid grid-cols-2 gap-4">
          <UFormField required label="Código" name="code">
            <UInput
              v-model="state.code"
              class="w-full"
              uppercase
              placeholder="Ej. COBRE"
            />
          </UFormField>

          <UFormField required label="Nombre" name="name">
            <UInput v-model="state.name" class="w-full" placeholder="Ej. Cobre" />
          </UFormField>
        </div>

        <UFormField
          required
          label="Comisión distribuidora (%)"
          name="commission_percentage"
          description="Utilidad de la distribuidora por quincena sobre el principal del vale."
        >
          <UInput
            v-model="state.commission_percentage"
            type="number"
            min="0"
            max="100"
            step="0.01"
            class="w-full"
          />
        </UFormField>

        <UFormField v-if="selectedCategory" label="Activa" name="is_active">
          <USwitch v-model="state.is_active" aria-label="Activa" />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="isEditOpen = false"
          />
          <UButton
            :label="selectedCategory ? 'Guardar' : 'Crear'"
            color="primary"
            variant="solid"
            type="submit"
          />
        </div>
      </UForm>
    </template>
  </UModal>

  <UModal
    v-model:open="isMoveOpen"
    title="Mover categoría a otra sucursal"
    :description="categoryToMove ? `La categoría ${categoryToMove.name} (${categoryToMove.code}) se moverá a la sucursal seleccionada. Las distribuidoras de la sucursal anterior conservarán la referencia.` : ''"
    :ui="{ content: 'max-w-md' }"
  >
    <template #body>
      <div class="space-y-4">
        <UFormField label="Sucursal destino" required>
          <USelect
            v-model="moveTarget"
            :items="branches
              .filter(b => b.id !== selectedBranchId)
              .map(b => ({ label: b.name, value: b.id as number }))"
            placeholder="Seleccionar sucursal..."
            class="w-full"
          />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="isMoveOpen = false"
          />
          <UButton
            label="Mover"
            color="primary"
            variant="solid"
            :loading="moving"
            :disabled="!moveTarget"
            @click="confirmMove()"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
