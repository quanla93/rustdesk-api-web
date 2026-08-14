<template>
  <div v-if="tags.length" class="route-tabs">
    <span class="route-tabs__label">Open</span>
    <el-tag v-for="t in tags"
            :key="t.name"
            class="tag"
            :class="{'is-active': t.active}"
            :closable="t.closeable"
            @close="close(t)"
            @click="toTag(t)"
            :type="t.active?'primary':'info'"
            :effect="t.active?'dark':'plain'">
      {{ T(t.title) }}
    </el-tag>
  </div>
</template>

<script>
  import { defineComponent, ref, onMounted, watch } from 'vue'
  import { useTagsStore } from '@/store/tags'
  import { useRoute, useRouter } from 'vue-router'
  import { T } from '@/utils/i18n'

  export default defineComponent({
    name: 'Index',
    setup () {
      const tags = ref([])
      const tagsStore = useTagsStore()
      const route = useRoute()
      const router = useRouter()
      tags.value = tagsStore.tags

      const addTag = (route) => {
        if (!route.meta?.hide && route.name) {
          tagsStore.addTag(route)
        }
      }
      const close = (tag) => {
        tagsStore.removeTag(tag)
        if (tag.active) {
          toLastTag()
        }
      }
      const toLastTag = () => {
        if (tags.value.length) {
          router.push({ name: tags.value[tags.value.length - 1].name })
        }
      }
      const init = () => {
        if (!tagsStore.tags.length) {
          tagsStore.initTags()
        }
        addTag(route)
      }

      const toTag = (tag) => {
        if (tag.name !== route.name) {
          router.push({ name: tag.name })
        }
      }

      onMounted(init)
      watch(route, (val) => {
        addTag(val)
      })
      return {
        tags,
        addTag,
        close,
        toLastTag,
        toTag,
        T,
      }
    },
  })
</script>

<style lang="scss" scoped>
.route-tabs {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.route-tabs__label {
  flex: none;
  color: var(--app-text-soft);
  font-size: 11px;
  font-weight: 760;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.tag {
  margin-right: 0;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 650;
  transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(16, 24, 39, 0.08);
  }

  &.is-active {
    border-color: var(--app-primary) !important;
    background: var(--app-primary) !important;
    box-shadow: 0 8px 18px rgba(1, 97, 239, 0.18);
  }
}

@media (max-width: 768px) {
  .route-tabs__label {
    display: none;
  }
}
</style>
