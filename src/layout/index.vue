<template>
  <el-config-provider :locale="appStore.setting.locale.value">
    <el-container class="app-shell" :style="{'--sideBarWidth': sideBarWidth}">
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
  const leftWidth = computed(() => appStore.setting.sideIsCollapse ? '64px' : 'var(--sideBarWidth)')

  const cachedTags = ref([])

  cachedTags.value = tagStore.cached
</script>

<style lang="scss" scoped>
.app-shell {
  min-height: 100vh;
  background: var(--app-bg);
}

.app-header {
  height: 58px;
  display: flex;
  align-items: center;
  padding: 0 18px;
  border-bottom: 1px solid var(--app-header-border);
  background: var(--app-header-bg);
  color: var(--app-header-text);
  backdrop-filter: blur(18px);
  box-shadow: 0 1px 0 rgba(15, 23, 42, 0.03);
}

.header-tags {
  min-height: 46px;
  display: flex;
  align-items: center;
  padding: 8px 14px;
  border-bottom: 1px solid var(--app-border);
  background: var(--app-surface);
  overflow-x: auto;
}

.app-left {
  transition: width 0.28s ease;
  background: var(--app-sidebar-bg);
  box-shadow: 10px 0 30px rgba(15, 23, 42, 0.08);
  z-index: 2;
}

.app-container {
  min-height: 100vh;
  background:
    radial-gradient(circle at 100% 0%, rgba(37, 99, 235, 0.06), transparent 24rem),
    var(--app-bg);
}

.app-main {
  padding: var(--app-content-padding);
  overflow-x: auto;
}

@media (max-width: 768px) {
  .app-header {
    height: 54px;
    padding: 0 12px;
  }

  .header-tags {
    padding: 7px 10px;
  }
}
</style>
