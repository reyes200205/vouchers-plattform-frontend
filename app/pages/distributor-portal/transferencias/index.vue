<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useCustomers, customerFullName, type Customer } from '~/composables/useCustomers'
import { useCustomerTransfers, CUSTOMER_TRANSFER_STATUS_LABELS, type CustomerTransferRequest, type TransferCandidateDistributor } from '~/composables/useCustomerTransfers'
import type { PaginatedData } from '~/types'

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
const TRANSFERS_PER_PAGE = 5

const transferFilter = ref<'incoming' | 'outgoing'>('incoming')

const emptyTransfersPage: PaginatedData<CustomerTransferRequest> = {
  data: [],
  links: [],
  meta: { current_page: 1, last_page: 1, per_page: TRANSFERS_PER_PAGE, total: 0 }
}

const incomingPage = ref(1)
const outgoingPage = ref(1)
const incomingData = ref<PaginatedData<CustomerTransferRequest>>(emptyTransfersPage)
const outgoingData = ref<PaginatedData<CustomerTransferRequest>>(emptyTransfersPage)

const incoming = computed(() => incomingData.value.data)
const outgoing = computed(() => outgoingData.value.data)

const transfersLoading = ref(true)
const actionError = ref<string | null>(null)
const actingId = ref<number | null>(null)

async function loadTransfers() {
  transfersLoading.value = true
  actionError.value = null
  try {
    const [outgoingResult, incomingResult] = await Promise.all([
      listDistributorTransfers({ direction: 'outgoing', page: outgoingPage.value, per_page: TRANSFERS_PER_PAGE }),
      listDistributorTransfers({ direction: 'incoming', page: incomingPage.value, per_page: TRANSFERS_PER_PAGE })
    ])
    outgoingData.value = outgoingResult
    incomingData.value = incomingResult
  } catch (e) {
    console.error(e)
    actionError.value = extractErrorMessage(e, 'No se pudieron cargar tus solicitudes de transferencia.')
  } finally {
    transfersLoading.value = false
  }
}

watch(incomingPage, () => loadTransfers())
watch(outgoingPage, () => loadTransfers())

// --- Modal de rechazo ---
const rejectModalOpen = ref(false)
const rejectingItem = ref<CustomerTransferRequest | null>(null)
const rejectReason = ref('')
const rejectSubmitting = ref(false)

function openRejectModal(item: CustomerTransferRequest) {
  rejectingItem.value = item
  rejectReason.value = ''
  rejectModalOpen.value = true
}

function closeRejectModal() {
  rejectModalOpen.value = false
  rejectingItem.value = null
  rejectReason.value = ''
}

async function confirmReject() {
  if (!rejectingItem.value || !rejectReason.value.trim()) return

  const item = rejectingItem.value
  rejectSubmitting.value = true
  actionError.value = null

  try {
    await respondToTransfer(item.id, { decision: 'REJECT', rejection_reason: rejectReason.value.trim() })
    closeRejectModal()
    await loadTransfers()
  } catch (e) {
    actionError.value = extractErrorMessage(e, 'No se pudo procesar el rechazo.')
  } finally {
    rejectSubmitting.value = false
  }
}

async function handleAccept(item: CustomerTransferRequest) {
  actionError.value = null
  actingId.value = item.id
  try {
    await respondToTransfer(item.id, { decision: 'ACCEPT' })
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
              <span class="search-icon">🔍</span>
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
              <span class="search-icon">🔍</span>
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

          <div class="filter-switch">
            <button
              class="filter-btn"
              :class="{ active: transferFilter === 'incoming' }"
              @click="transferFilter = 'incoming'"
            >
              Clientes que quieren venir conmigo
              <span v-if="incomingData.meta.total" class="filter-count">{{ incomingData.meta.total }}</span>
            </button>
            <button
              class="filter-btn"
              :class="{ active: transferFilter === 'outgoing' }"
              @click="transferFilter = 'outgoing'"
            >
              Clientes que envié a otra distribuidora
              <span v-if="outgoingData.meta.total" class="filter-count">{{ outgoingData.meta.total }}</span>
            </button>
          </div>

          <!-- ENTRANTES -->
          <template v-if="transferFilter === 'incoming'">
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
                  <button class="action-btn accept" :disabled="actingId === item.id" @click="handleAccept(item)">
                    Aceptar
                  </button>
                  <button class="action-btn reject" :disabled="actingId === item.id" @click="openRejectModal(item)">
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

            <div v-if="incomingData.meta.last_page > 1" class="paginator">
              <button
                class="page-btn"
                :disabled="incomingPage <= 1"
                @click="incomingPage--"
              >
                ← Anterior
              </button>
              <span class="page-label">Página {{ incomingData.meta.current_page }} de {{ incomingData.meta.last_page }}</span>
              <button
                class="page-btn"
                :disabled="incomingPage >= incomingData.meta.last_page"
                @click="incomingPage++"
              >
                Siguiente →
              </button>
            </div>
          </template>

          <!-- SALIENTES -->
          <template v-else>
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

            <div v-if="outgoingData.meta.last_page > 1" class="paginator">
              <button
                class="page-btn"
                :disabled="outgoingPage <= 1"
                @click="outgoingPage--"
              >
                ← Anterior
              </button>
              <span class="page-label">Página {{ outgoingData.meta.current_page }} de {{ outgoingData.meta.last_page }}</span>
              <button
                class="page-btn"
                :disabled="outgoingPage >= outgoingData.meta.last_page"
                @click="outgoingPage++"
              >
                Siguiente →
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- MODAL DE RECHAZO -->
    <Transition name="modal-fade">
      <div v-if="rejectModalOpen" class="modal-backdrop" @click.self="closeRejectModal">
        <div class="modal-card">
          <div class="modal-header">
            <h2 class="modal-title">
              Rechazar transferencia
            </h2>
            <button class="modal-close" @click="closeRejectModal">
              ✕
            </button>
          </div>

          <p class="modal-subtitle">
            Cuéntale a la distribuidora origen por qué rechazas a
            <strong>{{ customerFullName(rejectingItem?.customer?.person) }}</strong>.
          </p>

          <label class="field-label">Motivo del rechazo</label>
          <textarea
            v-model="rejectReason"
            class="textarea-input"
            rows="4"
            placeholder="Escribe el motivo…"
            autofocus
          />

          <div class="modal-actions">
            <button class="modal-btn ghost" :disabled="rejectSubmitting" @click="closeRejectModal">
              Cancelar
            </button>
            <button
              class="modal-btn danger"
              :disabled="rejectSubmitting || !rejectReason.trim()"
              @click="confirmReject"
            >
              {{ rejectSubmitting ? 'Rechazando…' : 'Rechazar solicitud' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
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
  background-color: #f1f5f9;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.contacts-wrapper {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f1f5f9;
}

/* TOP NAVBAR */
.top-navbar {
  background: linear-gradient(135deg, #0a2472 0%, #001845 100%);
  color: #ffffff;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  position: sticky;
  top: 0;
  z-index: 10;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 10px 24px -12px rgba(0, 24, 69, 0.5);
}

.back-btn {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-title {
  font-size: clamp(16px, 4.6vw, 19px);
  font-weight: 800;
  margin: 0;
}

/* CUERPO DE CONTENIDO */
.content-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tab-switch {
  display: flex;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 4px;
  gap: 4px;
  box-shadow: 0 1px 3px rgba(2, 6, 23, 0.04);
}

.tab-btn {
  flex: 1;
  border: none;
  background: none;
  padding: 10px 0;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
}

.tab-btn.active {
  background: linear-gradient(135deg, #0a2472 0%, #1d4ed8 100%);
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(10, 36, 114, 0.25);
}

.section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: 800;
  color: #0a2472;
  margin: 8px 0 0 0;
}

/* FILTRO ENTRANTES / SALIENTES */
.filter-switch {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  text-align: left;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  border-radius: 14px;
  padding: 12px 14px;
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(2, 6, 23, 0.04);
}

.filter-btn.active {
  background: linear-gradient(135deg, #0a2472 0%, #1d4ed8 100%);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(10, 36, 114, 0.25);
}

.filter-count {
  flex-shrink: 0;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.25);
  color: inherit;
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-btn:not(.active) .filter-count {
  background-color: #eef2ff;
  color: #0a2472;
}

/* PAGINADOR */
.paginator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 4px;
}

.page-btn {
  flex-shrink: 0;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 700;
  color: #0a2472;
  cursor: pointer;
  white-space: nowrap;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-label {
  flex: 1;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
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
  padding: 13px 18px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  font-size: 14px;
  color: #1e293b;
  box-sizing: border-box;
  outline: none;
  font-family: inherit;
  box-shadow: 0 1px 3px rgba(2, 6, 23, 0.04);
  transition: border-color 0.15s ease;
}

.search-input {
  padding-right: 44px;
}

.search-input:focus,
.textarea-input:focus {
  border-color: #1d4ed8;
}

.search-input::placeholder,
.textarea-input::placeholder {
  color: #94a3b8;
  font-weight: 600;
}

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #64748b;
  pointer-events: none;
}

.pick-list {
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background-color: #ffffff;
}

.pick-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  background: none;
  border: none;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
  font-weight: 600;
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
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 1px solid #bfdbfe;
  border-radius: 16px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 700;
  color: #0a2472;
  margin: 0;
}

.clear-btn {
  background: none;
  border: none;
  color: #0a2472;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
}

.submit-btn {
  background: linear-gradient(135deg, #0a2472 0%, #001845 100%);
  color: #ffffff;
  border: none;
  border-radius: 16px;
  padding: 15px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 10px 20px -10px rgba(0, 24, 69, 0.5);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
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
  font-weight: 600;
}

.transfer-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.transfer-card {
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(2, 6, 23, 0.04);
}

.transfer-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.transfer-customer {
  font-size: 14px;
  font-weight: 800;
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
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 800;
  padding: 5px 10px;
  border-radius: 999px;
  white-space: nowrap;
  background-color: #fef3c7;
  color: #92400e;
  letter-spacing: 0.2px;
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
  border-radius: 12px;
  padding: 10px 0;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
}

.action-btn.accept {
  background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%);
  color: #052e16;
  box-shadow: 0 4px 10px rgba(132, 204, 22, 0.3);
}

.action-btn.reject {
  background-color: #fee2e2;
  color: #991b1b;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

/* MODAL DE RECHAZO */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(10, 15, 30, 0.55);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 100;
}

.modal-card {
  width: 100%;
  max-width: 380px;
  background-color: #ffffff;
  border-radius: 22px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 24px 48px -12px rgba(0, 24, 69, 0.4);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.modal-title {
  font-size: 17px;
  font-weight: 800;
  color: #0a2472;
  margin: 0;
}

.modal-close {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border: none;
  border-radius: 9px;
  background-color: #f1f5f9;
  color: #64748b;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-subtitle {
  font-size: 13px;
  color: #475569;
  margin: -4px 0 0 0;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}

.modal-btn {
  flex: 1;
  border: none;
  border-radius: 14px;
  padding: 13px 0;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
}

.modal-btn.ghost {
  background-color: #f1f5f9;
  color: #334155;
}

.modal-btn.danger {
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  color: #ffffff;
  box-shadow: 0 10px 20px -10px rgba(185, 28, 28, 0.5);
}

.modal-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.15s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 360px) {
  .top-navbar {
    padding: 14px 14px;
  }

  .content-body {
    padding: 12px;
    gap: 12px;
  }
}
</style>
