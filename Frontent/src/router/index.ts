import { createRouter, createWebHistory } from 'vue-router'

import FullLayout from '@layouts/fullLayout.vue'

export const asyncRouterMap = [
  {
    path: '/login',
    name: 'loginP',
    hidden: true,
    component: FullLayout,
    children: [{ name: 'login', path: '', component: () => import('@views/login/Login.vue') }],
    meta: { editable: true, layout: 'full', menulog: 'N' }
  },
  {
    path: '/',
    name: 'main',
    hidden: true,
    component: () => import('@views/main/index.vue'),
    meta: { editable: true, menulog: 'N', layout: 'default' }
  },
  /** When your routing table is too long, you can split it into small modules**/
  {
    path: '/404',
    name: '404P',
    hidden: true,
    component: FullLayout,
    children: [{ name: '404', path: '', component: () => import('@views/error/404.vue') }],
    meta: { editable: true, layout: 'full', menulog: 'N' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: asyncRouterMap
})

export function addAuthRouter(authRouters: Array<any>) {
  const forEachData = _.filter(authRouters, (item) => {
    return _.findIndex(router.getRoutes(), { name: item.name }) === -1
  })
  _.forEach(forEachData, (menuInfo) => {
    router.addRoute(menuInfo)
  })
}

export default router
