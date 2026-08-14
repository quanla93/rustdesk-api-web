<template>
  <el-card class="console-filter-bar" shadow="never">
    <div v-if="title || $slots.actions" class="console-filter-bar__header">
      <div>
        <div v-if="title" class="console-filter-bar__title">{{ title }}</div>
        <div v-if="description" class="console-filter-bar__description">{{ description }}</div>
      </div>
      <div v-if="$slots.actions" class="console-filter-bar__actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="console-filter-bar__content">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="console-filter-bar__footer">
      <slot name="footer"></slot>
    </div>
  </el-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
})
</script>

<style scoped lang="scss">
.console-filter-bar {
  border: 1px solid var(--app-border) !important;
  border-radius: var(--app-radius-lg) !important;
  background: var(--app-surface-muted) !important;
  box-shadow: none !important;

  :deep(.el-card__body) {
    padding: 14px;
  }
}

.console-filter-bar__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;
}

.console-filter-bar__title {
  color: var(--app-text);
  font-size: 14px;
  font-weight: 750;
}

.console-filter-bar__description {
  margin-top: 3px;
  color: var(--app-text-muted);
  font-size: 12px;
  line-height: 1.45;
}

.console-filter-bar__actions {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.console-filter-bar__content {
  :deep(.el-form) {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px 14px;
  }

  :deep(.el-form-item) {
    margin: 0;
  }

  :deep(.el-button + .el-button) {
    margin-left: 0;
  }
}

.console-filter-bar__footer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--app-border);
}

@media (max-width: 768px) {
  .console-filter-bar__header {
    flex-direction: column;
  }
}
</style>
