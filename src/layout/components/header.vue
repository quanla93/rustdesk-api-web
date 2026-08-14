<template>
  <el-icon class="ex-icon" @click="expandOrFoldSlider">
    <el-icon-expand v-if="setting.sideIsCollapse"></el-icon-expand>
    <el-icon-fold v-else></el-icon-fold>
  </el-icon>
  <div class="header-context">
    <div class="header-context__eyebrow">RustDesk Console</div>
    <div class="header-context__title">{{ pageTitle }}</div>
  </div>
  <Setting></Setting>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import Setting from '@/layout/components/setting/index.vue'
  import { useAppStore } from '@/store/app'
  import { T } from '@/utils/i18n'

  const appStore = useAppStore()
  const route = useRoute()
  const setting = computed(() => appStore.setting)
  const pageTitle = computed(() => T(route.meta?.title) || T(route.name) || setting.value.title)
  const expandOrFoldSlider = () => {
    appStore.sideCollapse()
  }
</script>

<style scoped lang="scss">
.ex-icon {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;
  border: 1px solid var(--app-border);
  border-radius: 999px;
  background: var(--app-surface);
  color: var(--app-text-muted);
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    border-color: var(--app-primary-border);
    background: var(--app-primary-soft);
    color: var(--app-primary);
  }

  &:focus-visible {
    box-shadow: var(--app-focus-ring);
  }
}

.header-context {
  min-width: 0;
}

.header-context__eyebrow {
  color: var(--app-text-soft);
  font-size: 11px;
  line-height: 1.2;
  font-weight: 760;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.header-context__title {
  margin-top: 2px;
  color: var(--app-header-text);
  font-size: 17px;
  line-height: 1.25;
  font-weight: 780;
  letter-spacing: -0.015em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .ex-icon {
    width: 34px;
    height: 34px;
    margin-right: 10px;
  }

  .header-context__eyebrow {
    display: none;
  }

  .header-context__title {
    font-size: 15px;
  }
}
</style>
