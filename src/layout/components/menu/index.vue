<template>
  <el-menu
          class="menus"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activeIndex"
          background-color="var(--app-sidebar-bg)"
          text-color="var(--app-sidebar-text)"
          active-text-color="var(--app-sidebar-active-text)"
          unique-opened
          router
  >
    <menu-item v-for="route in routes" :key="route.name" :route="route"></menu-item>
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
    min-height: calc(100vh - 88px);
    border-right: none;
    background: transparent !important;

    &:not(.el-menu--collapse) {
      width: var(--sideBarWidth);
    }

    &.el-menu--collapse {
      width: 72px;
    }

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      height: 42px;
      margin: 4px 10px;
      padding-inline: 14px !important;
      border-radius: 12px;
      color: var(--app-sidebar-text);
      font-weight: 650;
      transition: background-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
    }

    :deep(.el-menu-item .el-icon),
    :deep(.el-sub-menu__title .el-icon) {
      width: 20px;
      margin-right: 10px;
      color: var(--app-sidebar-muted);
      font-size: 18px;
      transition: color 0.18s ease;
    }

    :deep(.el-menu-item:hover),
    :deep(.el-sub-menu__title:hover) {
      background: var(--app-sidebar-hover-bg) !important;
      color: var(--app-sidebar-active-text) !important;
      transform: translateX(1px);
    }

    :deep(.el-menu-item:hover .el-icon),
    :deep(.el-sub-menu__title:hover .el-icon) {
      color: var(--app-sidebar-active-text);
    }

    :deep(.el-menu-item.is-active) {
      position: relative;
      background: var(--app-sidebar-active-bg) !important;
      color: var(--app-sidebar-active-text) !important;
      font-weight: 780;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }

    :deep(.el-menu-item.is-active::before) {
      content: "";
      position: absolute;
      left: 6px;
      top: 12px;
      bottom: 12px;
      width: 3px;
      border-radius: 999px;
      background: var(--app-primary-hover);
    }

    :deep(.el-menu-item.is-active .el-icon) {
      color: var(--app-sidebar-active-text);
    }

    :deep(.el-menu--inline) {
      background: transparent !important;
    }

    :deep(.el-sub-menu .el-menu-item) {
      height: 38px;
      margin-left: 16px;
      font-size: 13px;
    }
  }
</style>
