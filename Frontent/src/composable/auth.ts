import Cookies from 'js-cookie'
import axios from 'axios'
import { accessRouterData } from '@/stores/permission'

export function useAuth() {
  // token은 user_id를 가져오고 있음. 전체바꾸기를 해야함.
  const TokenKey = 'jwtToken'
  const RefreshTokenKey = 'refreshToken'
  const accessTokenKey = 'accessToken'

  const accessExpiredCode = 'ACCESS_EXPIRED'
  const refreshExpiredCode = 'REFRESH_EXPIRED'
  const wrongPasswordCode = 'WRONG_PASSWORD'
  const concurrentExpiredCode = 'CONCURRENT_EXPIRED'

  function getToken() {
    return Cookies.get(TokenKey)
  }
  function setToken(token: string) {
    return Cookies.set(TokenKey, token)
  }
  function removeToken() {
    return Cookies.remove(TokenKey)
  }
  function getAccessToken() {
    return Cookies.get(accessTokenKey)
  }
  function setAccessToken(accessToken: string) {
    return Cookies.set(accessTokenKey, 'Bearer ' + accessToken)
  }
  function removeAccessToken() {
    return Cookies.remove(accessTokenKey)
  }
  function getRefreshToken() {
    return Cookies.get(RefreshTokenKey)
  }
  function setRefreshToken(refreshToken: string) {
    return Cookies.set(RefreshTokenKey, 'Bearer ' + refreshToken)
  }
  function removeRefreshToken() {
    return Cookies.remove(RefreshTokenKey)
  }
  function getAccessExpiredCode() {
    return accessExpiredCode
  }
  function getRefreshExpiredCode() {
    return refreshExpiredCode
  }
  function getWrongPasswordCode() {
    return wrongPasswordCode
  }
  function getConcurrentExpiredCode() {
    return concurrentExpiredCode
  }
  function getNewToken() {
    const refToken = getRefreshToken()
    const service = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 5000
    })
    const validRefreshCall = service
      .get('/api/auth/refresh', {
        headers: {
          // 요청 헤더
          'X-Authorization': refToken
        }
      })
      .then((response) => {
        const data = response.data
        setAccessToken(data.accessToken)
        setRefreshToken(data.refreshToken)
        return Promise.resolve(true)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
    return validRefreshCall
  }
  function haveRoute(routers: Array<accessRouterData>, path: string) {
    let returnVal = false
    if (routers && routers.length > 0) {
      for (let i = 0; i < routers.length; i++) {
        if (routers[i].path === path) {
          return true
        } else {
          returnVal = false
        }
      }
    }
    return returnVal
  }
  return {
    getToken,
    setToken,
    removeToken,
    getAccessToken,
    setAccessToken,
    removeAccessToken,
    getRefreshToken,
    setRefreshToken,
    removeRefreshToken,
    getAccessExpiredCode,
    getRefreshExpiredCode,
    getWrongPasswordCode,
    getConcurrentExpiredCode,
    getNewToken,
    haveRoute
  }
}
