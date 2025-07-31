export type deptType = {
  plantCd: string
  plantName: string
  deptCd: string
  deptName: string
  upDeptCd: string
  deptLvl: number
  sortOrder: number
  useFlag: string
  /** 무재해 가중인원 대상부서여부 */
  increaseFlag?: string
  increaseFlagName?: string
}
