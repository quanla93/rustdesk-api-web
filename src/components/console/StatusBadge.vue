<template>
  <span class="status-badge" :class="[`is-${normalizedType}`, { 'is-dotless': !dot }]">
    <span v-if="dot" class="status-badge__dot" aria-hidden="true"></span>
    <slot>{{ displayLabel }}</slot>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
  label: {
    type: String,
    default: '',
  },
  dot: {
    type: Boolean,
    default: true,
  },
})

const typeMap = {
  online: 'success',
  active: 'success',
  enabled: 'success',
  success: 'success',
  running: 'success',
  offline: 'default',
  inactive: 'default',
  disabled: 'default',
  default: 'default',
  warning: 'warning',
  pending: 'warning',
  danger: 'danger',
  error: 'danger',
  failed: 'danger',
  info: 'info',
}

const normalizedType = computed(() => typeMap[String(props.type).toLowerCase()] || 'default')
const displayLabel = computed(() => props.label || props.type)
</script>

<style scoped lang="scss">
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  min-height: 24px;
  padding: 3px 9px;
  border: 1px solid var(--app-border);
  border-radius: 999px;
  background: var(--app-surface-muted);
  color: var(--app-text-muted);
  font-size: 12px;
  line-height: 1.35;
  font-weight: 700;
  white-space: nowrap;

  &.is-dotless {
    gap: 0;
  }

  &.is-success {
    border-color: rgba(22, 163, 74, 0.22);
    background: var(--app-success-soft);
    color: var(--app-success);
  }

  &.is-warning {
    border-color: rgba(245, 158, 11, 0.26);
    background: var(--app-warning-soft);
    color: var(--app-warning);
  }

  &.is-danger {
    border-color: rgba(239, 68, 68, 0.24);
    background: var(--app-danger-soft);
    color: var(--app-danger);
  }

  &.is-info {
    border-color: rgba(14, 165, 233, 0.24);
    background: var(--app-info-soft);
    color: var(--app-info);
  }
}

.status-badge__dot {
  width: 7px;
  height: 7px;
  flex: none;
  border-radius: 999px;
  background: currentColor;
  box-shadow: 0 0 0 3px color-mix(in srgb, currentColor 14%, transparent);
}
</style>
