import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { get, merge } from 'lodash-es'

import { useLogin } from '@/composable/login'
import { useMessage } from '@/composable/message'
import { useAuth } from '@/composable/auth'
const {
  getToken,
  getAccessToken,
  getNewToken,
  getAccessExpiredCode,
  getRefreshExpiredCode,
  getWrongPasswordCode
} = useAuth()
import { getLang } from '@utils/common'

import { useLoadingStore } from '@stores/loading'

// 로딩바 보이지 않게 할 URL 목록
const hideLoadingUrlList = [
  '/api/sys/appr/list/mycnt',
  '/api/sys/favorites',
  '/api/sys/favorite',
  '/api/sys/main/notices'
]

function clear() {
  /** login 호출 */
  const loginStroe = useLogin()
  loginStroe.LogOut().then(() => {
    location.reload() // In order to re-instantiate the vue-router object to avoid bugs
  })
}

/** 요청 인스턴스 생성 */
function createService() {
  // 인스턴스 생성
  const service = axios.create()
  service.interceptors.request.use(
    (config) => {
      const params = config.params
      if (params) {
        params.lang = getLang()
        /** 사업장 조회시 권한이 있는 사업장을 plantCdList에 배열로 담아 API로 전달 */
        if (params.plantCd) {
          params.plantCdList = []
          const plantlist = params.plantCd.split(',')
          for (let i = 0; i < plantlist.length; i++) {
            if (plantlist[i] !== '') {
              params.plantCdList.push(plantlist[i])
            }
          }
        }
      } else {
        config.params = {
          lang: getLang()
        }
      }
      return config
    },
    // 전송실패
    (error) => Promise.reject(error)
  )
  /**
   * 응답 처리
   * - 상태코드에 따른 메시지 처리
   * - loading stack 처리
   */
  service.interceptors.response.use(
    (response) => {
      /** loading 호출 */
      const loading = useLoadingStore()

      /** loading stack down */
      loading.loadingHide()

      // api 반환값
      return response
    },
    (error) => {
      /** loading 호출 */
      const loading = useLoadingStore()
      // HTTP status code
      const status = get(error, 'response.status')
      if (status === 401) {
        // Api server 정의 code
        const returnCode = get(error, 'response.data.returnCode')
        if (returnCode === getAccessExpiredCode()) {
          // Access Token 만료 : Refresh Token으로 재인증 요청
          // 1. Refresh Token 확인 요청
          return getNewToken()
            .then(() => {
              // 2. 새로 발급된 Access Token 으로 재요청
              axios.defaults.headers.common['X-Authorization'] = getAccessToken()

              // 이전요청을 다시 수행하도록 url및 parameter등을 다시 호출.
              return $http(error.config)
            })
            .catch(() => {
              /** 만료토큰으로 처리되었음. 재로그인 필요. */
              clear()
            })
        } else if (returnCode === getRefreshExpiredCode()) {
          /** Refresh Token 만료 */
          clear()
        } else if (returnCode === getWrongPasswordCode()) {
          // 비밀번호가 맞지 않을 때만 진입
        } else {
          // INVALID
        }
      } else {
        const errorResponse = get(error, 'response')
        const errorMessage = get(error, 'response.data.message')
        const errorDetail = {
          status: errorResponse?.status,
          cause: errorResponse?.data?.cause,
          causeDetail: errorResponse?.data?.causeDetail,
          url: errorResponse?.data?.url,
          config: {
            method: errorResponse?.data?.config?.method,
            url: errorResponse?.data?.config?.url
          }
        }
        // 개발자 에러 메시지
        const { exceptionNotify, alert } = useMessage()
        if (import.meta.env.MODE !== 'production') {
          exceptionNotify({
            title: '[개발자 안내]',
            message: errorMessage,
            errorDetail: errorDetail,
            type: 'error',
            duration: 0 // 자동으로 닫히지 않음
          })
        } else {
          alert({
            title: '에러',
            message: '서비스 처리 중 오류가 발생하였습니다.\n관리자에게 문의바랍니다.',
            type: 'error',
            duration: 0 // 자동으로 닫히지 않음
          })
        }
      }
      loading.loadingAllHide()
      return Promise.reject(error)
    }
  )
  return service
}

/** 요청 방법 생성 */
function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const defaultConfig = {
      headers: {
        'Cache-Control': 'no-cache',
        'X-Authorization': config.headers?.refreshToken || getAccessToken()
      },
      timeout: config.timeout ? config.timeout : 10000,
      baseURL: import.meta.env.VITE_API_URL,
      data: {}
    }
    // defaultConfig & config 병합
    const mergeConfig = merge(defaultConfig, config)

    /** loading 호출 */
    const loading = useLoadingStore()

    // 로딩바 표시 안하는 URL
    if (hideLoadingUrlList.indexOf(String(config.url)) < 0) {
      /** loading stack up */
      loading.loadingShow()
    }
    return service(mergeConfig)
  }
}

/** API 요청 서비스 */
const service = createService()
/** API 요청 모듈 */
export const $http = createRequest(service)
