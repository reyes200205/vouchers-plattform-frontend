<script setup lang="ts">
const { resetPassword } = useAuth()
const route = useRoute()

const email = ref(typeof route.query.email === 'string' ? route.query.email : '')
const token = ref(typeof route.query.token === 'string' ? route.query.token : '')
const linkInvalid = !email.value || !token.value

const password = ref('')
const passwordConfirmation = ref('')
const loading = ref(false)
const errorMessage = ref('')
const success = ref(false)

const handleSubmit = async () => {
  if (!password.value || !passwordConfirmation.value) return

  if (password.value !== passwordConfirmation.value) {
    errorMessage.value = 'Las contraseñas no coinciden.'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    await resetPassword(email.value, token.value, password.value, passwordConfirmation.value)
    success.value = true
  } catch (error: any) {
    const responseData = error.data || error.response?._data
    errorMessage.value = responseData?.message ?? 'No se pudo restablecer la contraseña. Intenta de nuevo.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="reset-page">
    <div class="reset-card">
      <div class="brand-logo">
        <div class="logo-icon">
          <svg
            width="22"
            height="22"
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
        <span>MIS VALES</span>
      </div>

      <template v-if="linkInvalid">
        <div class="form-header">
          <h2>Enlace inválido</h2>
          <p>Este enlace de recuperación no es válido. Solicita uno nuevo desde la pantalla de inicio de sesión.</p>
        </div>

        <NuxtLink to="/login" class="login-button">
          <span>Ir a iniciar sesión</span>
          <span class="arrow">→</span>
        </NuxtLink>
      </template>

      <template v-else-if="success">
        <div class="form-header">
          <h2>Contraseña actualizada</h2>
          <p>Ya puedes iniciar sesión con tu nueva contraseña.</p>
        </div>

        <NuxtLink to="/login" class="login-button">
          <span>Ir a iniciar sesión</span>
          <span class="arrow">→</span>
        </NuxtLink>
      </template>

      <template v-else>
        <div class="form-header">
          <h2>Restablece tu contraseña</h2>
          <p>Elige una nueva contraseña para tu cuenta.</p>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="new-password">Nueva contraseña</label>
            <div class="input-wrapper">
              <input
                id="new-password"
                v-model="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                autocomplete="new-password"
                minlength="8"
                required
              >
            </div>
          </div>

          <div class="form-group">
            <label for="new-password-confirmation">Confirma tu nueva contraseña</label>
            <div class="input-wrapper">
              <input
                id="new-password-confirmation"
                v-model="passwordConfirmation"
                type="password"
                placeholder="Repite tu nueva contraseña"
                autocomplete="new-password"
                minlength="8"
                required
              >
            </div>
          </div>

          <p v-if="errorMessage" class="reset-error">
            {{ errorMessage }}
          </p>

          <button type="submit" class="login-button" :disabled="loading">
            <span v-if="!loading">Restablecer contraseña</span>
            <span v-else>Guardando...</span>
            <span v-if="!loading" class="arrow">→</span>
          </button>
        </form>
      </template>
    </div>
  </main>
</template>

<style scoped>
.reset-page {
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

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--background);
  padding: 24px;
  box-sizing: border-box;
}

.reset-page *,
.reset-page *::before,
.reset-page *::after {
  box-sizing: border-box;
}

.reset-card {
  width: min(100%, 420px);

  background: white;
  border-radius: 20px;
  padding: clamp(28px, 4vw, 40px);

  box-shadow: 0 20px 45px rgba(13, 39, 71, 0.12);
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
}

.logo-icon {
  width: 38px;
  height: 38px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--lime);
  border-radius: 11px;
}

.brand-logo span {
  color: var(--blue);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.form-header {
  margin-bottom: 24px;
}

.form-header h2 {
  margin: 0 0 8px;
  color: var(--blue);
  font-size: clamp(22px, 3vw, 26px);
  font-weight: 800;
}

.form-header p {
  margin: 0;
  color: var(--gray);
  font-size: 13px;
  line-height: 1.6;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: var(--text);
  font-size: 13px;
  font-weight: 700;
}

.input-wrapper input {
  width: 100%;

  padding: 13px 15px;

  border: 1px solid #e1e7ec;
  border-radius: 12px;

  background: #f8fafb;
  color: var(--text);

  font-size: 13px;
  outline: none;

  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.input-wrapper input::placeholder {
  color: #a0aab5;
}

.input-wrapper input:focus {
  border-color: var(--blue);
  background: white;
  box-shadow: 0 0 0 4px rgba(13, 39, 71, 0.07);
}

.reset-error {
  margin: 0 0 16px;
  padding: 10px 14px;

  border-radius: 8px;
  background: #fdecea;

  color: #b3261e;
  font-size: 13px;
}

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
  text-decoration: none;

  background: var(--blue);
  color: white;

  font-size: 13px;
  font-weight: 800;

  cursor: pointer;
  box-shadow: 0 8px 20px rgba(13, 39, 71, 0.18);

  transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.login-button:hover:not(:disabled) {
  background: var(--blue-light);
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(13, 39, 71, 0.22);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.arrow {
  color: var(--lime);
  font-size: 18px;
}
</style>
