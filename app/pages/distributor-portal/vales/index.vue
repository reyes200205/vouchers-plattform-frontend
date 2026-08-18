<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: false
})

interface Contact {
  id: string
  nombre: string
  telefono: string
}

const searchQuery = ref('')

const contacts = ref<Contact[]>([
  { id: '1', nombre: 'Adriana Gonzalez Ramirez', telefono: '8713 43 69 47' },
  { id: '2', nombre: 'Alan Magdiel Molina Ramirez', telefono: '8713 72 05 80' },
  { id: '3', nombre: 'Alan Yared Jimenez Grijalva', telefono: '8714 83 52 81' },
  { id: '4', nombre: 'Aldo Luciano Garcia Silva', telefono: '8718 74 72 25' },
  { id: '5', nombre: 'Alicia Blanco Alvarez', telefono: '8714 04 83 61' },
  { id: '6', nombre: 'Alma Rosa Guzman Rodriguez', telefono: '8711 10 23 87' },
  { id: '7', nombre: 'Alondra Isabel Maldonado Martinez', telefono: '8712 31 81 28' }
])

const filteredContacts = computed(() => {
  if (!searchQuery.value.trim()) return contacts.value
  const query = searchQuery.value.toLowerCase()
  return contacts.value.filter(
    c => c.nombre.toLowerCase().includes(query) || c.telefono.includes(query)
  )
})

const seleccionarContacto = (contacto: Contact) => {
  // Redirige al siguiente paso o flujo de expedición
  navigateTo(`/distributor-portal/vales/expedir?clienteId=${contacto.id}`)
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
        <button class="back-btn" @click="volver">←</button>
        <h1 class="nav-title">Seleccionar contacto</h1>
      </header>

      <!-- CONTENIDO PRINCIPAL -->
      <div class="content-body">
        <!-- BUSCADOR -->
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar contacto"
            class="search-input"
          />
          <span class="search-icon">🔍</span>
        </div>

        <!-- En app/pages/distributor-portal/vales/nuevo.vue -->
<button class="add-contact-btn" @click="navigateTo('/distributor-portal/clientes')">
  <div class="plus-circle">+</div>
  <span class="add-text">Nuevo contacto</span>
</button>

        <!-- LISTA DE CONTACTOS -->
        <div class="contacts-list">
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
              <h3 class="contact-name">{{ item.nombre }}</h3>
              <p class="contact-phone">📞 {{ item.telefono }}</p>
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

.contact-item:active {
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
</style>