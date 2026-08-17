<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const { user } = useAuth()
</script>

<template>
  <div class="role-landing">
    <h1>Bienvenido</h1>
    <p>Tu rol es: <strong>{{ user?.role?.name ?? 'Verificador' }}</strong></p>
  </div>
</template>

<style scoped>
.role-landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 60vh;
  gap: 8px;

  text-align: center;
}
</style>
