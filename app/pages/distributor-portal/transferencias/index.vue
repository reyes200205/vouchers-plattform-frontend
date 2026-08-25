<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useCustomers, customerFullName, type Customer } from '~/composables/useCustomers'
import { useCustomerTransfers, CUSTOMER_TRANSFER_STATUS_LABELS, type CustomerTransferRequest, type TransferCandidateDistributor } from '~/composables/useCustomerTransfers'

definePageMeta({
  layout: false
})

const { user } = useAuth()
const { listCustomers } = useCustomers()
const {
  listTransferCandidates,
  requestTransfer,
  listDistributorTransfers,
  respondToTransfer,
  acceptClient,
  cancelTransfer
} = useCustomerTransfers()

const activeTab = ref<'nueva' | 'solicitudes'>('solicitudes')

// --- Nueva transferencia ---
const customerSearch = ref('')
const customersLoading = ref(true)
const customers = ref<Customer[]>([])
const selectedCustomer = ref<Customer | null>(null)

const candidateSearch = ref('')
const candidates = ref<TransferCandidateDistributor[]>([])
const candidatesLoading = ref(false)
const selectedDestination = ref<TransferCandidateDistributor | null>(null)

const requestReason = ref('')
const submitting = ref(false)
const formError = ref<string | null>(null)

function extractErrorMessage(e: unknown, fallback: string): string {
  if (e && typeof e === 'object' && 'data' in e) {
    const data = (e as { data?: { message?: string } }).data
    if (data?.message) return data.message
  }
  return fallback
}

async function loadCustomers() {
  customersLoading.value = true
  try {
    const distributorId = user.value?.distributor?.id
    const result = await listCustomers({
      per_page: 100,
      ...(distributorId ? { distributor_id: distributorId } : {})
    })
    customers.value = result.data
  } catch (e) {
    console.error(e)
  } finally {
    customersLoading.value = false
  }
}

const filteredCustomers = computed(() => {
  if (!customerSearch.value.trim()) return customers.value
  const query = customerSearch.value.toLowerCase()
  return customers.value.filter(c => customerFullName(c.person).toLowerCase().includes(query))
})

async function searchCandidates() {
  candidatesLoading.value = true
  try {
    candidates.value = await listTransferCandidates(candidateSearch.value || undefined)
  } catch (e) {
    console.error(e)
  } finally {
    candidatesLoading.value = false
  }
}

watch(candidateSearch, () => {
  searchCandidates()
})

async function submitTransfer() {
  formError.value = null

  if (!selectedCustomer.value) {
    formError.value = 'Selecciona un cliente.'
    return
  }
  if (!selectedDestination.value) {
    formError.value = 'Selecciona la distribuidora destino.'
    return
  }

  submitting.value = true
  try {
    await requestTransfer(selectedCustomer.value.id, {
      destination_distributor_id: selectedDestination.value.id,
      request_reason: requestReason.value || undefined
    })

    selectedCustomer.value = null
    selectedDestination.value = null
    requestReason.value = ''
    activeTab.value = 'solicitudes'
    await loadTransfers()
  } catch (e) {
    formError.value = extractErrorMessage(e, 'No se pudo enviar la solicitud de transferencia.')
  } finally {
    submitting.value = false
  }
}

// --- Mis solicitudes ---
const outgoing = ref<CustomerTransferRequest[]>([])
const incoming = ref<CustomerTransferRequest[]>([])
const transfersLoading = ref(true)
const actionError = ref<string | null>(null)
const actingId = ref<number | null>(null)

async function loadTransfers() {
  transfersLoading.value = true
  actionError.value = null
  try {
    const [outgoingResult, incomingResult] = await Promise.all([
      listDistributorTransfers({ direction: 'outgoing' }),
      listDistributorTransfers({ direction: 'incoming' })
    ])
    outgoing.value = outgoingResult.data
    incoming.value = incomingResult.data
  } catch (e) {
    console.error(e)
    actionError.value = extractErrorMessage(e, 'No se pudieron cargar tus solicitudes de transferencia.')
  } finally {
    transfersLoading.value = false
  }
}

async function handleRespond(item: CustomerTransferRequest, decision: 'ACCEPT' | 'REJECT') {
  actionError.value = null
  actingId.value = item.id
  try {
    let rejectionReason: string | undefined
    if (decision === 'REJECT') {
      rejectionReason = window.prompt('Motivo del rechazo:') || undefined
      if (!rejectionReason) {
        actingId.value = null
        return
      }
    }
    await respondToTransfer(item.id, { decision, rejection_reason: rejectionReason })
    await loadTransfers()
  } catch (e) {
    actionError.value = extractErrorMessage(e, 'No se pudo procesar la respuesta.')
  } finally {
    actingId.value = null
  }
}

async function handleAcceptClient(item: CustomerTransferRequest) {
  actionError.value = null
  actingId.value = item.id
  try {
    await acceptClient(item.id)
    await loadTransfers()
  } catch (e) {
    actionError.value = extractErrorMessage(e, 'No se pudo aceptar al cliente.')
  } finally {
    actingId.value = null
  }
}

async function handleCancel(item: CustomerTransferRequest) {
  actionError.value = null
  actingId.value = item.id
  try {
    await cancelTransfer(item.id)
    await loadTransfers()
  } catch (e) {
    actionError.value = extractErrorMessage(e, 'No se pudo cancelar la solicitud.')
  } finally {
    actingId.value = null
  }
}

function statusBadgeClass(status: string) {
  if (status === 'EJECUTADA') return 'success'
  if (status.startsWith('RECHAZADA') || status === 'CANCELADA') return 'error'
  return 'pending'
}

// Las etiquetas genéricas de CUSTOMER_TRANSFER_STATUS_LABELS están escritas
// desde la perspectiva de quien inició la solicitud (origen); en la lista de
// "entrantes" quien las lee es la distribuidora destino, así que necesitan
// su propio texto para no sonar como si el sistema estuviera esperando a
// alguien más cuando en realidad la espera es de la propia distribuidora.
const INCOMING_STATUS_LABELS: Record<string, string> = {
  PENDIENTE_DESTINO: 'Pendiente de tu respuesta',
  RECHAZADA_DESTINO: 'Rechazaste esta solicitud',
  PENDIENTE_COORDINADOR: 'Esperando autorización del coordinador',
  RECHAZADA_COORDINADOR: 'Rechazada por el coordinador',
  AUTORIZADA: 'Autorizada — puedes aceptar al cliente',
  EJECUTADA: 'Completada',
  CANCELADA: 'Cancelada por la distribuidora origen'
}

onMounted(() => {
  loadCustomers()
  loadTransfers()
  searchCandidates()
})

const volver = () => {
  navigateTo('/distributor-portal/vales')
}
</script>

<template>
  <main class="contacts-shell">
    <div class="contacts-wrapper">
      <header class="top-navbar">
        <button class="back-btn" @click="volver">
          ←
        </button>
        <h1 class="nav-title">
          Transferencias de cliente
        </h1>
      </header>

      <div class="content-body">
        <div class="tab-switch">
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'solicitudes' }"
            @click="activeTab = 'solicitudes'"
          >
            Mis solicitudes
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'nueva' }"
            @click="activeTab = 'nueva'"
          >
            Nueva transferencia
          </button>
        </div>

        <!-- NUEVA TRANSFERENCIA -->
        <div v-if="activeTab === 'nueva'" class="section">
          <p v-if="formError" class="state-text error">
            {{ formError }}
          </p>

          <div class="field-block">
            <label class="field-label">Cliente</label>
            <div class="search-box">
              <input
                v-model="customerSearch"
                type="text"
                placeholder="Buscar cliente"
                class="search-input"
              >
            </div>
            <p v-if="selectedCustomer" class="selected-pill">
              {{ customerFullName(selectedCustomer.person) }}
              <button class="clear-btn" @click="selectedCustomer = null">
                ✕
              </button>
            </p>
            <div v-else class="pick-list">
              <p v-if="customersLoading" class="state-text">
                Cargando clientes…
              </p>
              <button
                v-for="c in filteredCustomers"
                :key="c.id"
                class="pick-item"
                @click="selectedCustomer = c"
              >
                {{ customerFullName(c.person) }}
              </button>
            </div>
          </div>

          <div class="field-block">
            <label class="field-label">Distribuidora destino</label>
            <div class="search-box">
              <input
                v-model="candidateSearch"
                type="text"
                placeholder="Buscar distribuidora"
                class="search-input"
              >
            </div>
            <p v-if="selectedDestination" class="selected-pill">
              {{ selectedDestination.name || selectedDestination.distributor_number }}
              <button class="clear-btn" @click="selectedDestination = null">
                ✕
              </button>
            </p>
            <div v-else class="pick-list">
              <p v-if="candidatesLoading" class="state-text">
                Buscando…
              </p>
              <button
                v-for="d in candidates"
                :key="d.id"
                class="pick-item"
                @click="selectedDestination = d"
              >
                {{ d.name || d.distributor_number }}
              </button>
            </div>
          </div>

          <div class="field-block">
            <label class="field-label">Motivo (opcional)</label>
            <textarea
              v-model="requestReason"
              class="textarea-input"
              rows="3"
              placeholder="¿Por qué se transfiere el cliente?"
            />
          </div>

          <button class="submit-btn" :disabled="submitting" @click="submitTransfer">
            {{ submitting ? 'Enviando…' : 'Enviar solicitud' }}
          </button>
        </div>

        <!-- MIS SOLICITUDES -->
        <div v-else class="section">
          <p v-if="actionError" class="state-text error">
            {{ actionError }}
          </p>

          <h3 class="section-title">
            Clientes que quieren venir conmigo
          </h3>
          <p v-if="!transfersLoading && incoming.length === 0" class="state-text">
            No tienes solicitudes de transferencia pendientes.
          </p>
          <div v-else class="transfer-list">
            <div v-for="item in incoming" :key="item.id" class="transfer-card">
              <div class="transfer-card-header">
                <span class="transfer-customer">{{ customerFullName(item.customer?.person) }}</span>
                <span class="status-badge" :class="statusBadgeClass(item.status)">
                  {{ INCOMING_STATUS_LABELS[item.status] }}
                </span>
              </div>
              <p class="transfer-meta">
                Origen: {{ item.source_distributor?.distributor_number ?? `#${item.source_distributor_id}` }}
              </p>

              <div v-if="item.status === 'PENDIENTE_DESTINO'" class="transfer-actions">
                <button class="action-btn accept" :disabled="actingId === item.id" @click="handleRespond(item, 'ACCEPT')">
                  Aceptar
                </button>
                <button class="action-btn reject" :disabled="actingId === item.id" @click="handleRespond(item, 'REJECT')">
                  Rechazar
                </button>
              </div>
              <div v-else-if="item.status === 'AUTORIZADA'" class="transfer-actions">
                <button class="action-btn accept" :disabled="actingId === item.id" @click="handleAcceptClient(item)">
                  Aceptar cliente
                </button>
              </div>
            </div>
          </div>

          <h3 class="section-title">
            Clientes que envié a otra distribuidora
          </h3>
          <p v-if="!transfersLoading && outgoing.length === 0" class="state-text">
            No has solicitado transferir clientes.
          </p>
          <div v-else class="transfer-list">
            <div v-for="item in outgoing" :key="item.id" class="transfer-card">
              <div class="transfer-card-header">
                <span class="transfer-customer">{{ customerFullName(item.customer?.person) }}</span>
                <span class="status-badge" :class="statusBadgeClass(item.status)">
                  {{ CUSTOMER_TRANSFER_STATUS_LABELS[item.status] }}
                </span>
              </div>
              <p class="transfer-meta">
                Destino: {{ item.destination_distributor?.distributor_number ?? `#${item.destination_distributor_id}` }}
              </p>
              <p v-if="item.rejection_reason" class="transfer-meta reason">
                Motivo del rechazo: {{ item.rejection_reason }}
              </p>

              <div v-if="['PENDIENTE_DESTINO', 'PENDIENTE_COORDINADOR'].includes(item.status)" class="transfer-actions">
                <button class="action-btn reject" :disabled="actingId === item.id" @click="handleCancel(item)">
                  Cancelar solicitud
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contacts-shell {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.contacts-wrapper {
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-navbar {
  background-color: #002366;
  color: #ffffff;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  margin-right: 16px;
  display: flex;
  align-items: center;
}

.nav-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.content-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tab-switch {
  display: flex;
  background-color: #f1f5f9;
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
}

.tab-btn {
  flex: 1;
  border: none;
  background: none;
  padding: 10px 0;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
}

.tab-btn.active {
  background-color: #ffffff;
  color: #002366;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  margin: 8px 0 0 0;
}

.field-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 13px;
  font-weight: 700;
  color: #334155;
}

.search-box {
  position: relative;
  width: 100%;
}

.search-input,
.textarea-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #94a3b8;
  font-size: 14px;
  color: #1e293b;
  box-sizing: border-box;
  outline: none;
  font-family: inherit;
}

.pick-list {
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
}

.pick-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 14px;
  background: none;
  border: none;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
  color: #1e293b;
  cursor: pointer;
}

.pick-item:last-child {
  border-bottom: none;
}

.pick-item:active {
  background-color: #f8fafc;
}

.selected-pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  color: #1e3a8a;
  margin: 0;
}

.clear-btn {
  background: none;
  border: none;
  color: #1e3a8a;
  font-size: 14px;
  cursor: pointer;
}

.submit-btn {
  background-color: #002366;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.state-text {
  text-align: center;
  color: #64748b;
  font-size: 14px;
  padding: 12px 0;
  margin: 0;
}

.state-text.error {
  color: #dc2626;
}

.transfer-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.transfer-card {
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.transfer-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.transfer-customer {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.transfer-meta {
  font-size: 12px;
  color: #64748b;
  margin: 0;
}

.transfer-meta.reason {
  color: #991b1b;
}

.status-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 999px;
  white-space: nowrap;
  background-color: #fef3c7;
  color: #92400e;
}

.status-badge.success {
  background-color: #dcfce7;
  color: #166534;
}

.status-badge.error {
  background-color: #fee2e2;
  color: #991b1b;
}

.transfer-actions {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.action-btn {
  flex: 1;
  border: none;
  border-radius: 10px;
  padding: 8px 0;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.action-btn.accept {
  background-color: #84cc16;
  color: #ffffff;
}

.action-btn.reject {
  background-color: #fee2e2;
  color: #991b1b;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
