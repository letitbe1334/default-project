export type processDeptType = {
  processCd: string
  processDeptCd: string
  processDeptName: string
}
export type processType = {
  plantCd: string
  plantName: string
  processCd: string
  processName: string
  upProcessCd: string
  upProcessName: string
  processLevelCd: string
  processDesc?: string
  managementDepts?: string
  orderNo?: number
  psmFlag?: string
  useFlag: string
  mainMaterial?: string
  workerCnt?: string
  productName?: string
  workCycleCd?: string
  workingTime?: string
  temperature?: string
  deptList?: Array<processDeptType>
  code?: string
  codeName?: string
}
