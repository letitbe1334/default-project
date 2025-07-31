export type userType = {
  /** 사용자 정보 */
  id?: string
  jobCd?: string
  jobName?: string
  loginId: string
  loginPwd: string
  mobileNo?: string
  oripassword: string
  password: string
  deptCd: string
  deptName: string
  deptUserName: string
  email?: string
  empNo: string
  enterDate?: string
  birthDate?: string
  plantCd: string
  plantCds: string
  plantName: string
  recommendationFlag?: string
  remark?: string
  retireDate?: string
  retireFlag?: string
  seniorName?: string
  seniorityName?: string
  sexCd?: string
  sexName?: string
  spotCd?: string
  spotName?: string
  typeName?: string
  userId: string
  userName: string
  /** 메뉴 정보 */
  menuNm?: string
  dashboardId?: string
  approveSignature?: string
  url?: string
  /** 권한 정보 */
  /** 검진 */
  checkupBatchCycleCd?: string
  checkupComeDate?: string
  checkupCycleCd?: string
  checkupOccCycleCd?: string
  checkupRecentDate?: string
  checkupScheduleDate?: string
  checkupStatus?: string
  cycleCd?: string
  cycleName?: string
  nightRemark?: string
  nightWorkFlag?: string
  defectManageFlag?: string
  hazardNames?: string
}
