<script setup lang="ts">
import { format } from 'date-fns'
import type { InboxApplication } from '~/types'

defineProps<{
  items: InboxApplication[]
}>()

const emit = defineEmits<{ decided: [] }>()
</script>

<template>
  <div v-if="items.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
    <UIcon name="i-lucide-inbox" class="size-12 text-dimmed" />
    <p class="mt-2 text-sm text-muted">
      No hay solicitudes de distribuidora pendientes
    </p>
  </div>

  <div v-else class="overflow-y-auto divide-y divide-default">
    <div v-for="item in items" :key="item.id" class="px-6 py-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex min-w-0 items-center gap-3">
          <UAvatar :alt="item.applicant_name || 'Solicitante'" size="lg" />

          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <p class="truncate font-semibold text-highlighted">
                {{ item.applicant_name || 'Sin nombre' }}
              </p>
              <UBadge color="warning" variant="subtle" class="capitalize">
                {{ item.initial_category_code }}
              </UBadge>
            </div>

            <div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">
              <span>{{ item.branch_name }}</span>
              <span v-if="item.coordinator_name">Coordinador: {{ item.coordinator_name }}</span>
              <span v-if="item.verifier_name">Verificador: {{ item.verifier_name }}</span>
              <span>{{ format(new Date(item.created_at), 'dd MMM yyyy') }}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="text-right">
            <p class="text-sm font-semibold text-highlighted">
              {{ new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(Number(item.requested_credit_limit || 0)) }}
            </p>
            <div class="flex items-center justify-end gap-1">
              <UBadge
                v-if="item.prevale_approved"
                color="success"
                variant="subtle"
                size="xs"
                label="Prevale OK"
              />
              <UBadge
                v-if="item.house_photos_complete"
                color="success"
                variant="subtle"
                size="xs"
                label="Fotos OK"
              />
              <UBadge
                v-if="item.verification"
                color="info"
                variant="subtle"
                size="xs"
              >
                Verificación: {{ item.verification.result }}
              </UBadge>
            </div>
          </div>

          <InboxDecideApplicationModal :application="item" @decided="emit('decided')" />
        </div>
      </div>
    </div>
  </div>
</template>
