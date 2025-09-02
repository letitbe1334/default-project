import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const { accessToken } = storeToRefs(auth)

const fetchUsers = async (): Promise<Array<userType>> => {
  const response = await $http<Array<userType>>({
    url: selectConfig.auth.userInfo.users.url,
    method: 'GET'
  })
  return response.data.data
}
const fetchDepts = async (): Promise<Array<deptType>> => {
  const response = await $http<Array<deptType>>({
    url: selectConfig.auth.userInfo.depts.url,
    method: 'GET'
  })
  return response.data.data
}
const fetchVendors = async (): Promise<Array<vendorType>> => {
  const response = await $http<Array<vendorType>>({
    url: selectConfig.auth.userInfo.vendors.url,
    method: 'GET'
  })
  return response.data.data
}
// const fetchVendorUsers = async (): Promise<Array<vendorUserType>> => {
//   const response = await axios.get<Array<vendorUserType>>(
//     selectConfig.mdm.cim.vendor.user.list.url,
//     {
//       headers: {
//         'Cache-Control': 'no-cache',
//       'Authorization': accessToken.value
//       },
//       baseURL: import.meta.env.VITE_API_URL
//     }
//   )
//   return response.data
// }

export const useSystemInfoStore = defineStore('systemInfo', () => {
  const depts = ref<Array<deptType>>([])
  const users = ref<Array<userType>>([])
  const vendors = ref<Array<vendorType>>([])
  // const vendorUsers = ref<Array<vendorUserType>>([])

  /** [USER] vue-query 정보 */
  const userQuery = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 3 * 60 * 60 * 1000, // 3시간 동안 fresh 상태 유지
    refetchOnWindowFocus: true, // 사용자가 다시 창을 보면 자동 새로고침
    refetchOnReconnect: true, // 인터넷 연결이 다시 되면 자동 새로고침
    enabled: !!accessToken.value
  })
  const userVueQuery = ref({
    isStale: true,
    isFetching: true
  })
  const refetchUser = () => userQuery.refetch()
  userVueQuery.value.isFetching = userQuery.isFetching.value
  userVueQuery.value.isStale = userQuery.isStale.value
  watchEffect(() => {
    if (userQuery.isSuccess.value) {
      users.value = userQuery.data.value!
      userVueQuery.value.isStale = false // fresh한 상태로 변경
    }
  })
  watchEffect(() => {
    if (!userQuery.isFetching.value) {
      userVueQuery.value.isFetching = false
    }
  })

  /** [DEPT] vue-query 정보 */
  const deptQuery = useQuery({
    queryKey: ['depts'],
    queryFn: fetchDepts,
    staleTime: 3 * 60 * 60 * 1000, // 3시간 동안 fresh 상태 유지
    refetchOnWindowFocus: true, // 사용자가 다시 창을 보면 자동 새로고침
    refetchOnReconnect: true, // 인터넷 연결이 다시 되면 자동 새로고침
    enabled: !!accessToken.value
  })
  const deptVueQuery = ref({
    isStale: true,
    isFetching: true
  })
  const refetchDept = () => deptQuery.refetch()
  deptVueQuery.value.isFetching = deptQuery.isFetching.value
  deptVueQuery.value.isStale = deptQuery.isStale.value
  watchEffect(() => {
    if (deptQuery.isSuccess.value) {
      depts.value = [...deptQuery.data.value!]
      deptVueQuery.value.isStale = false // fresh한 상태로 변경
    }
  })
  watchEffect(() => {
    if (!deptQuery.isFetching.value) {
      deptVueQuery.value.isFetching = false
    }
  })

  /** [VENDOR] vue-query 정보 */
  const vendorQuery = useQuery({
    queryKey: ['vendors'],
    queryFn: fetchVendors,
    staleTime: 3 * 60 * 60 * 1000, // 3시간 동안 fresh 상태 유지
    refetchOnWindowFocus: true, // 사용자가 다시 창을 보면 자동 새로고침
    refetchOnReconnect: true, // 인터넷 연결이 다시 되면 자동 새로고침
    enabled: !!accessToken.value
  })
  const vendorVueQuery = ref({
    isStale: true,
    isFetching: true
  })
  const refetchVendor = () => vendorQuery.refetch()
  vendorVueQuery.value.isFetching = vendorQuery.isFetching.value
  vendorVueQuery.value.isStale = vendorQuery.isStale.value
  watchEffect(() => {
    if (vendorQuery.isSuccess.value) {
      vendors.value = vendorQuery.data.value!
      vendorVueQuery.value.isStale = false // fresh한 상태로 변경
    }
  })
  watchEffect(() => {
    if (!vendorQuery.isFetching.value) {
      vendorVueQuery.value.isFetching = false
    }
  })

  /** [VENDOR USER] vue-query 정보 */
  // const vendorUserQuery = useQuery({
  //   queryKey: ['vendorUsers'],
  //   queryFn: fetchVendorUsers,
  //   staleTime: 3 * 60 * 60 * 1000, // 3시간 동안 fresh 상태 유지
  //   refetchOnWindowFocus: true, // 사용자가 다시 창을 보면 자동 새로고침
  //   refetchOnReconnect: true, // 인터넷 연결이 다시 되면 자동 새로고침
  //   enabled: !!accessToken.value
  // })
  // const vendorUserVueQuery = ref({
  //   isStale: true,
  //   isFetching: true
  // })
  // const refetchVendorUser = () => vendorUserQuery.refetch()
  // vendorUserVueQuery.value.isFetching = vendorUserQuery.isFetching.value
  // vendorUserVueQuery.value.isStale = vendorUserQuery.isStale.value
  // watchEffect(() => {
  //   if (vendorUserQuery.isSuccess.value) {
  //     vendorUsers.value = vendorUserQuery.data.value!
  //     vendorUserVueQuery.value.isStale = false // fresh한 상태로 변경
  //   }
  // })
  // watchEffect(() => {
  //   if (!vendorUserQuery.isFetching.value) {
  //     vendorUserVueQuery.value.isFetching = false
  //   }
  // })

  return {
    /** state */
    depts,
    deptVueQuery,
    users,
    vendors,
    // vendorUsers,
    /** actions */
    refetchUser,
    refetchDept,
    refetchVendor,
    // refetchVendorUser
  }
})
