<template>
  <el-config-provider :locale="appStore.setting.locale.value">
    <el-container
      class="app-shell"
      :class="{ 'is-sidebar-collapsed': appStore.setting.sideIsCollapse }"
      :style="{'--sideBarWidth': sideBarWidth}"
    >
      <el-aside :width="leftWidth" class="app-left">
        <g-aside></g-aside>
      </el-aside>
      <el-container class="app-container">
        <el-header class="app-header">
          <g-header></g-header>
        </el-header>
        <div class="header-tags">
          <tags></tags>
        </div>

        <el-main class="app-main">
          <router-view v-slot="{ Component }">
            <transition mode="out-in" name="el-fade-in-linear">
              <keep-alive :include="cachedTags">
                <component :is="Component"/>
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script setup>
  import { useAppStore } from '@/store/app'
  import { useTagsStore } from '@/store/tags'
  import { ref, computed } from 'vue'
  import Tags from '@/layout/components/tags/index.vue'
  import GAside from '@/layout/components/aside.vue'
  import GHeader from '@/layout/components/header.vue'

  const appStore = useAppStore()
  const tagStore = useTagsStore()
  const sideBarWidth = computed(() => appStore.setting.locale.sideBarWidth)
  const leftWidth = computed(() => appStore.setting.sideIsCollapse ? '72px' : 'var(--sideBarWidth)')

  const cachedTags = ref([])

  cachedTags.value = tagStore.cached
</script>

<style lang="scss" scoped>
.app-shell {
  min-height: 100vh;
  color: var(--app-text);
  background:
    radial-gradient(circle at 100% 0%, rgba(1, 97, 239, 0.08), transparent 24rem),
    linear-gradient(180deg, var(--app-bg) 0%, var(--app-bg-soft) 100%);
}

.app-left {
  height: 100vh;
  position: sticky;
  top: 0;
  flex: none;
  transition: width 0.24s ease;
  background: var(--app-sidebar-bg);
  box-shadow: 12px 0 34px rgba(16, 24, 39, 0.14);
  z-index: 10;
}

.app-container {
  min-width: 0;
  min-height: 100vh;
  background: transparent;
}

.app-header {
  height: 62px;
  position: sticky;
  top: 0;
  z-index: 8;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid var(--app-header-border);
  background: var(--app-header-bg);
  color: var(--app-header-text);
  -webkit-backdrop-filter: blur(18px);
  backdrop-filter: blur(18px);
  box-shadow: 0 1px 0 rgba(16, 24, 39, 0.03);
}

.header-tags {
  min-height: 44px;
  position: sticky;
  top: 62px;
  z-index: 7;
  display: flex;
  align-items: center;
  padding: 7px 18px;
  border-bottom: 1px solid var(--app-border);
  background: color-mix(in srgb, var(--app-surface) 92%, transparent);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  overflow-x: auto;
}

.app-main {
  min-width: 0;
  padding: var(--app-content-padding);
  overflow-x: auto;
}

@media (max-width: 1024px) {
  .app-shell {
    --sideBarWidth: 220px;
  }

  .app-header {
    padding: 0 16px;
  }
}

@media (max-width: 768px) {
  .app-left {
    width: 72px !important;
  }

  .app-header {
    height: 56px;
    padding: 0 12px;
  }

  .header-tags {
    top: 56px;
    min-height: 40px;
    padding: 6px 10px;
  }

  .app-main {
    padding: 12px;
  }
}
</style>
