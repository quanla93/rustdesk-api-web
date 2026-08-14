<template>
  <div class="console-page-header" :class="{ 'is-compact': compact }">
    <div class="console-page-header__content">
      <div v-if="eyebrow" class="console-page-header__eyebrow">{{ eyebrow }}</div>
      <div class="console-page-header__title-row">
        <h1 class="console-page-header__title">{{ title }}</h1>
        <slot name="meta">
          <span v-if="meta" class="console-page-header__meta">{{ meta }}</span>
        </slot>
      </div>
      <p v-if="description" class="console-page-header__description">{{ description }}</p>
      <slot></slot>
    </div>
    <div v-if="$slots.actions" class="console-page-header__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  meta: {
    type: String,
    default: '',
  },
  compact: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss">
.console-page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  margin: 2px 0 18px;

  &.is-compact {
    margin-bottom: 12px;

    .console-page-header__title {
      font-size: 20px;
    }
  }
}

.console-page-header__content {
  min-width: 0;
}

.console-page-header__eyebrow {
  margin-bottom: 6px;
  color: var(--app-primary);
  font-size: 12px;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.console-page-header__title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.console-page-header__title {
  margin: 0;
  color: var(--app-text);
  font-size: 24px;
  line-height: 1.18;
  font-weight: 780;
  letter-spacing: -0.025em;
}

.console-page-header__meta {
  flex: none;
  padding: 3px 8px;
  border: 1px solid var(--app-border);
  border-radius: 999px;
  color: var(--app-text-muted);
  background: var(--app-surface-muted);
  font-size: 12px;
  font-weight: 650;
}

.console-page-header__description {
  max-width: 760px;
  margin: 8px 0 0;
  color: var(--app-text-muted);
  font-size: 14px;
  line-height: 1.55;
}

.console-page-header__actions {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .console-page-header {
    align-items: stretch;
    flex-direction: column;
  }

  .console-page-header__actions {
    justify-content: flex-start;
  }
}
</style>
