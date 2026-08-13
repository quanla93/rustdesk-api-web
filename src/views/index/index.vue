<template>
  <div class="dashboard-page">
    <el-row :gutter="20" class="stat-cards">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="stat in stats" :key="stat.title">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" :style="{ backgroundColor: stat.color + '22', color: stat.color }">
            <el-icon><component :is="stat.icon" /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-title">{{ T(stat.title) }}</div>
            <div class="stat-value">{{ stat.value }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="dashboard-sections">
      <el-col :xs="24" :lg="12">
        <el-card shadow="hover" class="dashboard-card">
          <template #header>
            <div class="card-header">
              <span>{{ T('Quick Actions') }}</span>
            </div>
          </template>
          <div class="action-grid">
            <el-button type="primary" plain class="action-btn" @click="$router.push('/user/index')">
              <el-icon><User /></el-icon>
              <span>{{ T('Users') }}</span>
            </el-button>
            <el-button type="primary" plain class="action-btn" @click="$router.push('/user/peer')">
              <el-icon><Monitor /></el-icon>
              <span>{{ T('Peers') }}</span>
            </el-button>
            <el-button type="success" plain class="action-btn" @click="$router.push('/user/addressBookName')">
              <el-icon><Collection /></el-icon>
              <span>{{ T('Address Books') }}</span>
            </el-button>
            <el-button type="info" plain class="action-btn" @click="$router.push('/loginLog')">
              <el-icon><List /></el-icon>
              <span>{{ T('Login Logs') }}</span>
            </el-button>
            <el-button type="warning" plain class="action-btn" @click="$router.push('/serverCmd')">
              <el-icon><Tools /></el-icon>
              <span>{{ T('Server Cmd') }}</span>
            </el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :lg="12">
        <el-card shadow="hover" class="dashboard-card">
          <template #header>
            <div class="card-header">
              <span>{{ T('System Info') }}</span>
            </div>
          </template>
          <div class="info-list">
            <div class="info-item">
              <span class="info-label">{{ T('Web Client') }}</span>
              <el-tag :type="appStore.setting.appConfig.web_client ? 'success' : 'info'" size="small">
                {{ appStore.setting.appConfig.web_client ? T('Enabled') : T('Disabled') }}
              </el-tag>
            </div>
            <div class="info-item">
              <span class="info-label">{{ T('API Server') }}</span>
              <span class="info-value">{{ appStore.setting.rustdeskConfig.api_server || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">{{ T('ID Server') }}</span>
              <span class="info-value">{{ appStore.setting.rustdeskConfig.id_server || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">{{ T('Relay Server') }}</span>
              <span class="info-value">{{ appStore.setting.rustdeskConfig.relay_server || '-' }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { T } from '@/utils/i18n'
  import { useAppStore } from '@/store/app'
  import { User, Monitor, Collection, List, Tools } from '@element-plus/icons-vue'
  import { list as userList } from '@/api/user'
  import { list as peerList } from '@/api/peer'
  import { list as oauthList } from '@/api/oauth'

  const appStore = useAppStore()

  const stats = ref([
    { title: 'UserManage', value: '-', icon: 'User', color: 'var(--el-color-primary)' },
    { title: 'PeerManage', value: '-', icon: 'Monitor', color: 'var(--el-color-success)' },
    { title: 'OauthManage', value: '-', icon: 'Link', color: 'var(--el-color-warning)' },
  ])

  const loadStats = async () => {
    // Note: This fetches page 1 just to get the total counts since there is no dedicated dashboard API yet
    const uRes = await userList({ page: 1, page_size: 1 }).catch(() => false)
    if (uRes && uRes.data) {
      stats.value[0].value = uRes.data.total || 0
    }

    const pRes = await peerList({ page: 1, page_size: 1 }).catch(() => false)
    if (pRes && pRes.data) {
      stats.value[1].value = pRes.data.total || 0
    }

    const oRes = await oauthList({ page: 1, page_size: 1 }).catch(() => false)
    if (oRes && oRes.data) {
      stats.value[2].value = oRes.data.total || 0
    }
  }

  onMounted(() => {
    // Only load admin stats if user has permission
    if (appStore.setting.appConfig) {
      loadStats()
    }
  })
</script>

<style scoped lang="scss">
.dashboard-page {
  padding: 10px 0;
}

.stat-cards {
  margin-bottom: 20px;
}

.stat-card {
  border-radius: var(--app-radius-md);
  border: 1px solid var(--app-border);
  background: var(--app-surface);
  margin-bottom: 20px;

  :deep(.el-card__body) {
    display: flex;
    align-items: center;
    padding: 24px;
    gap: 20px;
  }
}

.stat-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--app-radius-md);
  font-size: 26px;
}

.stat-content {
  flex: 1;
}

.stat-title {
  color: var(--app-text-muted);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

.stat-value {
  color: var(--app-text);
  font-size: 28px;
  font-weight: 750;
  line-height: 1;
}

.dashboard-card {
  border-radius: var(--app-radius-lg);
  border: 1px solid var(--app-border);
  height: 100%;

  .card-header {
    font-weight: 650;
    font-size: 16px;
  }
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

.action-btn {
  height: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 !important;

  .el-icon {
    font-size: 24px;
  }

  span {
    font-weight: 600;
  }
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--app-border);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}

.info-label {
  color: var(--app-text-muted);
  font-weight: 600;
}

.info-value {
  color: var(--app-text);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  background: var(--app-surface-muted);
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid var(--app-border);
}
</style>
