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

const seleccionarContacto = (customer: Customer) => {
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

        <button class="add-contact-btn" @click="navigateTo('/distributor-portal/transferencias')">
          <div class="plus-circle transfer">
            🔁
          </div>
          <span class="add-text">Transferencias de cliente</span>
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
  background-color: #f1f5f9;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.contacts-wrapper {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  min-height: 100dvh;
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
  padding: 16px 16px calc(20px + env(safe-area-inset-bottom)) 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
}

/* BUSCADOR */
.search-box {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 13px 44px 13px 18px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  font-size: 15px;
  color: #1e293b;
  box-sizing: border-box;
  outline: none;
  box-shadow: 0 1px 3px rgba(2, 6, 23, 0.04);
  transition: border-color 0.15s ease;
}

.search-input:focus {
  border-color: #1d4ed8;
}

.search-input::placeholder {
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

/* BOTÓN NUEVO CONTACTO */
.add-contact-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #ffffff;
  border: 1px dashed #cbd5e1;
  border-radius: 16px;
  padding: 12px 14px;
  cursor: pointer;
  text-align: left;
}

.add-contact-btn:active {
  background-color: #f8fafc;
}

.plus-circle {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%);
  color: #052e16;
  font-size: 22px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(132, 204, 22, 0.35);
}

.plus-circle.transfer {
  background-color: #0284c7;
  font-size: 18px;
}

.add-text {
  font-size: 15px;
  font-weight: 700;
  color: #0a2472;
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
  gap: 10px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(2, 6, 23, 0.04);
  cursor: pointer;
  transition: transform 0.12s ease;
}

.contact-item.disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.contact-item:not(.disabled):active {
  transform: scale(0.99);
  background-color: #f8fafc;
}

.avatar-circle {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: linear-gradient(135deg, #0a2472 0%, #1d4ed8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-icon {
  font-size: 20px;
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
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact-phone {
  margin: 0;
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
}

.status-badge {
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 999px;
  white-space: nowrap;
  background-color: #f1f5f9;
  color: #475569;
  letter-spacing: 0.2px;
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
