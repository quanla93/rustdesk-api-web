<template>
  <el-scrollbar class="scroll-sidebar" height="100vh">
    <div class="sidebar-inner">
      <menus></menus>
    </div>
  </el-scrollbar>
</template>
<script>
  import Menus from '@/layout/components/menu/index.vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'GAside',
    components: { Menus },
  })
</script>

<style scoped lang="scss">
.scroll-sidebar {
  background:
    radial-gradient(circle at 20% 0%, rgba(37, 99, 235, 0.2), transparent 16rem),
    var(--app-sidebar-bg);
}

.sidebar-inner {
  min-height: 100vh;
  padding: 8px 0;
}
</style>
