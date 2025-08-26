import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

import { useAuthStore } from '@/stores/auth'

const fetchPlants = async (): Promise<codeMasterType[]> => {
  const auth = useAuthStore()
  const { accessToken } = storeToRefs(auth)
  const defaultConfig = {
    headers: {
      'Cache-Control': 'no-cache',
      'Authorization': accessToken.value,
      withCredentials: true,
    },
    baseURL: import.meta.env.VITE_API_URL,
    data: {}
  }
  const response = await axios.get<codeMasterType[]>(
    $format(selectConfig.sys.code.mst.list.url, 'PLANT_CD'),
    defaultConfig
  )
  return response.data
}

export const usePlantStore = defineStore('plants', () => {
  const plants = ref<codeMasterType[]>([])
  const isFetching = ref(false)
  const isStale = ref(false) // fresh 상태 감지
  let refetchFn: (() => void) | null = null // refetch 저장

  const query = useQuery({
    queryKey: ['plants'],
    queryFn: fetchPlants,
    staleTime: 3 * 60 * 60 * 1000, // 3시간 동안 fresh 상태 유지
    refetchOnWindowFocus: true, // 사용자가 다시 창을 보면 자동 새로고침
    refetchOnReconnect: true // 인터넷 연결이 다시 되면 자동 새로고침
  })

  watchEffect(() => {
    if (query.isSuccess.value) {
      plants.value = query.data.value
      isStale.value = false // fresh한 상태로 변경
    }
  })
  watchEffect(() => {
    if (!query.isFetching.value) {
      isFetching.value = false
    }
  })

  // Vue Query 상태를 Pinia에 반영
  isFetching.value = query.isFetching.value
  isStale.value = query.isStale.value
  refetchFn = query.refetch // refetch 함수 저장

  return {
    plants,
    isFetching,
    isStale,
    refetch: () => refetchFn && refetchFn() // 수동으로 refetch 실행
  }
})
