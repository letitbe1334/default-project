import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

import { useLogin } from '@/composable/login'
import { useAuth } from '@/composable/auth'
const { getAccessToken, getToken } = useAuth()

interface fetchUserType {
  auths: Array<string> | null
  user: userType
  depts: Array<any>
  users: Array<any>
  vendors: Array<any>
}

const fetchUser = async (): Promise<fetchUserType> => {
  const response = await axios.get<fetchUserType>(selectConfig.auth.userInfo.url, {
    headers: {
      'Cache-Control': 'no-cache',
      'X-Authorization': getAccessToken()
    },
    baseURL: import.meta.env.VITE_API_URL,
    params: {
      deviceTypeCd: 'P'
    }
  })
  return response.data
}

export const useUserStore = defineStore('user', () => {
  const { LogOut } = useLogin()
  const user = ref<userType>({
    id: '',
    jobCd: '',
    jobName: '',
    loginId: '',
    loginPwd: '',
    mobileNo: '',
    oripassword: '',
    password: '',
    deptCd: '',
    deptName: '',
    email: '',
    empNo: '',
    enterDate: '',
    birthDate: '',
    plantCd: '',
    plantCds: '',
    plantName: '',
    recommendationFlag: '',
    remark: '',
    retireDate: '',
    retireFlag: '',
    seniorName: '',
    seniorityName: '',
    sexCd: '',
    sexName: '',
    spotCd: '',
    spotName: '',
    typeName: '',
    userId: '',
    userName: '',
    menuNm: '',
    dashboardId: '',
    approveSignature: '',
    url: '',
    checkupBatchCycleCd: '',
    checkupComeDate: '',
    checkupCycleCd: '',
    checkupOccCycleCd: '',
    checkupRecentDate: '',
    checkupScheduleDate: '',
    checkupStatus: '',
    defectManageFlag: '',
    hazardNames: ''
  })
  const auths = ref<Array<string> | null>([])
  const depts = ref([])
  const vendors = ref([])
  const roles = ref([])
  /** vue-query 정보 */
  const userVueQuery = ref({
    isStale: true,
    isFetching: true,
    refetch: null as (() => void) | null
  })
  const userQuery = useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUser,
    staleTime: 3 * 60 * 60 * 1000, // 3시간 동안 fresh 상태 유지
    refetchOnWindowFocus: true, // 사용자가 다시 창을 보면 자동 새로고침
    refetchOnReconnect: true, // 인터넷 연결이 다시 되면 자동 새로고침
    enabled: !!getAccessToken()
    // enabled: !!user.value && !!user.value.userId
  })

  watchEffect(() => {
    if (userQuery.isSuccess.value) {
      if (!userQuery.data.value || userQuery.data.value?.user?.userId !== getToken()) {
        LogOut().finally(() => window.location.reload())
      }

      auths.value = userQuery.data.value!.auths
      user.value = userQuery.data.value!.user
      userVueQuery.value.isStale = false // fresh한 상태로 변경
    }
  })
  watchEffect(() => {
    if (!userQuery.isFetching.value) {
      userVueQuery.value.isFetching = false
    }
  })

  userVueQuery.value.isFetching = userQuery.isFetching.value
  userVueQuery.value.isStale = userQuery.isStale.value
  userVueQuery.value.refetch = userQuery.refetch

  return {
    /** state */
    user,
    userVueQuery,
    auths,
    depts,
    vendors,
    roles,
    /** actions */
    refetchUser: () => userVueQuery.value.refetch && userVueQuery.value.refetch()
  }
})
