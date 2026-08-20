<script setup lang="ts">
import ProductModal from '~/components/products/ProductModal.vue'
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Branch, BranchSettings, DistributorCategory, FinancialProduct, InsuranceTier } from '~/types'

const toast = useToast()
const { listBranchProducts, updateProduct } = useProducts()
const { listBranchCategories } = useCategories()
const { getBranchSettings } = useSettings()
const { listBranches } = useBranches()
const { user } = useAuth()

const canManage = computed(() => user.value?.permissions?.includes('products.manage') ?? false)
const isGeneralManager = computed(() => user.value?.permissions?.includes('categories.manage') ?? false)

const branchManagerBranchId = computed(() => {
  return user.value?.roles?.find(r => r.code === 'branch_manager' && r.branch_id !== null)?.branch_id ?? null
})

const { data: branches } = await useAsyncData<Branch[]>('product-branches', () => listBranches(), { default: () => [] })

const selectedBranchId = ref<number | undefined>(branchManagerBranchId.value ?? branches.value[0]?.id ?? undefined)

watch([branchManagerBranchId, branches], () => {
  if (!selectedBranchId.value && branchManagerBranchId.value) {
    selectedBranchId.value = branchManagerBranchId.value
  }
  if (!selectedBranchId.value && !branchManagerBranchId.value && branches.value[0]) {
    selectedBranchId.value = branches.value[0].id
  }
}, { immediate: true })

const branchId = computed(() => selectedBranchId.value)

const { data: categories } = await useAsyncData<DistributorCategory[]>(
  'branch-product-categories',
  () => {
    if (!branchId.value) return Promise.resolve([])
    return listBranchCategories(branchId.value).then(result => result.data)
  },
  { watch: [branchId], default: () => [] }
)

const { data: branchSettings } = await useAsyncData<BranchSettings | null>(
  'product-branch-settings',
  async () => {
    if (!branchId.value) return null
    try {
      return await getBranchSettings(branchId.value)
    } catch {
      return null
    }
  },
  { watch: [branchId], default: () => null }
)

const insuranceTiers = computed<InsuranceTier[] | null>(() => branchSettings.value?.insurance_rates ?? null)
const pointValueMxn = computed(() => branchSettings.value?.point_value_mxn ?? undefined)
const defaultInterestPercentage = computed(() => branchSettings.value?.biweekly_interest_percentage ?? undefined)
const defaultLateFeeAmount = computed(() => branchSettings.value?.late_payment_penalty_amount ?? undefined)
const defaultCommissionPercentage = computed(() => branchSettings.value?.opening_commission_percentage ?? undefined)

const q = ref('')
const page = ref(1)

const { data: productsData, status, refresh } = await useAsyncData(
  'branch-products',
  () => {
    if (!branchId.value) {
      return Promise.resolve({ data: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } })
    }
    return listBranchProducts(branchId.value, { page: page.value })
  },
  {
    watch: [page, branchId],
    default: () => ({ data: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } })
  }
)

const items = computed(() => productsData.value.data ?? [])
const meta = computed(() => productsData.value.meta)

const filteredItems = computed(() => {
  if (!q.value) return items.value
  const needle = q.value.toLowerCase()
  return items.value.filter((product) => {
    return product.name.toLowerCase().includes(needle) || product.code.toLowerCase().includes(needle)
  })
})

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

function categoryName(product: FinancialProduct) {
  return product.category?.name ?? categories.value.find(c => c.id === product.category_id)?.name ?? 'Sin categoría'
}

const isEditOpen = ref(false)
const selectedProduct = ref<FinancialProduct | null>(null)
const cloneTemplate = ref<FinancialProduct | null>(null)

function openCreate() {
  if (!branchId.value) {
    toast.add({
      title: 'Selecciona una sucursal',
      description: 'Elige la sucursal antes de crear un nuevo vale.',
      color: 'warning'
    })
    return
  }

  selectedProduct.value = null
  cloneTemplate.value = null
  isEditOpen.value = true
}

function openClone(product: FinancialProduct) {
  selectedProduct.value = null
  cloneTemplate.value = product
  isEditOpen.value = true
}

function getProductItems(product: FinancialProduct) {
  const items: DropdownMenuItem[] = [
    {
      type: 'label',
      label: 'Acciones'
    }
  ]

  if (product.origin === 'global') {
    items.push({
      label: 'Usar en esta sucursal',
      icon: 'i-lucide-copy',
      onSelect() {
        openClone(product)
      }
    })
  } else if (canManage.value) {
    items.push({
      label: 'Editar',
      icon: 'i-lucide-pencil',
      onSelect() {
        selectedProduct.value = product
        isEditOpen.value = true
      }
    })
  }

  items.push(
    {
      type: 'separator'
    },
    {
      label: product.is_active ? 'Desactivar' : 'Activar',
      icon: product.is_active ? 'i-lucide-circle-slash' : 'i-lucide-circle-check',
      onSelect: async () => {
        if (!branchId.value || product.origin === 'global') return
        try {
          await updateProduct(branchId.value, product.id, { is_active: !product.is_active })
          toast.add({
            title: 'Vale actualizado',
            description: `${product.name} fue ${product.is_active ? 'desactivado' : 'activado'} correctamente`,
            color: 'success'
          })
          await refresh()
        } catch {
          toast.add({ title: 'Error', description: 'No se pudo actualizar el vale.', color: 'error' })
        }
      }
    }
  )

  return items
}
</script>

<template>
  <UDashboardPanel id="products">
    <template #header>
      <UDashboardNavbar title="Productos y Vales">
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
          <UInput
            v-model="q"
            placeholder="Buscar vale..."
            icon="i-lucide-search"
            class="w-56"
          />
          <UButton
            v-if="canManage"
            label="Nuevo vale"
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

      <div v-else-if="status === 'error'" class="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <UIcon name="i-lucide-triangle-alert" class="size-12 text-error" />
        <p class="text-sm text-muted">
          No se pudieron cargar los vales.
        </p>
        <UButton
          label="Reintentar"
          icon="i-lucide-refresh-cw"
          color="primary"
          variant="solid"
          @click="refresh()"
        />
      </div>

      <div v-else class="flex h-full flex-col overflow-y-auto">
        <div v-if="filteredItems.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
          <UIcon name="i-lucide-receipt" class="size-12 text-dimmed" />
          <p class="mt-2 text-sm text-muted">
            No hay vales registrados
          </p>
          <p v-if="canManage" class="text-sm text-dimmed">
            Crea el primer vale con el botón "Nuevo vale"
          </p>
        </div>

        <div v-else class="divide-y divide-default">
          <div v-for="product in filteredItems" :key="product.id" class="flex items-center justify-between gap-3 px-6 py-4">
            <div class="flex min-w-0 items-center gap-3">
              <div class="flex size-10 items-center justify-center rounded-md bg-elevated">
                <UIcon name="i-lucide-ticket" class="size-5 text-highlighted" />
              </div>

              <div class="min-w-0">
                <p class="truncate font-semibold text-highlighted">
                  {{ product.name }}
                </p>
                <p class="text-xs text-muted">
                  {{ product.code }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <UBadge
                variant="subtle"
                :label="categoryName(product)"
              />
              <UBadge
                v-if="product.origin === 'global'"
                color="info"
                variant="subtle"
                label="Catálogo general"
              />
              <span class="font-semibold text-highlighted">
                {{ money.format(Number(product.principal_amount)) }}
              </span>
              <span class="text-sm text-muted">
                {{ product.number_of_fortnights }} quincenas
              </span>
              <span class="text-sm text-muted">
                Comisión: {{ Number(product.company_commission_percentage) }}%
              </span>
              <span class="text-sm text-muted">
                Seguro: {{ money.format(Number(product.insurance_amount)) }}
              </span>
              <span class="text-sm text-muted">
                Interés: {{ Number(product.fortnightly_interest_percentage) }}%
              </span>
              <span class="text-sm text-muted">
                Multa: {{ money.format(Number(product.late_fee_amount)) }}
              </span>
              <UBadge
                v-if="product.is_active"
                color="success"
                variant="subtle"
                label="Activo"
              />
              <UBadge
                v-else
                color="error"
                variant="subtle"
                label="Inactivo"
              />

              <UDropdownMenu
                v-if="canManage || product.origin === 'global'"
                :items="getProductItems(product)"
              >
                <UButton
                  icon="i-lucide-ellipsis-vertical"
                  color="neutral"
                  variant="ghost"
                  aria-label="Acciones"
                />
              </UDropdownMenu>
            </div>
          </div>
        </div>

        <div v-if="meta.last_page > 1" class="flex justify-end px-6 py-3 mt-auto">
          <UPagination
            v-model:page="page"
            :total="meta.total"
            :items-per-page="meta.per_page"
          />
        </div>
      </div>
    </template>
  </UDashboardPanel>

  <ProductModal
    v-model:open="isEditOpen"
    :product="selectedProduct"
    :clone-template="cloneTemplate"
    :categories="categories"
    :branch-id="branchId"
    :insurance-tiers="insuranceTiers"
    :point-value-mxn="pointValueMxn"
    :default-interest-percentage="defaultInterestPercentage"
    :default-late-fee-amount="defaultLateFeeAmount"
    :default-commission-percentage="defaultCommissionPercentage"
    @created="refresh()"
    @updated="refresh()"
  />
</template>