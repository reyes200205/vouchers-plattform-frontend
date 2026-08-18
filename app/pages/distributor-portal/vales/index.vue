<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCustomers, customerFullName, type Customer } from '~/composables/useCustomers'

definePageMeta({
  layout: false
})

const { user } = useAuth()
const { listCustomers } = useCustomers()

const searchQuery = ref('')
const loading = ref(true)
const errorMessage = ref<string | null>(null)
const customers = ref<Customer[]>([])

const statusLabels: Record<string, string> = {
  EN_VERIFICACION: 'En verificación',
  ACTIVO: 'Activo',
  BLOQUEADO: 'Bloqueado',
  MOROSO: 'Moroso',
  INACTIVO: 'Inactivo'
}

async function loadCustomers() {
  loading.value = true
  errorMessage.value = null

  try {
    const distributorId = user.value?.distributor?.id
    const result = await listCustomers({
      per_page: 100,
      ...(distributorId ? { distributor_id: distributorId } : {})
    })
    customers.value = result.data
  } catch (e) {
    console.error(e)
    errorMessage.value = 'No se pudo cargar la lista de clientes.'
  } finally {
    loading.value = false
  }
}

onMounted(loadCustomers)

const filteredContacts = computed(() => {
  if (!searchQuery.value.trim()) return customers.value
  const query = searchQuery.value.toLowerCase()
  return customers.value.filter((c) => {
    const nombre = customerFullName(c.person).toLowerCase()
    const telefono = c.person?.mobile_phone ?? ''
    return nombre.includes(query) || telefono.includes(query)
  })
})

function isSelectable(customer: Customer) {
  return customer.status === 'ACTIVO' && Boolean(customer.verified_at)
}

const seleccionarContacto = (customer: Customer) => {
  if (!isSelectable(customer)) return

  navigateTo({
    path: '/distributor-portal/configure_vale',
    query: {
      customerId: String(customer.id),
      nombre: customerFullName(customer.person),
      contacto: customer.person?.mobile_phone ?? ''
    }
  })
}

const volver = () => {
  navigateTo('/distributor-portal')
}
</script>

<template>
  <main class="contacts-shell">
    <div class="contacts-wrapper">
      <!-- NAVBAR AZUL -->
      <header class="top-navbar">
        <button class="back-btn" @click="volver">
          ←
        </button>
        <h1 class="nav-title">
          Seleccionar cliente
        </h1>
      </header>

      <!-- CONTENIDO PRINCIPAL -->
      <div class="content-body">
        <!-- BUSCADOR -->
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar cliente"
            class="search-input"
          >
          <span class="search-icon">🔍</span>
        </div>

        <button class="add-contact-btn" @click="navigateTo('/distributor-portal/clientes')">
          <div class="plus-circle">
            +
          </div>
          <span class="add-text">Nuevo cliente</span>
        </button>

        <p v-if="loading" class="state-text">
          Cargando clientes…
        </p>
        <p v-else-if="errorMessage" class="state-text error">
          {{ errorMessage }}
        </p>
        <p v-else-if="filteredContacts.length === 0" class="state-text">
          No tienes clientes registrados todavía.
        </p>

        <!-- LISTA DE CLIENTES -->
        <div v-else class="contacts-list">
          <div
            v-for="item in filteredContacts"
            :key="item.id"
            class="contact-item"
            :class="{ disabled: !isSelectable(item) }"
            @click="seleccionarContacto(item)"
          >
            <div class="avatar-circle">
              <span class="avatar-icon">👤</span>
            </div>
            <div class="contact-info">
              <h3 class="contact-name">
                {{ customerFullName(item.person) }}
              </h3>
              <p class="contact-phone">
                📞 {{ item.person?.mobile_phone || 'Sin teléfono' }}
              </p>
            </div>
            <span
              class="status-badge"
              :class="item.status?.toLowerCase()"
            >{{ statusLabels[item.status ?? ''] ?? item.status }}</span>
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

/* TOP NAVBAR */
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

/* CUERPO DE CONTENIDO */
.content-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* BUSCADOR */
.search-box {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border-radius: 24px;
  border: 1px solid #94a3b8;
  font-size: 15px;
  color: #1e293b;
  box-sizing: border-box;
  outline: none;
}

.search-input::placeholder {
  color: #64748b;
  font-weight: 600;
}

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #64748b;
  pointer-events: none;
}

/* BOTÓN NUEVO CONTACTO */
.add-contact-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  padding: 8px 0;
  cursor: pointer;
  text-align: left;
}

.plus-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #84cc16;
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-text {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
}

.state-text {
  text-align: center;
  color: #64748b;
  font-size: 14px;
  padding: 24px 0;
}

.state-text.error {
  color: #dc2626;
}

/* LISTA Y TARJETAS DE CONTACTO */
.contacts-list {
  display: flex;
  flex-direction: column;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
}

.contact-item.disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.contact-item:not(.disabled):active {
  background-color: #f8fafc;
}

.avatar-circle {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: #002366;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-icon {
  font-size: 22px;
  color: #ffffff;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.contact-name {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.contact-phone {
  margin: 0;
  font-size: 13px;
  color: #475569;
  font-weight: 600;
}

.status-badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 999px;
  white-space: nowrap;
  background-color: #f1f5f9;
  color: #475569;
}

.status-badge.activo {
  background-color: #dcfce7;
  color: #166534;
}

.status-badge.en_verificacion {
  background-color: #fef3c7;
  color: #92400e;
}

.status-badge.bloqueado,
.status-badge.moroso {
  background-color: #fee2e2;
  color: #991b1b;
}

.status-badge.inactivo {
  background-color: #f1f5f9;
  color: #64748b;
}
</style>
