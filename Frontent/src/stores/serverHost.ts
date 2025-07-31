import axios from 'axios'
import { useQuery } from '@tanstack/vue-query'

import { useAuth } from '@/composable/auth'
const { getAccessToken } = useAuth()

const fetchServerHost = async (): Promise<string> => {
  const response = await axios.get<string>(selectConfig.com.mobileHostname.url, {
    headers: {
      'Cache-Control': 'no-cache',
      'X-Authorization': getAccessToken()
    },
    baseURL: import.meta.env.VITE_API_URL
  })
  return response.data
}

export const useServerHostStore = defineStore('serverHost', () => {
  const serverUrl = ref('localhost')

  const isFetching = ref(false)
  const isStale = ref(false) // fresh 상태 감지
  let refetchFn: (() => void) | null = null // refetch 저장

  const query = useQuery({
    queryKey: ['serverHost'],
    queryFn: fetchServerHost,
    staleTime: 12 * 60 * 60 * 1000, // 12시간 동안 fresh 상태 유지
    refetchOnWindowFocus: true, // 사용자가 다시 창을 보면 자동 새로고침
    refetchOnReconnect: true, // 인터넷 연결이 다시 되면 자동 새로고침
    enabled: !!getAccessToken()
  })

  watchEffect(() => {
    if (query.isSuccess.value) {
      serverUrl.value = query.data.value!
      isStale.value = false // fresh한 상태로 변경
    }
  })
  watchEffect(() => {
    if (!query.isFetching.value) {
      isFetching.value = false
    }
  })

  isFetching.value = query.isFetching.value
  isStale.value = query.isStale.value
  refetchFn = query.refetch // refetch 함수 저장

  return {
    /** state */
    serverUrl,
    isFetching,
    isStale,
    /** action */
    refetchServerHost: () => refetchFn && refetchFn() // 수동으로 refetch 실행
  }
})
