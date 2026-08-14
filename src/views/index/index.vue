<template>
  <ConsolePage
    class="dashboard-page"
    :title="T('Dashboard')"
    description="Monitor your RustDesk API console, server configuration, fleet inventory, and recent remote-access activity."
  >
    <template #actions>
      <el-button type="primary" @click="go('/user/peer')">
        <el-icon><Monitor /></el-icon>
        {{ T('Devices') }}
      </el-button>
      <el-button @click="openWebClient" :disabled="!webClientUrl">
        <el-icon><Link /></el-icon>
        Web Client
      </el-button>
    </template>

    <div class="dashboard-grid dashboard-grid--stats">
      <el-card v-for="stat in statCards" :key="stat.key" class="stat-card" shadow="never">
        <div class="stat-card__icon" :class="`is-${stat.tone}`">
          <el-icon><component :is="stat.icon" /></el-icon>
        </div>
        <div class="stat-card__body">
          <div class="stat-card__label">{{ stat.label }}</div>
          <div class="stat-card__value">{{ formatMetric(stat.value) }}</div>
          <div class="stat-card__hint">{{ stat.hint }}</div>
        </div>
      </el-card>
    </div>

    <div class="dashboard-grid dashboard-grid--main">
      <ConsoleTableCard title="Server Status" description="Runtime values exposed by the RustDesk API configuration endpoints." :scroll-x="false">
        <div class="status-list">
          <div v-for="item in serverStatus" :key="item.key" class="status-row">
            <div class="status-row__main">
              <div class="status-row__label">{{ item.label }}</div>
              <div class="status-row__value">{{ item.value || 'Not configured' }}</div>
            </div>
            <StatusBadge :type="item.ready ? 'success' : 'warning'" :label="item.ready ? 'Ready' : 'Missing'" />
          </div>
        </div>
      </ConsoleTableCard>

      <ConsoleTableCard title="Quick Setup" description="Common actions for a self-hosted RustDesk rollout." :scroll-x="false">
        <div class="setup-list">
          <button v-for="action in quickActions" :key="action.title" class="setup-action" type="button" @click="go(action.to)">
            <span class="setup-action__icon" :class="`is-${action.tone}`">
              <el-icon><component :is="action.icon" /></el-icon>
            </span>
            <span class="setup-action__copy">
              <span class="setup-action__title">{{ action.title }}</span>
              <span class="setup-action__description">{{ action.description }}</span>
            </span>
            <el-icon class="setup-action__arrow"><Right /></el-icon>
          </button>
        </div>
      </ConsoleTableCard>
    </div>

    <div class="dashboard-grid dashboard-grid--main">
      <ConsoleTableCard title="Recent Activity" description="Latest records from existing log endpoints. Data is shown only when your account has permission." :scroll-x="false">
        <div v-loading="loadingActivity" class="activity-list">
          <template v-if="activityItems.length">
            <div v-for="item in activityItems" :key="item.key" class="activity-row">
              <span class="activity-row__icon" :class="`is-${item.tone}`">
                <el-icon><component :is="item.icon" /></el-icon>
              </span>
              <div class="activity-row__content">
                <div class="activity-row__title">{{ item.title }}</div>
                <div class="activity-row__meta">{{ item.meta }}</div>
              </div>
              <div class="activity-row__time">{{ item.time }}</div>
            </div>
          </template>
          <EmptyState
            v-else
            compact
            title="No recent activity"
            description="Connection, file-transfer, and login logs will appear here when available."
            :icon="List"
          />
        </div>
      </ConsoleTableCard>

      <ConsoleTableCard title="Console Readiness" description="A deployment checklist based on official RustDesk Web Console concepts." :scroll-x="false">
        <div class="readiness-list">
          <div v-for="item in readinessItems" :key="item.title" class="readiness-row">
            <StatusBadge :type="item.ready ? 'success' : 'warning'" :label="item.ready ? 'Done' : 'Check'" />
            <div class="readiness-row__copy">
              <div class="readiness-row__title">{{ item.title }}</div>
              <div class="readiness-row__description">{{ item.description }}</div>
            </div>
          </div>
        </div>
      </ConsoleTableCard>
    </div>
  </ConsolePage>
</template>

<script setup>
  import { computed, markRaw, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { T } from '@/utils/i18n'
  import { useAppStore } from '@/store/app'
  import { ConsolePage, ConsoleTableCard, EmptyState, StatusBadge } from '@/components/console'
  import { list as userList } from '@/api/user'
  import { list as peerList } from '@/api/peer'
  import { list as oauthList } from '@/api/oauth'
  import { list as addressBookCollectionList } from '@/api/address_book_collection'
  import { list as connectionLogList, fileList as fileTransferLogList } from '@/api/audit'
  import { list as loginLogList } from '@/api/login_log'
  import { Collection, Connection, Files, Link, List, Monitor, Right, Setting, Tickets, User } from '@element-plus/icons-vue'

  const appStore = useAppStore()
  const router = useRouter()

  const counts = ref({
    users: null,
    devices: null,
    oauth: null,
    addressBooks: null,
  })
  const activityItems = ref([])
  const loadingActivity = ref(false)

  const go = (path) => {
    router.push(path)
  }

  const webClientUrl = computed(() => {
    const apiServer = appStore.setting.rustdeskConfig?.api_server
    if (!apiServer || !appStore.setting.appConfig?.web_client) {
      return ''
    }
    return `${apiServer}/webclient2/`
  })

  const openWebClient = () => {
    if (webClientUrl.value) {
      window.open(webClientUrl.value, '_blank', 'noopener,noreferrer')
    }
  }

  const statCards = computed(() => [
    {
      key: 'devices',
      label: T('Devices'),
      value: counts.value.devices,
      hint: 'Registered RustDesk clients',
      icon: markRaw(Monitor),
      tone: 'primary',
    },
    {
      key: 'users',
      label: T('Users'),
      value: counts.value.users,
      hint: 'Console and client accounts',
      icon: markRaw(User),
      tone: 'success',
    },
    {
      key: 'addressBooks',
      label: T('SharedAddressBooks'),
      value: counts.value.addressBooks,
      hint: 'Shared address book collections',
      icon: markRaw(Collection),
      tone: 'info',
    },
    {
      key: 'oauth',
      label: T('OAuthOIDC'),
      value: counts.value.oauth,
      hint: 'Configured identity providers',
      icon: markRaw(Link),
      tone: 'warning',
    },
  ])

  const serverStatus = computed(() => {
    const rustdesk = appStore.setting.rustdeskConfig || {}
    return [
      {
        key: 'api',
        label: 'API Server',
        value: rustdesk.api_server,
        ready: Boolean(rustdesk.api_server),
      },
      {
        key: 'id',
        label: 'ID Server',
        value: rustdesk.id_server,
        ready: Boolean(rustdesk.id_server),
      },
      {
        key: 'relay',
        label: 'Relay Server',
        value: rustdesk.relay_server,
        ready: Boolean(rustdesk.relay_server),
      },
      {
        key: 'webclient',
        label: 'Web Client',
        value: appStore.setting.appConfig?.web_client ? 'Enabled' : 'Disabled',
        ready: Boolean(appStore.setting.appConfig?.web_client),
      },
    ]
  })

  const readinessItems = computed(() => [
    {
      title: 'Server addresses configured',
      description: 'API, ID, and relay server values are available for RustDesk clients.',
      ready: serverStatus.value.slice(0, 3).every(item => item.ready),
    },
    {
      title: 'Web client available',
      description: 'Users can open remote sessions from the browser when enabled.',
      ready: Boolean(appStore.setting.appConfig?.web_client),
    },
    {
      title: 'Identity providers reviewed',
      description: 'OAuth / OIDC providers should match your RustDesk login policy.',
      ready: Number(counts.value.oauth || 0) > 0,
    },
    {
      title: 'Address books ready',
      description: 'Shared address books help users connect to known devices faster.',
      ready: Number(counts.value.addressBooks || 0) > 0,
    },
  ])

  const quickActions = [
    {
      title: T('Users'),
      description: 'Create accounts and assign user groups.',
      to: '/user/index',
      icon: markRaw(User),
      tone: 'success',
    },
    {
      title: T('Devices'),
      description: 'Review registered clients and ownership.',
      to: '/user/peer',
      icon: markRaw(Monitor),
      tone: 'primary',
    },
    {
      title: T('SharedAddressBooks'),
      description: 'Organize devices for one-click access.',
      to: '/user/addressBookName',
      icon: markRaw(Collection),
      tone: 'info',
    },
    {
      title: T('ServerControl'),
      description: 'Run supported server commands carefully.',
      to: '/serverCmd',
      icon: markRaw(Setting),
      tone: 'warning',
    },
  ]

  const formatMetric = (value) => {
    if (value === null || value === undefined) {
      return '—'
    }
    return Number(value).toLocaleString()
  }

  const firstListItem = (res) => {
    return res?.data?.list?.[0]
  }

  const getTotal = async (loader) => {
    const res = await loader({ page: 1, page_size: 1 }).catch(() => false)
    if (!res?.data) {
      return null
    }
    return res.data.total ?? res.data.list?.length ?? 0
  }

  const displayTime = (row) => {
    return row?.created_at || row?.close_time || row?.updated_at || '-'
  }

  const loadCounts = async () => {
    const [users, devices, oauth, addressBooks] = await Promise.all([
      getTotal(userList),
      getTotal(peerList),
      getTotal(oauthList),
      getTotal(addressBookCollectionList),
    ])
    counts.value = { users, devices, oauth, addressBooks }
  }

  const loadActivity = async () => {
    loadingActivity.value = true
    const [connRes, fileRes, loginRes] = await Promise.all([
      connectionLogList({ page: 1, page_size: 1 }).catch(() => false),
      fileTransferLogList({ page: 1, page_size: 1 }).catch(() => false),
      loginLogList({ page: 1, page_size: 1 }).catch(() => false),
    ])

    const items = []
    const conn = firstListItem(connRes)
    if (conn) {
      items.push({
        key: `conn-${conn.id}`,
        title: 'Remote connection',
        meta: `${conn.from_name || conn.from_peer || 'Unknown controller'} → ${conn.peer_id || 'Unknown device'}`,
        time: displayTime(conn),
        icon: markRaw(Connection),
        tone: 'primary',
      })
    }

    const file = firstListItem(fileRes)
    if (file) {
      items.push({
        key: `file-${file.id}`,
        title: 'File transfer',
        meta: `${file.from_name || file.from_peer || 'Unknown controller'} · ${file.path || file.file_name || file.peer_id || 'File activity'}`,
        time: displayTime(file),
        icon: markRaw(Files),
        tone: 'info',
      })
    }

    const login = firstListItem(loginRes)
    if (login) {
      items.push({
        key: `login-${login.id}`,
        title: 'Login event',
        meta: `${login.username || login?.user?.username || login.client || 'Unknown user'} · ${login.ip || login.platform || 'No client detail'}`,
        time: displayTime(login),
        icon: markRaw(Tickets),
        tone: 'success',
      })
    }

    activityItems.value = items
    loadingActivity.value = false
  }

  onMounted(() => {
    appStore.loadConfig()
    loadCounts()
    loadActivity()
  })
</script>

<style scoped lang="scss">
.dashboard-page {
  :deep(.console-page-header__description) {
    max-width: 820px;
  }
}

.dashboard-grid {
  display: grid;
  gap: 16px;
  margin-bottom: 16px;
}

.dashboard-grid--stats {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.dashboard-grid--main {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.stat-card {
  border: 1px solid var(--app-border) !important;
  border-radius: var(--app-radius-lg) !important;
  background: var(--app-surface) !important;
  box-shadow: var(--app-shadow-card) !important;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--app-primary-border) !important;
    box-shadow: var(--app-shadow-card-hover) !important;
  }

  :deep(.el-card__body) {
    display: flex;
    align-items: center;
    gap: 14px;
    min-height: 128px;
    padding: 18px;
  }
}

.stat-card__icon,
.activity-row__icon,
.setup-action__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  border-radius: 14px;
  color: var(--app-primary);
  background: var(--app-primary-soft);

  &.is-success {
    color: var(--app-success);
    background: var(--app-success-soft);
  }

  &.is-warning {
    color: var(--app-warning);
    background: var(--app-warning-soft);
  }

  &.is-info {
    color: var(--app-info);
    background: var(--app-info-soft);
  }
}

.stat-card__icon {
  width: 48px;
  height: 48px;
  font-size: 24px;
}

.stat-card__body {
  min-width: 0;
}

.stat-card__label {
  color: var(--app-text-muted);
  font-size: 13px;
  line-height: 1.35;
  font-weight: 760;
}

.stat-card__value {
  margin-top: 6px;
  color: var(--app-text);
  font-size: 30px;
  line-height: 1;
  font-weight: 820;
  letter-spacing: -0.035em;
}

.stat-card__hint {
  margin-top: 8px;
  color: var(--app-text-soft);
  font-size: 12px;
  line-height: 1.4;
}

.status-list,
.setup-list,
.activity-list,
.readiness-list {
  display: grid;
  gap: 0;
}

.status-row,
.activity-row,
.readiness-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--app-border);

  &:last-child {
    border-bottom: none;
  }
}

.status-row__main,
.activity-row__content,
.readiness-row__copy {
  min-width: 0;
  flex: 1;
}

.status-row__label,
.activity-row__title,
.readiness-row__title {
  color: var(--app-text);
  font-size: 14px;
  line-height: 1.35;
  font-weight: 760;
}

.status-row__value,
.activity-row__meta,
.readiness-row__description {
  margin-top: 3px;
  color: var(--app-text-muted);
  font-size: 12px;
  line-height: 1.45;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-row__value {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.setup-action {
  width: 100%;
  min-height: 72px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 0;
  border-bottom: 1px solid var(--app-border);
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.18s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--app-table-row-hover);
  }

  &:focus-visible {
    outline: none;
    box-shadow: inset var(--app-focus-ring);
  }
}

.setup-action__icon,
.activity-row__icon {
  width: 38px;
  height: 38px;
  font-size: 18px;
}

.setup-action__copy {
  min-width: 0;
  flex: 1;
  display: grid;
  gap: 3px;
}

.setup-action__title {
  color: var(--app-text);
  font-size: 14px;
  font-weight: 760;
}

.setup-action__description {
  color: var(--app-text-muted);
  font-size: 12px;
  line-height: 1.45;
}

.setup-action__arrow {
  color: var(--app-text-soft);
}

.activity-row__time {
  flex: none;
  max-width: 150px;
  color: var(--app-text-soft);
  font-size: 12px;
  text-align: right;
}

@media (max-width: 1200px) {
  .dashboard-grid--stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .dashboard-grid--main {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .dashboard-grid--stats {
    grid-template-columns: 1fr;
  }

  .status-row,
  .activity-row,
  .readiness-row,
  .setup-action {
    padding: 12px;
  }

  .activity-row {
    align-items: flex-start;
  }

  .activity-row__time {
    max-width: none;
    text-align: left;
  }
}
</style>
