<template>
  <div class="empty-state" :class="{ 'is-compact': compact }">
    <div v-if="$slots.icon || icon" class="empty-state__icon" aria-hidden="true">
      <slot name="icon">
        <el-icon v-if="iconComponent"><component :is="iconComponent" /></el-icon>
      </slot>
    </div>
    <div class="empty-state__title">{{ title }}</div>
    <p v-if="description" class="empty-state__description">{{ description }}</p>
    <div v-if="$slots.actions" class="empty-state__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'No data',
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: [String, Object],
    default: '',
  },
  compact: {
    type: Boolean,
    default: false,
  },
})

const iconComponent = computed(() => props.icon || '')
</script>

<style scoped lang="scss">
.empty-state {
  display: flex;
  min-height: 220px;
  padding: 34px 18px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: var(--app-text-muted);

  &.is-compact {
    min-height: 120px;
    padding: 20px 14px;
  }
}

.empty-state__icon {
  width: 46px;
  height: 46px;
  margin-bottom: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--app-primary-border);
  border-radius: 16px;
  background: var(--app-primary-soft);
  color: var(--app-primary);
  font-size: 24px;
}

.empty-state__title {
  color: var(--app-text);
  font-size: 15px;
  line-height: 1.4;
  font-weight: 760;
}

.empty-state__description {
  max-width: 460px;
  margin: 6px 0 0;
  color: var(--app-text-muted);
  font-size: 13px;
  line-height: 1.55;
}

.empty-state__actions {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
}
</style>
