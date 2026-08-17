<script setup lang="ts">
import { ref } from 'vue'

const { login, roleHome } = useAuth()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  if (!username.value || !password.value) {
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const roleCode = await login(username.value, password.value)
    await navigateTo(roleHome(roleCode))
  } catch (error) {
    errorMessage.value = 'Usuario o contraseña incorrectos.'
    console.error('Error al iniciar sesión:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="login-page">
    <div class="login-container">

      <!-- ================================= -->
      <!-- PANEL IZQUIERDO -->
      <!-- ================================= -->

      <section class="brand-panel">

        <div class="decorative-circle circle-one"></div>
        <div class="decorative-circle circle-two"></div>

        <div class="brand-content">

          <!-- Logo -->
          <div class="brand-logo">
            <div class="logo-icon">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 7.5C4 6.67 4.67 6 5.5 6H18.5C19.33 6 20 6.67 20 7.5V16.5C20 17.33 19.33 18 18.5 18H5.5C4.67 18 4 17.33 4 16.5V7.5Z"
                  stroke="#0D2747"
                  stroke-width="2"
                />

                <path
                  d="M8 10H16M8 14H13"
                  stroke="#0D2747"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div>
              <h1>MIS VALES</h1>
              <p>Administración de vales</p>
            </div>
          </div>

          <!-- Texto -->
          <div class="brand-message">
            <span>PLATAFORMA EMPRESARIAL</span>

            <h2>
              Administra tus vales
              <strong>de forma sencilla.</strong>
            </h2>

            <p>
              Gestiona vales, usuarios, relaciones y estados de cuenta
              desde una plataforma centralizada, segura y fácil de utilizar.
            </p>
          </div>

        </div>

        <!-- Características -->
        <div class="features">

          <div class="feature">
            <div class="feature-icon">
              ✓
            </div>

            <div>
              <h3>Gestión centralizada</h3>
              <p>
                Administra la información desde un solo lugar.
              </p>
            </div>
          </div>

          <div class="feature">
            <div class="feature-icon">
              ✓
            </div>

            <div>
              <h3>Control y seguimiento</h3>
              <p>
                Consulta movimientos y estados de cuenta.
              </p>
            </div>
          </div>

          <div class="feature">
            <div class="feature-icon">
              ✓
            </div>

            <div>
              <h3>Información segura</h3>
              <p>
                Protege el acceso a la información de tu empresa.
              </p>
            </div>
          </div>

        </div>

      </section>

      <!-- ================================= -->
      <!-- PANEL DERECHO -->
      <!-- ================================= -->

      <section class="form-panel">

        <!-- Logo para tablet/móvil -->
        <div class="mobile-brand">

          <div class="mobile-logo">
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 7.5C4 6.67 4.67 6 5.5 6H18.5C19.33 6 20 6.67 20 7.5V16.5C20 17.33 19.33 18 18.5 18H5.5C4.67 18 4 17.33 4 16.5V7.5Z"
                stroke="#0D2747"
                stroke-width="2"
              />

              <path
                d="M8 10H16M8 14H13"
                stroke="#0D2747"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <div>
            <h1>MIS VALES</h1>
            <p>Administración de vales</p>
          </div>

        </div>

        <div class="form-wrapper">

          <!-- Encabezado -->
          <div class="form-header">

            <span>BIENVENIDO DE NUEVO</span>

            <h2>Iniciar sesión</h2>

            <p>
              Ingresa tus datos para acceder a la plataforma de Mis Vales.
            </p>

          </div>

          <!-- FORMULARIO -->
          <form @submit.prevent="handleSubmit">

            <!-- Usuario -->
            <div class="form-group">

              <label for="username">
                Usuario
              </label>

              <div class="input-wrapper">

                <svg
                  class="input-icon"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 6H20V18H4V6Z"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />

                  <path
                    d="M4 7L12 13L20 7"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>

                <input
                  id="username"
                  v-model="username"
                  type="text"
                  placeholder="usuario"
                  autocomplete="username"
                  required
                />

              </div>

            </div>

            <!-- Contraseña -->
            <div class="form-group">

              <div class="password-header">

                <label for="password">
                  Contraseña
                </label>

                <button
                  type="button"
                  class="forgot-password"
                >
                  ¿Olvidaste tu contraseña?
                </button>

              </div>

              <div class="input-wrapper">

                <svg
                  class="input-icon"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />

                  <path
                    d="M8 10V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V10"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>

                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Ingresa tu contraseña"
                  autocomplete="current-password"
                  required
                />

                <button
                  type="button"
                  class="show-password"
                  @click="showPassword = !showPassword"
                >
                  {{ showPassword ? 'Ocultar' : 'Ver' }}
                </button>

              </div>

            </div>

            <!-- Recordar -->
            <label class="remember">

              <input
                v-model="rememberMe"
                type="checkbox"
              />

              <span>
                Mantener mi sesión iniciada
              </span>

            </label>

            <!-- Error -->
            <p v-if="errorMessage" class="login-error">
              {{ errorMessage }}
            </p>

            <!-- Botón -->
            <button
              type="submit"
              class="login-button"
              :disabled="loading"
            >

              <span v-if="!loading">
                Iniciar sesión
              </span>

              <span v-else>
                Iniciando sesión...
              </span>

              <span v-if="!loading" class="arrow">
                →
              </span>

            </button>

          </form>

          <!-- Seguridad -->
          <div class="security">

            <div class="security-icon">
              ✓
            </div>

            <p>
              Tu información está protegida mediante
              <strong>acceso seguro.</strong>
            </p>

          </div>

          <p class="copyright">
            © {{ new Date().getFullYear() }} Mis Vales.
            Todos los derechos reservados.
          </p>

        </div>

      </section>

    </div>
  </main>
</template>

<style scoped>
/* =========================================================
   VARIABLES
========================================================= */

.login-page {
  --blue: #0d2747;
  --blue-light: #12365f;
  --lime: #b8e63e;
  --lime-dark: #78a500;
  --background: #f4f7f8;
  --text: #263238;
  --gray: #64748b;

  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;

  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--background);

  padding: clamp(12px, 3vw, 32px);

  overflow-x: hidden;
}

.login-page *,
.login-page *::before,
.login-page *::after {
  box-sizing: border-box;
}


/* =========================================================
   CONTENEDOR PRINCIPAL
========================================================= */

.login-container {
  width: min(1200px, 100%);

  min-height: min(680px, calc(100dvh - 48px));

  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

  background: white;

  border-radius: clamp(20px, 3vw, 30px);

  overflow: hidden;

  box-shadow:
    0 25px 60px rgba(13, 39, 71, 0.12);
}


/* =========================================================
   PANEL IZQUIERDO
========================================================= */

.brand-panel {
  position: relative;

  min-width: 0;

  background: var(--blue);

  padding: clamp(32px, 4vw, 55px);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow: hidden;
}

.brand-content {
  position: relative;
  z-index: 2;
}


/* =========================================================
   LOGO
========================================================= */

.brand-logo {
  display: flex;
  align-items: center;

  gap: 13px;
}

.logo-icon {
  width: clamp(42px, 4vw, 48px);
  height: clamp(42px, 4vw, 48px);

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--lime);

  border-radius: 14px;
}

.brand-logo h1 {
  margin: 0;

  color: white;

  font-size: clamp(17px, 1.6vw, 20px);
  font-weight: 800;

  letter-spacing: 0.5px;
}

.brand-logo p {
  margin: 3px 0 0;

  color: #b9c5d3;

  font-size: clamp(10px, 1vw, 12px);
}


/* =========================================================
   MENSAJE PRINCIPAL
========================================================= */

.brand-message {
  margin-top: clamp(70px, 10vh, 130px);

  max-width: 500px;
}

.brand-message > span {
  color: var(--lime);

  font-size: clamp(10px, 1vw, 12px);
  font-weight: 700;

  letter-spacing: clamp(1.5px, 0.25vw, 3px);
}

.brand-message h2 {
  margin: 16px 0;

  color: white;

  font-size: clamp(32px, 3.4vw, 46px);
  line-height: 1.1;

  font-weight: 800;
}

.brand-message h2 strong {
  display: block;

  color: var(--lime);
}

.brand-message p {
  max-width: 450px;

  margin: 0;

  color: #b9c5d3;

  font-size: clamp(13px, 1.2vw, 15px);

  line-height: 1.75;
}


/* =========================================================
   CARACTERÍSTICAS
========================================================= */

.features {
  position: relative;
  z-index: 2;

  display: flex;
  flex-direction: column;

  gap: clamp(12px, 1.5vw, 18px);
}

.feature {
  display: flex;
  align-items: flex-start;

  gap: 12px;

  min-width: 0;
}

.feature-icon {
  width: 34px;
  height: 34px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--lime);

  background: rgba(184, 230, 62, 0.12);

  border-radius: 9px;

  font-weight: 800;
}

.feature h3 {
  margin: 0;

  color: white;

  font-size: clamp(12px, 1vw, 14px);
}

.feature p {
  margin: 4px 0 0;

  color: #8fa0b4;

  font-size: clamp(10px, 0.9vw, 12px);

  line-height: 1.4;
}


/* =========================================================
   DECORACIONES
========================================================= */

.decorative-circle {
  position: absolute;

  border-radius: 50%;

  background: rgba(184, 230, 62, 0.08);

  pointer-events: none;
}

.circle-one {
  width: clamp(200px, 25vw, 320px);
  height: clamp(200px, 25vw, 320px);

  top: -120px;
  right: -100px;
}

.circle-two {
  width: clamp(250px, 30vw, 380px);
  height: clamp(250px, 30vw, 380px);

  bottom: -220px;
  left: -160px;
}


/* =========================================================
   PANEL DERECHO
========================================================= */

.form-panel {
  min-width: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: clamp(30px, 5vw, 60px);
}

.form-wrapper {
  width: min(100%, 430px);
}


/* =========================================================
   HEADER DEL FORMULARIO
========================================================= */

.form-header {
  margin-bottom: clamp(24px, 3vw, 34px);
}

.form-header > span {
  color: var(--lime-dark);

  font-size: clamp(10px, 1vw, 12px);

  font-weight: 800;

  letter-spacing: 1.5px;
}

.form-header h2 {
  margin: 8px 0 10px;

  color: var(--blue);

  font-size: clamp(29px, 3vw, 38px);

  line-height: 1.15;

  font-weight: 800;
}

.form-header p {
  max-width: 400px;

  margin: 0;

  color: var(--gray);

  font-size: clamp(12px, 1.1vw, 14px);

  line-height: 1.6;
}


/* =========================================================
   FORMULARIO
========================================================= */

.form-group {
  margin-bottom: clamp(17px, 2vw, 22px);
}

.form-group label,
.password-header label {
  display: block;

  margin-bottom: 8px;

  color: var(--text);

  font-size: clamp(12px, 1vw, 13px);

  font-weight: 700;
}

.password-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 10px;
}

.password-header label {
  margin-bottom: 8px;
}

.forgot-password {
  margin-bottom: 8px;

  border: none;
  background: none;

  color: var(--lime-dark);

  font-size: 11px;
  font-weight: 700;

  white-space: nowrap;

  cursor: pointer;
}

.input-wrapper {
  position: relative;

  width: 100%;
}

.input-wrapper input {
  width: 100%;
  min-width: 0;

  padding: clamp(13px, 1.2vw, 15px) 45px;

  border: 1px solid #e1e7ec;

  border-radius: 12px;

  background: #f8fafb;

  color: var(--text);

  font-size: 13px;

  outline: none;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.input-wrapper input::placeholder {
  color: #a0aab5;
}

.input-wrapper input:focus {
  border-color: var(--blue);

  background: white;

  box-shadow:
    0 0 0 4px rgba(13, 39, 71, 0.07);
}

.input-icon {
  position: absolute;

  left: 15px;
  top: 50%;

  transform: translateY(-50%);

  color: #64748b;

  pointer-events: none;
}

.show-password {
  position: absolute;

  right: 13px;
  top: 50%;

  transform: translateY(-50%);

  border: none;
  background: transparent;

  color: var(--lime-dark);

  font-size: 11px;
  font-weight: 700;

  cursor: pointer;
}


/* =========================================================
   RECORDAR SESIÓN
========================================================= */

.remember {
  display: flex;
  align-items: center;

  gap: 9px;

  margin-bottom: 23px;

  color: var(--gray);

  font-size: 12px;

  cursor: pointer;
}

.remember input {
  width: 16px;
  height: 16px;

  flex-shrink: 0;

  accent-color: var(--blue);

  cursor: pointer;
}


.login-error {
  margin: 0 0 16px;
  padding: 10px 14px;

  border-radius: 8px;
  background: #fdecea;

  color: #b3261e;
  font-size: 14px;
}


/* =========================================================
   BOTÓN LOGIN
========================================================= */

.login-button {
  position: relative;

  width: 100%;

  min-height: 50px;

  padding: 13px 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  border: none;

  border-radius: 12px;

  background: var(--blue);

  color: white;

  font-size: 13px;
  font-weight: 800;

  cursor: pointer;

  box-shadow:
    0 8px 20px rgba(13, 39, 71, 0.18);

  transition:
    background 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.login-button:hover:not(:disabled) {
  background: var(--blue-light);

  transform: translateY(-2px);

  box-shadow:
    0 12px 25px rgba(13, 39, 71, 0.22);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.7;

  cursor: not-allowed;
}

.arrow {
  color: var(--lime);

  font-size: 20px;

  transition: transform 0.2s ease;
}

.login-button:hover .arrow {
  transform: translateX(4px);
}


/* =========================================================
   SEGURIDAD
========================================================= */

.security {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  margin-top: 30px;

  padding-top: 23px;

  border-top: 1px solid #edf0f2;
}

.security-icon {
  width: 30px;
  height: 30px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: rgba(184, 230, 62, 0.18);

  color: var(--lime-dark);

  font-size: 13px;
  font-weight: 800;
}

.security p {
  margin: 0;

  color: #89939d;

  font-size: 10px;

  line-height: 1.5;
}

.security strong {
  color: var(--blue);
}


/* =========================================================
   COPYRIGHT
========================================================= */

.copyright {
  margin: 25px 0 0;

  text-align: center;

  color: #a0aab5;

  font-size: 10px;

  line-height: 1.5;
}


/* =========================================================
   MARCA PARA TABLET / CELULAR
========================================================= */

.mobile-brand {
  display: none;
}


/* =========================================================
   LAPTOP PEQUEÑA / TABLET HORIZONTAL
========================================================= */

@media (max-width: 1024px) {

  .login-page {
    padding: 20px;
  }

  .login-container {
    min-height: 620px;
  }

  .brand-panel {
    padding: 38px;
  }

  .form-panel {
    padding: 38px;
  }

  .brand-message {
    margin-top: 70px;
  }

  .brand-message h2 {
    font-size: 34px;
  }
}


/* =========================================================
   TABLET
========================================================= */

@media (max-width: 820px) {

  .login-page {
    padding: 16px;
  }

  .login-container {
    grid-template-columns: 1fr;

    width: min(650px, 100%);

    min-height: auto;

    border-radius: 24px;
  }

  .brand-panel {
    display: none;
  }

  .form-panel {
    min-height: 650px;

    padding: 45px clamp(24px, 7vw, 60px);
  }

  .mobile-brand {
    display: flex;

    align-items: center;
    justify-content: center;

    gap: 12px;

    margin-bottom: 35px;
  }

  .mobile-logo {
    width: 44px;
    height: 44px;

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--lime);

    border-radius: 12px;
  }

  .mobile-brand h1 {
    margin: 0;

    color: var(--blue);

    font-size: 18px;
    font-weight: 800;
  }

  .mobile-brand p {
    margin: 2px 0 0;

    color: var(--gray);

    font-size: 10px;
  }

  .form-wrapper {
    width: min(100%, 430px);
  }
}


/* =========================================================
   TABLET VERTICAL / CELULAR GRANDE
========================================================= */

@media (max-width: 600px) {

  .login-page {
    align-items: flex-start;

    padding: 12px;
  }

  .login-container {
    width: 100%;

    border-radius: 20px;
  }

  .form-panel {
    min-height: calc(100dvh - 24px);

    padding: 32px clamp(18px, 6vw, 32px);
  }

  .mobile-brand {
    margin-bottom: 30px;
  }

  .form-header {
    margin-bottom: 25px;
  }

  .form-header h2 {
    font-size: 30px;
  }

  .form-header p {
    font-size: 13px;
  }

  .security {
    margin-top: 25px;

    padding-top: 20px;
  }
}


/* =========================================================
   CELULARES PEQUEÑOS
========================================================= */

@media (max-width: 400px) {

  .login-page {
    padding: 8px;
  }

  .login-container {
    border-radius: 17px;
  }

  .form-panel {
    min-height: calc(100dvh - 16px);

    padding: 25px 17px;
  }

  .mobile-brand {
    margin-bottom: 25px;
  }

  .mobile-logo {
    width: 40px;
    height: 40px;
  }

  .mobile-brand h1 {
    font-size: 16px;
  }

  .mobile-brand p {
    font-size: 9px;
  }

  .form-header h2 {
    font-size: 27px;
  }

  .form-header p {
    font-size: 12px;
  }

  .password-header {
    align-items: flex-start;

    flex-direction: column;

    gap: 2px;
  }

  .forgot-password {
    align-self: flex-end;
  }

  .input-wrapper input {
    font-size: 12px;

    padding-left: 42px;
    padding-right: 42px;
  }

  .security p {
    font-size: 9px;
  }

  .copyright {
    font-size: 9px;
  }
}


/* =========================================================
   CELULARES MUY PEQUEÑOS
========================================================= */

@media (max-width: 350px) {

  .form-panel {
    padding: 20px 14px;
  }

  .mobile-brand {
    margin-bottom: 20px;
  }

  .form-header {
    margin-bottom: 20px;
  }

  .form-header h2 {
    font-size: 25px;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .remember {
    margin-bottom: 18px;
  }

  .login-button {
    min-height: 46px;

    padding: 11px 14px;
  }

  .security {
    margin-top: 20px;

    padding-top: 18px;
  }
}


/* =========================================================
   CELULAR / TABLET EN HORIZONTAL
========================================================= */

@media (max-height: 650px) and (orientation: landscape) {

  .login-page {
    align-items: flex-start;

    padding: 10px;
  }

  .login-container {
    min-height: auto;
  }

  .form-panel {
    padding-top: 25px;
    padding-bottom: 25px;
  }

  .mobile-brand {
    margin-bottom: 18px;
  }

  .form-header {
    margin-bottom: 18px;
  }

  .form-group {
    margin-bottom: 14px;
  }

  .security {
    margin-top: 18px;

    padding-top: 15px;
  }

  .copyright {
    margin-top: 15px;
  }
}


/* =========================================================
   PANTALLAS MUY GRANDES
========================================================= */

@media (min-width: 1600px) {

  .login-container {
    max-width: 1250px;
  }

  .brand-panel,
  .form-panel {
    padding: 65px;
  }
}


/* =========================================================
   REDUCIR ANIMACIONES SI EL USUARIO LO PREFIERE
========================================================= */

@media (prefers-reduced-motion: reduce) {

  .login-page *,
  .login-page *::before,
  .login-page *::after {
    scroll-behavior: auto !important;

    transition: none !important;

    animation: none !important;
  }
}
</style>