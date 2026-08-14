import { createRouter, createWebHashHistory } from 'vue-router'

const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: 'Login' },
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: { title: 'Register' },
    component: () => import('@/views/register/index.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true,
  },
  {
    path: '/oauth/:code',
    meta: { title: 'OauthLogin' },
    component: () => import('@/views/oauth/login.vue'),
    hidden: true,
  },
  {
    path: '/oauth/bind/:code',
    meta: { title: 'OauthBind' },
    component: () => import('@/views/oauth/bind.vue'),
    hidden: true,
  },
]
export const asyncRoutes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/Home',
    meta: { title: 'Dashboard', icon: 'House' },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/Home',
        name: 'Home',
        meta: { title: 'Dashboard', icon: 'House' },
        component: () => import('@/views/index/index.vue'),
      },
    ],
  },
  {
    path: '/my',
    name: 'My',
    redirect: '/',
    meta: { title: 'MyWorkspace', icon: 'UserFilled' },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'MyInfo',
        meta: { title: 'Profile', icon: 'User' /*keepAlive: true*/ },
        component: () => import('@/views/my/info.vue'),
      },
      {
        path: 'peer',
        name: 'MyPeer',
        meta: { title: 'MyDevices', icon: 'Monitor' /*keepAlive: true*/ },
        component: () => import('@/views/my/peer/index.vue'),
      },
      {
        path: 'address_book_collection',
        name: 'MyAddressBookCollection',
        meta: { title: 'MyAddressBooks', icon: 'Collection' /*keepAlive: true*/ },
        component: () => import('@/views/my/address_book/collection.vue'),
      },
      {
        path: 'address_book',
        name: 'MyAddressBookList',
        meta: { title: 'MyAddressBookDevices', icon: 'Notebook' /*keepAlive: true*/ },
        component: () => import('@/views/my/address_book/index.vue'),
      },
      {
        path: 'tag',
        name: 'MyTagList',
        meta: { title: 'MyTags', icon: 'CollectionTag' /*keepAlive: true*/ },
        component: () => import('@/views/my/tag/index.vue'),
      },
      {
        path: 'shareRecord',
        name: 'MyShareRecordList',
        meta: { title: 'SharedRecords', icon: 'Share' /*keepAlive: true*/ },
        component: () => import('@/views/my/share_record/index.vue'),
      },
      {
        path: 'loginLog',
        name: 'MyLoginLog',
        meta: { title: 'LoginLogs', icon: 'List' /*keepAlive: true*/ },
        component: () => import('@/views/my/login_log/index.vue'),
      },
    ],
  },
  {
    path: '/user',
    name: 'User',
    redirect: '/user/index',
    meta: { title: 'Administration', icon: 'Setting' },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'peer',
        name: 'Peer',
        meta: { title: 'Devices', icon: 'Monitor' /*keepAlive: true*/ },
        component: () => import('@/views/peer/index.vue'),
      },
      {
        path: 'group',
        name: 'UserGroup',
        meta: { title: 'UserGroups', icon: 'ChatRound' /*keepAlive: true*/ },
        component: () => import('@/views/group/index.vue'),
      },
      {
        path: 'deviceGroup',
        name: 'DeviceGroup',
        meta: { title: 'DeviceGroups', icon: 'ChatRound' /*keepAlive: true*/ },
        component: () => import('@/views/group/deviceGroupList.vue'),
      },
      {
        path: 'index',
        name: 'UserList',
        meta: { title: 'Users', icon: 'User' /*keepAlive: true*/ },
        component: () => import('@/views/user/index.vue'),
      },
      {
        path: 'add',
        name: 'UserAdd',
        meta: { title: 'AddUser', hide: true },
        component: () => import('@/views/user/edit.vue'),
      },
      {
        path: 'edit/:id',
        name: 'UserEdit',
        meta: { title: 'EditUser', hide: true },
        component: () => import('@/views/user/edit.vue'),
      },
      {
        path: 'addressBookName',
        name: 'UserAddressBookName',
        meta: { title: 'SharedAddressBooks', icon: 'Collection' /*keepAlive: true*/ },
        component: () => import('@/views/address_book/collection.vue'),
      },
      {
        path: 'addressBook',
        name: 'UserAddressBook',
        meta: { title: 'AddressBookDevices', icon: 'Notebook' /*keepAlive: true*/ },
        component: () => import('@/views/address_book/index.vue'),
      },
      {
        path: 'tag',
        name: 'UserTag',
        meta: { title: 'Tags', icon: 'CollectionTag' /*keepAlive: true*/ },
        component: () => import('@/views/tag/index.vue'),
      },
      {
        path: '/oauth',
        name: 'Oauth',
        meta: { title: 'OAuthOIDC', icon: 'Link' /*keepAlive: true*/ },
        component: () => import('@/views/oauth/index.vue'),
      },
      {
        path: '/userToken',
        name: 'UserToken',
        meta: { title: 'ApiTokens', icon: 'Ticket' /*keepAlive: true*/ },
        component: () => import('@/views/user/token.vue'),
      },
      {
        path: '/loginLog',
        name: 'LoginLog',
        meta: { title: 'LoginLogs', icon: 'List' /*keepAlive: true*/ },
        component: () => import('@/views/login/log.vue'),
      },
      {
        path: '/auditConn',
        name: 'AuditConn',
        meta: { title: 'ConnectionLogs', icon: 'Tickets' /*keepAlive: true*/ },
        component: () => import('@/views/audit/connList.vue'),
      },
      {
        path: '/auditFile',
        name: 'AuditFile',
        meta: { title: 'FileTransferLogs', icon: 'Files' /*keepAlive: true*/ },
        component: () => import('@/views/audit/fileList.vue'),
      },
      {
        path: '/shareRecord',
        name: 'ShareRecord',
        meta: { title: 'SharedRecords', icon: 'Share' /*keepAlive: true*/ },
        component: () => import('@/views/share_record/index.vue'),
      },
      {
        path: '/serverCmd',
        name: 'ServerCmd',
        meta: { title: 'ServerControl', icon: 'Tools' /*keepAlive: true*/ },
        component: () => import('@/views/rustdesk/control.vue'),
      },
    ],
  },
]
export const lastRoutes = [
  { path: '/:catchAll(.*)', redirect: '/404', meta: { hide: true } },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

