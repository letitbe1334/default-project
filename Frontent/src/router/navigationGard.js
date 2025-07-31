import router from '@/router'

import { useLogin } from '@/composable/login'
import { useAuth } from '@/composable/auth'
const { getToken, haveRoute } = useAuth()

import { useAppStore } from '@stores/app'
import { usePermissionStore } from '@stores/permission'
import { useUserStore } from '@stores/user'

/** 인증처리가 되지 않더라도 보낼 수 있는 uri */
const whiteList = ['/login', '/404']

router.beforeEach((to, from, next) => {
  /** app 호출 */
  const app = useAppStore()

  /** permission 호출 */
  const permission = usePermissionStore()
  const { addRouters } = storeToRefs(permission)

  /** user 호출 */
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  /** login 호출 */
  const login = useLogin()

  /** 메뉴 이동시 전체화면 로딩 처리 */
  app.setLoading()

  if (to.path === '/404') {
    next()
  } else {
    /** access router에 저장 되지 않은 메뉴 정보일 경우 404 페이지로 redirect */
    if (addRouters.value && addRouters.value.length > 0) {
      if (!haveRoute(addRouters.value, to.path)) {
        return next({
          path: '/404'
        })
      }
    }
    /**
     * 메뉴 이동전에 uri 정보를 loaclStorage에 저장
     *
     * 인증토큰이 만료 되었을 시에 로그인창을 띄우게 되며
     * 로그인 처리가 끝나고 나면 localStorage에 저장한 uri 정보를 바탕으로 사용자가 가고자한 페이지로 이동하게 함
     */
    window.localStorage.setItem('checkToPath', to.path)

    /** 인증토큰 여부 파악 */
    const isToken = getToken()
    if (isToken && isToken !== 'undefined') {
      /** 메뉴 이동 로그, 해당 소스에서 구현 X */

      /** 인증토큰이 있음에도 로그인페이지로 이동하고자 할 경우 메인페이지로 이동시킴 */
      if (to.path === '/login') {
        next({
          path: user.value.url
        })
      } else {
        /** Access token 유효성 체크 */
        login
          .ValidCheckToken()
          .then(() => {
            next()
          })
          .catch(() => {
            /** Refresh token를 통해 Access token 갱신 */
            login
              .UpdateTokenByRefreshToken()
              .then(() => {
                next()
              })
              .catch(() => {
                clear(next)
              })
          })
      }
    } else {
      /** token X */
      if (whiteList.indexOf(to.path) !== -1) {
        /** 인증 필요 없는 url */
        next()
      } else {
        /** 그 외의 url은 login page */
        localStorage.clear()
        next(`/login?redirect=${to.path}`)
      }
    }
  }
})

router.afterEach((to) => {
  /** 내가 가려는 메뉴 left에 표시 */
  const permission = usePermissionStore()
  permission.findOpenMenus(to.name)

  /** 로딩 제거 */
  const app = useAppStore()
  app.setLoading(false)
})

function clear(next) {
  /** logout 처리 */
  const login = useLogin()
  login.LogOut().finally(() => {
    next('/login')
  })
}
