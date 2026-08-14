<template>
  <el-card class="console-table-card" shadow="never">
    <template v-if="title || $slots.actions" #header>
      <div class="console-table-card__header">
        <div>
          <div v-if="title" class="console-table-card__title">{{ title }}</div>
          <div v-if="description" class="console-table-card__description">{{ description }}</div>
        </div>
        <div v-if="$slots.actions" class="console-table-card__actions">
          <slot name="actions"></slot>
        </div>
      </div>
    </template>

    <div class="console-table-card__body" :class="{ 'has-horizontal-scroll': scrollX }">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="console-table-card__footer">
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
  scrollX: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped lang="scss">
.console-table-card {
  border: 1px solid var(--app-border) !important;
  border-radius: var(--app-radius-lg) !important;
  background: var(--app-surface) !important;
  box-shadow: var(--app-shadow-card) !important;
  overflow: hidden;

  :deep(.el-card__header) {
    padding: 14px 16px;
    border-bottom: 1px solid var(--app-border);
    background: var(--app-surface);
  }

  :deep(.el-card__body) {
    padding: 0;
  }
}

.console-table-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.console-table-card__title {
  color: var(--app-text);
  font-size: 15px;
  font-weight: 760;
}

.console-table-card__description {
  margin-top: 3px;
  color: var(--app-text-muted);
  font-size: 12px;
  line-height: 1.45;
}

.console-table-card__actions {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.console-table-card__body {
  min-width: 0;

  &.has-horizontal-scroll {
    overflow-x: auto;
  }

  :deep(.el-table) {
    --el-table-header-bg-color: var(--app-table-header-bg);
    --el-table-header-text-color: var(--app-text);
    --el-table-row-hover-bg-color: var(--app-table-row-hover);
    --el-table-border-color: var(--app-border);
  }

  :deep(.el-table th.el-table__cell) {
    font-weight: 700;
  }
}

.console-table-card__footer {
  display: flex;
  justify-content: flex-end;
  padding: 12px 16px;
  border-top: 1px solid var(--app-border);
  overflow-x: auto;
}

@media (max-width: 768px) {
  .console-table-card__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .console-table-card__actions {
    justify-content: flex-start;
  }
}
</style>
