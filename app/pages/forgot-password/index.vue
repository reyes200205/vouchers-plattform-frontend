<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const { forgotPassword } = useAuth()

const username = ref('')
const loading = ref(false)
const errorMessage = ref('')
const success = ref(false)

// Cloudflare Turnstile setup (mismo patrón que /login, pero con su propio
// widget: es una página distinta con su propio ciclo de vida).
const runtimeConfig = useRuntimeConfig()
const siteKey = runtimeConfig.public.turnstileSiteKey
const turnstileContainer = ref<HTMLElement | null>(null)
const turnstileToken = ref('')
let turnstileWidgetId: string | number | null = null
let turnstileInterval: ReturnType<typeof setInterval> | null = null

useHead({
  script: [
    {
      src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
      async: true,
      defer: true
    }
  ]
})

const initTurnstile = () => {
  if (siteKey && window.turnstile && turnstileContainer.value) {
    try {
      turnstileWidgetId = window.turnstile.render(turnstileContainer.value, {
        'sitekey': siteKey,
        'callback': (token: string) => {
          turnstileToken.value = token
          errorMessage.value = ''
        },
        'expired-callback': () => {
          turnstileToken.value = ''
        },
        'error-callback': () => {
          turnstileToken.value = ''
        }
      })
    } catch (e) {
      console.warn('Turnstile render error:', e)
    }
  }
}

onMounted(() => {
  if (window.turnstile) {
    initTurnstile()
  } else {
    turnstileInterval = setInterval(() => {
      if (window.turnstile) {
        if (turnstileInterval) clearInterval(turnstileInterval)
        initTurnstile()
      }
    }, 100)
  }
})

onUnmounted(() => {
  if (turnstileInterval) {
    clearInterval(turnstileInterval)
  }
  if (turnstileWidgetId !== null && window.turnstile) {
    window.turnstile.remove(turnstileWidgetId)
  }
})

const handleSubmit = async () => {
  if (!username.value) return

  if (siteKey && !turnstileToken.value) {
    errorMessage.value = 'Por favor, completa el captcha de seguridad.'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    await forgotPassword(username.value, turnstileToken.value)
    success.value = true
  } catch (error: any) {
    const responseData = error.data || error.response?._data
    let msg = 'No se pudo enviar el enlace de recuperación. Intenta de nuevo.'

    if (responseData?.errors) {
      const firstErrorKey = Object.keys(responseData.errors)[0]
      if (firstErrorKey && responseData.errors[firstErrorKey]?.[0]) {
        msg = responseData.errors[firstErrorKey][0]
      } else if (responseData.message) {
        msg = responseData.message
      }
    } else if (responseData?.message) {
      msg = responseData.message
    }

    errorMessage.value = msg

    if (turnstileWidgetId !== null && window.turnstile) {
      try {
        window.turnstile.reset(turnstileWidgetId)
      } catch (e) {
        console.warn('Turnstile reset ignored:', e)
      }
      turnstileToken.value = ''
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="forgot-page">
    <div class="forgot-card">
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

      <template v-if="success">
        <div class="form-header">
          <h2>Revisa tu correo</h2>

          <p>
            Si el usuario existe, enviamos un enlace de recuperación a su correo registrado.
            Revisa tu bandeja de entrada (y spam); el enlace expira en un rato.
          </p>
        </div>

        <NuxtLink to="/login" class="login-button">
          <span>Volver al inicio de sesión</span>
          <span class="arrow">→</span>
        </NuxtLink>
      </template>

      <template v-else>
        <div class="form-header">
          <h2>¿Olvidaste tu contraseña?</h2>

          <p>
            Ingresa tu usuario o correo registrado y te enviaremos un enlace para restablecerla.
          </p>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="forgot-username">Usuario o correo</label>

            <div class="input-wrapper">
              <input
                id="forgot-username"
                v-model="username"
                type="text"
                placeholder="usuario o correo"
                autocomplete="username"
                required
              >
            </div>
          </div>

          <p v-if="errorMessage" class="forgot-error">
            {{ errorMessage }}
          </p>

          <div v-if="siteKey" class="turnstile-wrapper">
            <div ref="turnstileContainer" />
          </div>

          <button
            type="submit"
            class="login-button"
            :disabled="loading"
          >
            <span v-if="!loading">Enviar enlace de recuperación</span>
            <span v-else>Enviando...</span>
            <span v-if="!loading" class="arrow">→</span>
          </button>

          <div style="display:flex; justify-content:center; margin-top:16px;">
            <NuxtLink to="/login" class="back-link">
              Volver al inicio de sesión
            </NuxtLink>
          </div>
        </form>
      </template>
    </div>
  </main>
</template>

<style scoped>
.forgot-page {
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

.forgot-page *,
.forgot-page *::before,
.forgot-page *::after {
  box-sizing: border-box;
}

.forgot-card {
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

.forgot-error {
  margin: 0 0 16px;
  padding: 10px 14px;

  border-radius: 8px;
  background: #fdecea;

  color: #b3261e;
  font-size: 13px;
}

.turnstile-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}

.back-link {
  border: none;
  background: none;

  color: var(--lime-dark);

  font-size: 11px;
  font-weight: 700;

  text-decoration: none;
  cursor: pointer;
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
