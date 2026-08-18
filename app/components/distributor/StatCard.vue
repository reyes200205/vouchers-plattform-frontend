<script setup lang="ts">
defineProps<{
  title: string
  value: string
  subtitle?: string
  icon?: string
  badgeText?: string
  badgeVariant?: 'success' | 'warning' | 'info' | 'danger'
}>()
</script>

<template>
  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-title">{{ title }}</span>
      <span v-if="icon" class="stat-icon">{{ icon }}</span>
    </div>

    <div class="stat-value">{{ value }}</div>

    <div class="stat-footer">
      <span v-if="badgeText" class="badge" :class="badgeVariant || 'info'">
        {{ badgeText }}
      </span>
      <span v-if="subtitle" class="stat-subtitle">{{ subtitle }}</span>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  background: #ffffff;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  min-width: 0;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-title {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-icon {
  font-size: 14px;
}

.stat-value {
  font-size: 18px;
  font-weight: 800;
  color: #002b66;
  margin: 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-footer {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.stat-subtitle {
  font-size: 10px;
  color: #94a3b8;
  font-weight: 600;
}

.badge {
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
}

.badge.success { background: #dcfce7; color: #166534; }
.badge.warning { background: #fef3c7; color: #92400e; }
.badge.info { background: #e0f2fe; color: #075985; }
.badge.danger { background: #ffe4e6; color: #9f1239; }
</style>