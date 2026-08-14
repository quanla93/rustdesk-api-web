<template>
  <div class="tag-chips" :class="{ 'is-centered': centered }">
    <template v-if="normalizedTags.length">
      <el-tag
        v-for="tag in visibleTags"
        :key="tag.key"
        class="tag-chips__tag"
        :type="tag.type"
        :effect="effect"
        :round="round"
        size="small"
      >
        {{ tag.label }}
      </el-tag>
      <el-tooltip v-if="hiddenCount > 0" :content="hiddenLabels" placement="top">
        <el-tag class="tag-chips__tag" effect="plain" round size="small">+{{ hiddenCount }}</el-tag>
      </el-tooltip>
    </template>
    <span v-else-if="emptyText" class="tag-chips__empty">{{ emptyText }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tags: {
    type: Array,
    default: () => [],
  },
  max: {
    type: Number,
    default: 4,
  },
  emptyText: {
    type: String,
    default: '',
  },
  effect: {
    type: String,
    default: 'light',
  },
  round: {
    type: Boolean,
    default: true,
  },
  centered: {
    type: Boolean,
    default: false,
  },
})

const normalizedTags = computed(() => props.tags
  .filter(Boolean)
  .map((tag, index) => {
    if (typeof tag === 'string' || typeof tag === 'number') {
      return { key: `${tag}-${index}`, label: String(tag), type: '' }
    }
    return {
      key: tag.id ?? tag.value ?? tag.name ?? tag.label ?? index,
      label: tag.label ?? tag.name ?? tag.value ?? '',
      type: tag.type ?? '',
    }
  })
  .filter(tag => tag.label))

const visibleTags = computed(() => normalizedTags.value.slice(0, props.max))
const hiddenTags = computed(() => normalizedTags.value.slice(props.max))
const hiddenCount = computed(() => hiddenTags.value.length)
const hiddenLabels = computed(() => hiddenTags.value.map(tag => tag.label).join(', '))
</script>

<style scoped lang="scss">
.tag-chips {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  min-width: 0;

  &.is-centered {
    justify-content: center;
  }
}

.tag-chips__tag {
  max-width: 180px;

  :deep(.el-tag__content) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.tag-chips__empty {
  color: var(--app-text-soft);
  font-size: 12px;
}
</style>
