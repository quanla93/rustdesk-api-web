<template>
  <el-tag v-for="(t, i) in tags"
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
.tag {
  margin-right: 8px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 650;
  transition: transform 0.16s ease, box-shadow 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
  }

  &.is-active {
    box-shadow: 0 8px 18px rgba(37, 99, 235, 0.18);
  }
}
</style>
