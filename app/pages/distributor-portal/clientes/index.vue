<script setup lang="ts">
import { ref } from 'vue'
import { useCustomers } from '~/composables/useCustomers'

definePageMeta({
  layout: false
})

const { createCustomer } = useCustomers()

const form = ref({
  nombre: '',
  segundoNombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  genero: '',
  fechaNacimiento: '',
  telefono: '',
  telefonoFijo: '',
  correo: '',
  curp: '',
  rfc: '',
  calle: '',
  numeroExterior: '',
  colonia: '',
  ciudad: '',
  estado: '',
  codigoPostal: '',
  notasPersona: '',
  notasCliente: ''
})

const saving = ref(false)
const errorMessage = ref<string | null>(null)

const guardarCliente = async () => {
  if (form.value.curp.trim().length !== 18 || !isValidCurp(form.value.curp)) {
    errorMessage.value = 'La CURP debe tener 18 caracteres y un formato válido.'
    return
  }

  if (form.value.rfc.trim() && !isValidRfc(form.value.rfc)) {
    errorMessage.value = 'El RFC capturado no tiene un formato válido.'
    return
  }

  if (form.value.fechaNacimiento) {
    const birthDate = new Date(form.value.fechaNacimiento)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    if (age < 18) {
      errorMessage.value = 'El cliente debe ser mayor de 18 años.'
      return
    }
  }

  saving.value = true
  errorMessage.value = null

  try {
    await createCustomer({
      person: {
        first_name: form.value.nombre.trim(),
        middle_name: form.value.segundoNombre.trim() || undefined,
        last_name: form.value.apellidoPaterno.trim(),
        second_last_name: form.value.apellidoMaterno.trim() || undefined,
        gender: (form.value.genero as 'M' | 'F' | 'OTHER') || undefined,
        birth_date: form.value.fechaNacimiento || undefined,
        curp: form.value.curp.trim().toUpperCase(),
        rfc: form.value.rfc.trim() ? form.value.rfc.trim().toUpperCase() : undefined,
        home_phone: form.value.telefonoFijo.trim() || undefined,
        mobile_phone: form.value.telefono.trim() || undefined,
        email: form.value.correo.trim() || undefined,
        street: form.value.calle.trim() || undefined,
        external_number: form.value.numeroExterior.trim() || undefined,
        neighborhood: form.value.colonia.trim() || undefined,
        city: form.value.ciudad.trim() || undefined,
        state: form.value.estado.trim() || undefined,
        postal_code: form.value.codigoPostal.trim() || undefined,
        notes: form.value.notasPersona.trim() || undefined
      },
      notes: form.value.notasCliente.trim() || undefined
    })

    navigateTo('/distributor-portal/vales')
  } catch (e: unknown) {
    console.error(e)
    errorMessage.value = extractApiErrorMessage(e, 'No se pudo registrar el cliente. Verifica los datos e intenta de nuevo.')
  } finally {
    saving.value = false
  }
}

const volver = () => {
  navigateTo('/distributor-portal/vales')
}
</script>

<template>
  <main class="form-shell">
    <div class="form-wrapper">
      <!-- NAVBAR AZUL -->
      <header class="top-navbar">
        <button class="back-btn" @click="volver">
          ←
        </button>
        <h1 class="nav-title">
          Nuevo Cliente
        </h1>
      </header>

      <!-- FORMULARIO -->
      <form class="form-body" @submit.prevent="guardarCliente">
        <p v-if="errorMessage" class="error-banner">
          {{ errorMessage }}
        </p>

        <p class="section-title">
          Datos personales
        </p>

        <div class="input-row">
          <div class="input-group">
            <label>Nombre(s) *</label>
            <input
              v-model="form.nombre"
              type="text"
              placeholder="Ej. María Elena"
              required
              class="app-input"
            >
          </div>

          <div class="input-group">
            <label>Segundo nombre</label>
            <input
              v-model="form.segundoNombre"
              type="text"
              placeholder="Opcional"
              class="app-input"
            >
          </div>
        </div>

        <div class="input-row">
          <div class="input-group">
            <label>Apellido Paterno *</label>
            <input
              v-model="form.apellidoPaterno"
              type="text"
              placeholder="Ej. Gómez"
              required
              class="app-input"
            >
          </div>

          <div class="input-group">
            <label>Apellido Materno</label>
            <input
              v-model="form.apellidoMaterno"
              type="text"
              placeholder="Ej. López"
              class="app-input"
            >
          </div>
        </div>

        <div class="input-row">
          <div class="input-group">
            <label>Género</label>
            <select v-model="form.genero" class="app-input">
              <option value="">
                Selecciona...
              </option>
              <option value="M">
                Masculino
              </option>
              <option value="F">
                Femenino
              </option>
              <option value="OTHER">
                Otro
              </option>
            </select>
          </div>

          <div class="input-group">
            <label>Fecha de nacimiento</label>
            <input
              v-model="form.fechaNacimiento"
              type="date"
              class="app-input"
            >
          </div>
        </div>

        <div class="input-group">
          <label>CURP (Única) *</label>
          <input
            v-model="form.curp"
            type="text"
            placeholder="18 caracteres"
            maxlength="18"
            required
            class="app-input uppercase"
          >
        </div>

        <div class="input-group">
          <label>RFC</label>
          <input
            v-model="form.rfc"
            type="text"
            placeholder="13 caracteres"
            maxlength="13"
            class="app-input uppercase"
          >
        </div>

        <p class="section-title">
          Contacto
        </p>

        <div class="input-row">
          <div class="input-group">
            <label>Teléfono móvil *</label>
            <input
              v-model="form.telefono"
              type="tel"
              placeholder="Ej. 8712345678"
              maxlength="10"
              required
              class="app-input"
            >
          </div>

          <div class="input-group">
            <label>Teléfono fijo</label>
            <input
              v-model="form.telefonoFijo"
              type="tel"
              placeholder="Opcional"
              maxlength="10"
              class="app-input"
            >
          </div>
        </div>

        <div class="input-group">
          <label>Correo electrónico</label>
          <input
            v-model="form.correo"
            type="email"
            placeholder="correo@ejemplo.com"
            class="app-input"
          >
        </div>

        <p class="section-title">
          Domicilio
        </p>

        <div class="input-row">
          <div class="input-group">
            <label>Calle</label>
            <input
              v-model="form.calle"
              type="text"
              placeholder="Ej. Av. Constitución"
              class="app-input"
            >
          </div>

          <div class="input-group">
            <label>Número exterior</label>
            <input
              v-model="form.numeroExterior"
              type="text"
              placeholder="Ej. 123"
              class="app-input"
            >
          </div>
        </div>

        <div class="input-group">
          <label>Colonia</label>
          <input
            v-model="form.colonia"
            type="text"
            placeholder="Ej. Centro"
            class="app-input"
          >
        </div>

        <div class="input-row">
          <div class="input-group">
            <label>Ciudad</label>
            <input
              v-model="form.ciudad"
              type="text"
              placeholder="Ej. Monterrey"
              class="app-input"
            >
          </div>

          <div class="input-group">
            <label>Estado</label>
            <input
              v-model="form.estado"
              type="text"
              placeholder="Ej. Nuevo León"
              class="app-input"
            >
          </div>
        </div>

        <div class="input-group">
          <label>Código postal</label>
          <input
            v-model="form.codigoPostal"
            type="text"
            placeholder="Ej. 64000"
            maxlength="10"
            class="app-input"
          >
        </div>

        <button type="submit" class="submit-btn" :disabled="saving">
          {{ saving ? 'Guardando…' : 'Guardar Cliente' }}
        </button>
      </form>
    </div>
  </main>
</template>

<style scoped>
.form-shell {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f1f5f9;
  overflow-y: auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.form-wrapper {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f1f5f9;
}

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

.form-body {
  padding: 18px 16px 110px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.error-banner {
  background-color: #fee2e2;
  color: #991b1b;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 13px;
  font-weight: 600;
  margin: 0;
  border: 1px solid #fecaca;
}

.section-title {
  margin: 8px 0 -4px 0;
  font-size: 12px;
  font-weight: 800;
  color: #0a2472;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 2px solid #e0e7ff;
  padding-bottom: 8px;
}

.input-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.input-group label {
  font-size: 11px;
  font-weight: 800;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.app-input {
  width: 100%;
  padding: 13px 14px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  font-size: 14px;
  color: #0f172a;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.app-input:focus {
  border-color: #1d4ed8;
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.12);
}

.uppercase {
  text-transform: uppercase;
}

.textarea {
  resize: none;
}

.submit-btn {
  margin-top: 10px;
  background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%);
  color: #052e16;
  border: none;
  padding: 15px;
  border-radius: 16px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(132, 204, 22, 0.3);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.submit-btn:active {
  transform: scale(0.99);
  box-shadow: 0 4px 10px rgba(132, 204, 22, 0.2);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

@media (max-width: 360px) {
  .top-navbar {
    padding: 14px 14px;
  }

  .form-body {
    padding: 16px 14px 100px 14px;
  }

  .input-row {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
}
</style>
