<template>
  <el-menu
          class="menus"
          :collapse="isCollapse"
          :default-active="activeIndex"
          background-color="var(--app-sidebar-bg)"
          text-color="var(--app-sidebar-text)"
          active-text-color="var(--app-sidebar-active-text)"
          router
  >
    <menu-item v-for="(route,index) in routes" :key="route.name" :route="route"></menu-item>
  </el-menu>
</template>

<script>
  import { defineComponent, ref, computed } from 'vue'
  import { useRouteStore } from '@/store/router'
  import MenuItem from '@/layout/components/menu/item.vue'
  import { useRoute } from 'vue-router'
  import { useAppStore } from '@/store/app'

  export default defineComponent({
    name: 'Menu',
    created () {
    },
    components: { MenuItem },
    setup () {
      const routes = ref([])
      const route = useRoute()
      const app = useAppStore()
      const isCollapse = computed(() => app.setting.sideIsCollapse)
      const activeIndex = computed(() => route.name)

      routes.value = useRouteStore().routes
      return {
        routes,
        activeIndex,
        isCollapse,
      }
    },

  })
</script>

<style lang="scss" scoped>
  .menus {
    min-height: 100vh;
    border-right: none;
    background: transparent;

    &:not(.el-menu--collapse) {
      width: var(--sideBarWidth);
    }

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      height: 44px;
      margin: 4px 10px;
      border-radius: 12px;
      color: var(--app-sidebar-text);
      transition: background-color 0.18s ease, color 0.18s ease;
    }

    :deep(.el-menu-item:hover),
    :deep(.el-sub-menu__title:hover) {
      background: var(--app-sidebar-hover-bg) !important;
      color: var(--app-sidebar-active-text) !important;
    }

    :deep(.el-menu-item.is-active) {
      background: var(--app-sidebar-active-bg) !important;
      color: var(--app-sidebar-active-text) !important;
      font-weight: 700;
    }

    :deep(.el-menu--inline) {
      background: transparent !important;
    }
  }
</style>
