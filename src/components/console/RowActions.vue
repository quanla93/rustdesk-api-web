<template>
  <div class="row-actions" :class="{ 'is-compact': compact }">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss">
.row-actions {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 6px;

  :deep(.el-button) {
    margin-left: 0 !important;
  }

  :deep(.el-button.is-text),
  :deep(.el-button--text) {
    min-height: 30px;
    padding: 5px 8px;
    border-radius: var(--app-radius-xs);
    font-weight: 650;

    &:focus-visible {
      box-shadow: var(--app-focus-ring);
    }
  }

  &.is-compact {
    gap: 2px;

    :deep(.el-button.is-text),
    :deep(.el-button--text) {
      min-height: 28px;
      padding: 4px 7px;
    }
  }
}
</style>
