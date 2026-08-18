<script setup lang="ts">
import type { NuxtError } from '#app'
import { computed } from 'vue'

defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

const { roleCode, roleHome } = useAuth()

const redirectPath = computed(() => {
  return roleHome(roleCode.value)
})
</script>

<template>
  <UApp>
    <UError :error="error" :redirect="redirectPath" />
  </UApp>
</template>
