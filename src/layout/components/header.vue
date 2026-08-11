<template>
  <el-icon class="ex-icon" @click="expandOrFoldSlider">
    <el-icon-expand v-if="setting.sideIsCollapse"></el-icon-expand>
    <el-icon-fold v-else></el-icon-fold>
  </el-icon>
  <div class="header-logo">
    <img :src="setting.logo" alt="" class="logo">
    <div class="title">{{setting.title}}</div>
  </div>
  <Setting></Setting>
</template>

<script>
  import { defineComponent, computed } from 'vue'
  import HeaderMenu from '@/layout/components/menu/index.vue'
  import Setting from '@/layout/components/setting/index.vue'
  import { useAppStore } from '@/store/app'
  import GTags from '@/layout/components/tags/index.vue'

  export default defineComponent({
    name: 'LayerHeader',
    created () {
    },
    components: { HeaderMenu, Setting, GTags },
    watch: {},
    setup (props) {
      const appStore = useAppStore()
      const setting = computed(() => appStore.setting)
      const expandOrFoldSlider = () => {
        appStore.sideCollapse()
      }
      return {
        setting,
        expandOrFoldSlider,
      }
    },

  })
</script>

<style scoped lang="scss">
  .ex-icon {
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    border-radius: 999px;
    color: var(--app-text-muted);
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.18s ease, color 0.18s ease;

    &:hover {
      background: var(--app-surface-muted);
      color: var(--el-color-primary);
    }
  }

  .header-logo {
    display: flex;
    height: 100%;
    align-items: center;
    min-width: 0;

    .title {
      display: block;
      margin-left: 10px;
      color: var(--app-header-text);
      font-size: 16px;
      font-weight: 750;
      letter-spacing: -0.01em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .logo {
      display: block;
      width: 32px;
      height: 32px;
      border-radius: 10px;
      filter: drop-shadow(0 8px 18px rgba(37, 99, 235, 0.22));
    }
  }
</style>
<style lang="scss">
</style>
