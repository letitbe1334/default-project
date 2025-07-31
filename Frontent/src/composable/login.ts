import { useUserStore } from '@stores/user'
import { useStoreApi } from '@/composable/storeApi'

import { useAuth } from './auth'
const {
  setToken,
  setAccessToken,
  setRefreshToken,
  removeToken,
  removeRefreshToken,
  removeAccessToken
} = useAuth()

interface loginData {
  userId: string
  password: string
  connIp: string
  otppassword?: string
}

export function useLogin() {
  /** store api 호출 */
  const { loginByUserAccount, logout, updateTokenByRefreshToken, validToken } = useStoreApi()
  /** userStore 호출 */
  const userStore = useUserStore()
  /** langStore 호출 */
  const langStore = useLangTranStore()

  /******************************
   * TODO (목적): SSO login 시도
   *******************************/
  function sso() {
    return new Promise((resolve, reject) => {
      sso()
        .then((response: any) => {
          const data = response.data

          setToken(data.userId)
          setAccessToken(data.accessToken)
          setRefreshToken(data.refreshToken)

          userStore.refetchUser()
          langStore.refetchLang()

          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /******************************
   * TODO (목적): ID / PWD 로그인 시도
   * @param (1): id, pwd
   *******************************/
  function LoginByUserAccount(userInfo: loginData) {
    const userId = userInfo.userId.trim()
    console.log('# userId: ', userId)
    return new Promise((resolve, reject) => {
      loginByUserAccount(userId, userInfo.password, userInfo.connIp, userInfo.otppassword)
        .then((response: any) => {
          const data = response.data

          setToken(data.userId)
          setAccessToken(data.accessToken)
          setRefreshToken(data.refreshToken)

          userStore.refetchUser()
          langStore.refetchLang()

          resolve(true)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  /******************************
   * TODO (목적): logout 처리
   *******************************/
  function LogOut() {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          clear()
          resolve(true)
        })
        .catch((error) => {
          clear()
          reject(error)
        })
    })
  }

  function clear() {
    removeToken()
    removeAccessToken()
    removeRefreshToken()
    window.sessionStorage.removeItem('defaultPlantCd')
  }

  /******************************
   * TODO (목적): refresh token 재조회
   *******************************/
  function UpdateTokenByRefreshToken() {
    return new Promise((resolve, reject) => {
      updateTokenByRefreshToken()
        .then(() => {
          resolve(true)
        })
        .catch((error) => {
          if (error.message.includes('undefined') && error.message.includes('$emit')) {
            window.alert('연결할 수 없습니다. 관리자에게 문의하세요.')
          } else {
            window.alert(error.response.data.message)
          }
          reject(error)
        })
    })
  }

  /******************************
   * TODO (목적): token 재조회
   *******************************/
  function ValidCheckToken() {
    return new Promise((resolve, reject) => {
      validToken()
        .then(() => {
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  return {
    sso,
    LoginByUserAccount,
    LogOut,
    UpdateTokenByRefreshToken,
    ValidCheckToken
  }
}
