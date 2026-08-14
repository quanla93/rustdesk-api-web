<template>
  <section class="console-page" :class="{ 'is-full-height': fullHeight }">
    <ConsolePageHeader
      v-if="title"
      :eyebrow="eyebrow"
      :title="title"
      :description="description"
      :meta="meta"
      :compact="compactHeader"
    >
      <slot name="header"></slot>
      <template v-if="$slots.meta" #meta>
        <slot name="meta"></slot>
      </template>
      <template v-if="$slots.actions" #actions>
        <slot name="actions"></slot>
      </template>
    </ConsolePageHeader>

    <div v-if="$slots.toolbar" class="console-page__toolbar">
      <slot name="toolbar"></slot>
    </div>

    <div v-loading="loading" class="console-page__body">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
import ConsolePageHeader from './ConsolePageHeader.vue'

defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  meta: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  fullHeight: {
    type: Boolean,
    default: false,
  },
  compactHeader: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss">
.console-page {
  width: 100%;
  min-width: 0;

  &.is-full-height {
    min-height: calc(100vh - 140px);
  }
}

.console-page__toolbar {
  margin-bottom: 14px;
}

.console-page__body {
  min-width: 0;
}
</style>
