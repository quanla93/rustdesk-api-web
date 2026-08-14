<template>
  <el-scrollbar class="scroll-sidebar" height="100vh">
    <div class="sidebar-inner" :class="{ 'is-collapsed': setting.sideIsCollapse }">
      <div class="sidebar-brand">
        <img :src="setting.logo" alt="" class="sidebar-brand__logo">
        <div class="sidebar-brand__copy">
          <div class="sidebar-brand__title">{{ setting.title }}</div>
          <div class="sidebar-brand__subtitle">Web Console</div>
        </div>
      </div>
      <menus></menus>
    </div>
  </el-scrollbar>
</template>
<script setup>
  import Menus from '@/layout/components/menu/index.vue'
  import { computed } from 'vue'
  import { useAppStore } from '@/store/app'

  const appStore = useAppStore()
  const setting = computed(() => appStore.setting)
</script>

<style scoped lang="scss">
.scroll-sidebar {
  background:
    radial-gradient(circle at 20% 0%, rgba(1, 97, 239, 0.24), transparent 16rem),
    linear-gradient(180deg, #101827 0%, var(--app-sidebar-bg) 100%);
}

.sidebar-inner {
  min-height: 100vh;
  padding: 12px 0 10px;
}

.sidebar-brand {
  min-height: 56px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 10px 10px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.sidebar-brand__logo {
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 11px;
  filter: drop-shadow(0 10px 20px rgba(1, 97, 239, 0.3));
}

.sidebar-brand__copy {
  min-width: 0;
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.sidebar-brand__title {
  color: #fff;
  font-size: 14px;
  line-height: 1.25;
  font-weight: 800;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-brand__subtitle {
  margin-top: 2px;
  color: var(--app-sidebar-muted);
  font-size: 11px;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sidebar-inner.is-collapsed {
  .sidebar-brand {
    justify-content: center;
    margin-inline: 8px;
    padding-inline: 8px;
  }

  .sidebar-brand__copy {
    width: 0;
    opacity: 0;
    transform: translateX(-4px);
    pointer-events: none;
  }
}
</style>
