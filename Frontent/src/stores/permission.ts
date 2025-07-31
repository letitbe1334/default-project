/* @vite-ignore */
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

import { useAuth } from '@/composable/auth'
const { getAccessToken } = useAuth()
import { asyncRouterMap, addAuthRouter } from '@/router'

interface urlData {
  url: string
  paramUrl: string
  params: Record<string, string>
}

interface menuApiData {
  /** api info */
  sysMenuId?: string
  upMenuId: string
  sortOrder: number
}

interface responseMenuData extends menuApiData {
  /** use menu info */
  title: string | undefined
  menuNm: string
  menuIcon: stringNull
  manualFlag: string
  userWriteFlag: string
  menuViewMethod: stringNull
  icon: string
  name: string
  href: string
  url: string
  header?: string
  menuLvl: string
  manual: boolean
  params?: Record<string, string>
  children?: Array<menuData>
}

interface menuData extends menuApiData {
  /** use menu info */
  title: string | undefined
  icon: string
  name: string
  href: string
  url: string
  header?: string
  menuLvl: string
  manual: boolean
  params?: Record<string, string>
  children?: Array<menuData>
}

interface accessMenu extends menuApiData {
  /** use menu info */
  title: string
  name: string
  href: string
  url: string
  menuLvl: string
  menuViewMethod: string
  manual: boolean
  editable: boolean
  params?: Record<string, string>
}

interface metaData {
  title: string | undefined
  manual: boolean
  editable: boolean
  params?: Record<string, string>
  layout?: stringNull
}

export interface accessRouterData {
  path: string
  name: string
  meta?: metaData
  component?: Component
  children?: accessRouterData[]
}

const fetchMenus = async (empNo: string): Promise<Array<responseMenuData>> => {
  const response = await axios.get<userType>(selectConfig.sys.userMenu.get.url + empNo, {
    headers: {
      'Cache-Control': 'no-cache',
      'X-Authorization': getAccessToken()
    },
    baseURL: import.meta.env.VITE_API_URL,
    params: {
      lang: getLang(),
      deviceTypeCd: 'P'
    }
  })
  return response.data
}

export const usePermissionStore = defineStore('permission', () => {
  /** userStore 호출 */
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  const route = useRoute()
  const router = useRouter()

  const routers = ref<Array<menuData>>([])
  const addRouters = ref<Array<accessRouterData>>([])
  const allMenus = ref<Array<menuData>>([])
  const openMenus = ref<Array<string>>([])

  /** vue-query 정보 */
  const menuVueQuery = ref({
    isStale: true,
    isFetching: true,
    refetch: null as (() => void) | null
  })
  const menuQuery = useQuery({
    queryKey: ['authMenus'],
    queryFn: () => fetchMenus(user.value.empNo),
    staleTime: 3 * 60 * 60 * 1000, // 3시간 동안 fresh 상태 유지
    refetchOnWindowFocus: true, // 사용자가 다시 창을 보면 자동 새로고침
    refetchOnReconnect: true, // 인터넷 연결이 다시 되면 자동 새로고침
    enabled: !!getAccessToken() && !!user.value.empNo
  })

  watchEffect(() => {
    if (user.value.empNo && menuVueQuery.value.refetch) {
      menuVueQuery.value.refetch()
    }
  })

  watchEffect(() => {
    if (menuQuery.isSuccess.value) {
      allMenus.value = menuQuery.data.value!
      menuVueQuery.value.isStale = false // fresh한 상태로 변경

      /** 화면 표시 메뉴 셋팅 */
      const menus: menuData[] = _.map(menuQuery.data.value!, (item) => {
        const urlInfo = getUrlData(item.url)
        return {
          title: item.menuNm,
          icon: item.menuIcon,
          name: item.sysMenuId!,
          href: urlInfo.url ? `${urlInfo.url}${urlInfo.paramUrl}` : '',
          url: urlInfo.url,
          header: '',
          menuLvl: item.menuLvl,
          manual: item.manualFlag === 'Y' ? true : false,
          params: urlInfo.params,
          child: [],
          upMenuId: item.upMenuId,
          sortOrder: item.sortOrder
        }
      })
      const viewRouters = createLeftMenu(menus, menus, 0, '')
      routers.value = viewRouters

      /** 접근권한 있는 메뉴 셋팅 */
      const accessMenus: accessMenu[] = _.map(menuQuery.data.value!, (item) => {
        const urlInfo = getUrlData(item.url)
        return {
          title: item.menuNm,
          name: item.sysMenuId!,
          href: urlInfo.url ? `${urlInfo.url}${urlInfo.paramUrl}` : '',
          url: urlInfo.url,
          menuLvl: item.menuLvl,
          menuViewMethod: item.menuViewMethod,
          manual: item.manualFlag === 'Y' ? true : false,
          editable: item.userWriteFlag === 'Y' ? true : false,
          params: urlInfo.params,
          upMenuId: item.upMenuId,
          sortOrder: item.sortOrder
        }
      })
      const accessedRouters = getAccessRouters(accessMenus)
      addRouters.value = accessedRouters

      addAuthRouter(addRouters.value)
    }
  })
  watch(
    () => menuQuery.isFetching.value,
    () => {
      if (!menuQuery.isFetching.value) {
        menuVueQuery.value.isFetching = false

        /** menu redirecting */
        router
          .push({
            path: route.fullPath || user.value.url
          })
          .catch(() => {})
      }
    }
  )

  menuVueQuery.value.isFetching = menuQuery.isFetching.value
  menuVueQuery.value.isStale = menuQuery.isStale.value
  menuVueQuery.value.refetch = menuQuery.refetch

  function findOpenMenus(name: string, selfOpen?: boolean) {
    openMenus.value = [] // 초기화
    if (name && allMenus.value && allMenus.value.length > 0) {
      const currentMenu: menuData = _.find(allMenus.value, { sysMenuId: name }) as menuData
      if (currentMenu && currentMenu.upMenuId) {
        findUpMenu(currentMenu.upMenuId)
      }

      if (selfOpen) {
        openMenus.value.push(currentMenu.sysMenuId!)
      }
    } else {
      openMenus.value = []
    }
  }
  function findUpMenu(upMenuId: string) {
    const upMenu: menuData = _.find(allMenus.value, {
      sysMenuId: upMenuId
    }) as menuData
    if (upMenu) {
      openMenus.value.push(upMenu.sysMenuId!)
      findUpMenu(upMenu.upMenuId)
    } else {
      return
    }
  }

  function createLeftMenu(
    _Allmenus: Array<menuData>,
    _menus: Array<menuData>,
    menuLevel: number,
    navi: string
  ) {
    let menuLevel1 = _.filter(_menus, {
      menuLvl: menuLevel.toString()
    })
    _.forEach(menuLevel1, (menu) => {
      menu.sortOrder = menu.sortOrder ? (!isNaN(menu.sortOrder) ? Number(menu.sortOrder) : 0) : 0
    })
    menuLevel1 = _.orderBy(menuLevel1, ['sortOrder'], ['asc'])

    const returnMenu: Array<menuData> = []
    let subLevel = []
    _.forEach(menuLevel1, (menu) => {
      subLevel = _.filter(_Allmenus, {
        menuLvl: String(menuLevel + 1),
        upMenuId: menu.name
      })

      const menuInfo: menuData = {
        title: menu.title,
        icon: menu.icon,
        name: menu.name,
        menuLvl: menu.menuLvl,
        href: menu.href,
        url: menu.url,
        header: menu.url === null || menu.url === '' ? '' : 'generic',
        manual: menu.manual,
        params: menu.params,
        children: [],
        /** api info */
        upMenuId: menu.upMenuId,
        sortOrder: menu.sortOrder
      }

      if (subLevel && subLevel.length > 0) {
        menuInfo.children = createLeftMenu(
          _Allmenus,
          subLevel,
          menuLevel + 1,
          navi ? navi + ' > ' + String(menu.title) : String(menu.title)
        )
      }
      returnMenu.push(menuInfo)
    })
    /** LEFT 메뉴(권한이 있는 메뉴) setting */
    if (menuLevel === 0) {
      _.forEach(asyncRouterMap, (item) => {
        if (_.findIndex(returnMenu, { name: item.name }) === -1 && !item.hidden) {
          returnMenu.splice(0, 0, {
            title: '',
            icon: '',
            name: item.name,
            menuLvl: '0',
            href: item.path,
            url: '',
            manual: false,
            params: {},
            children: [],
            upMenuId: '',
            sortOrder: 0
          })
        }
      })
    }
    return returnMenu
  }

  function getAccessRouters(_menus: Array<accessMenu>) {
    const accessRouters: accessRouterData[] = []
    const haveUrlMenus = _.filter(_menus, (item) => {
      return Boolean(item.url)
    })

    _.forEach(asyncRouterMap, (router) => {
      accessRouters.push({
        path: router.path,
        name: router.name,
        meta: {
          title: '',
          // layout: router.meta?.layout,
          manual: false,
          // 권한 처리 되고 난 후에 해당 로직 처리
          editable: Boolean(router.meta.editable), // menu.writeYn === 'Y' ? true : false,
          params: {},
          layout: router?.meta?.layout || 'default'
        },
        component: router.component
      })
    })

    if (haveUrlMenus) {
      let subLevel: accessMenu[] = []
      _.forEach(haveUrlMenus, (menu) => {
        subLevel = _.filter(_menus, {
          menuLvl: String(parseInt(menu.menuLvl) + 1),
          upMenuId: menu.name
        })

        accessRouters.push({
          path: menu.href,
          name: `${menu.name}`,
          meta: {
            title: menu.title,
            manual: menu.manual,
            // 권한 처리 되고 난 후에 해당 로직 처리
            editable: menu.editable, // menu.writeYn === 'Y' ? true : false,
            params: menu.params,
            layout: 'default'
          },
          component: getComponet(subLevel, menu.url)
        })
      })
    }

    return accessRouters
  }

  function getComponet(subLevel: Array<accessMenu>, frontEndUrl: string) {
    let componet
    if (!frontEndUrl) {
      // url은 최하단, 즉 화면에 표시할 수 있는 url이 있는 경우에만 존재
      componet = undefined
    } else if (subLevel && subLevel.length > 0 && frontEndUrl) {
      // 하위 메뉴가 존재하는데 url이 있을 시 component는 null 처리하여 메뉴 클릭시 혼돈이 없게 처리
      componet = undefined
    } else {
      const directoryPaths = _.split(frontEndUrl, '/')
      /** 제일 처음 빈 공간 제거 */
      directoryPaths.shift()
      let componentData = undefined
      if (directoryPaths && directoryPaths.length > 0) {
        switch (directoryPaths.length) {
          case 1:
            componentData = shallowRef(() => import(`../views/${directoryPaths[0]}.vue`))
            break
          case 2:
            componentData = shallowRef(
              () => import(`../views/${directoryPaths[0]}/${directoryPaths[1]}.vue`)
            )
            break
          case 3:
            componentData = shallowRef(
              () =>
                import(
                  `../views/${directoryPaths[0]}/${directoryPaths[1]}/${directoryPaths[2]}.vue`
                )
            )
            break
          case 4:
            componentData = shallowRef(
              () =>
                import(
                  `../views/${directoryPaths[0]}/${directoryPaths[1]}/${directoryPaths[2]}/${directoryPaths[3]}.vue`
                )
            )
            break
          case 5:
            componentData = shallowRef(
              defineAsyncComponent(
                () =>
                  import(
                    `../views/${directoryPaths[0]}/${directoryPaths[1]}/${directoryPaths[2]}/${directoryPaths[3]}/${directoryPaths[4]}.vue`
                  )
              )
            )
            break
          default:
            break
        }
      }
      componet = componentData
      // componet = () => import(`../views${frontEndUrl}.vue`)
    }
    return componet
  }

  function getUrlData(itemUrl: string) {
    const urlInfo: urlData = {
      url: itemUrl,
      paramUrl: '',
      params: {}
    }
    const paramIndex = _.indexOf(itemUrl, '?')
    if (paramIndex > -1) {
      const paramString = itemUrl.substring(paramIndex + 1, itemUrl.length)
      urlInfo.params = _.fromPairs(
        _.map(paramString.split('&'), (text) => {
          return text.split('=')
        })
      )

      urlInfo.url = urlInfo.url.substring(0, paramIndex)

      for (const key in urlInfo.params) {
        urlInfo.paramUrl += `/${urlInfo.params[key]}`
      }
    }
    return urlInfo
  }

  return {
    /** state */
    routers,
    addRouters,
    openMenus,
    /** action */
    findOpenMenus
  }
})
