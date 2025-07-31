import { Component } from 'vue'

export type tableColumnInnerBtnType = {
  label?: string
  icon?: string
  color?: string
  tooltip?: string
}
export type tableColumnImageRestrictionType = {
  width?: number
  height?: number
}
export type tableColumnType = {
  name: string
  field: string
  label: string
  style?: string
  align: string
  type?: string
  sortable: boolean
  fix?: boolean
  required?: boolean
  setHeader?: boolean
  headerCustom?: boolean
  src?: stringNull
  helpcomment?: string
  headerType?: string
  trueValue?: string
  falseValue?: string
  value?: stringNull | numberNull
  comboItems?: Array<codeMasterType> | Array<stepMasterType> | arrayObject
  itemText?: string
  itemValue?: string
  none?: boolean
  lang?: string
  true?: string
  false?: string
  dateType?: string
  minuteStep?: number
  start?: string
  end?: string
  range?: boolean
  headType?: string
  size?: string
  color?: string
  icon?: string
  ellipsis?: boolean
  innerBtn?: boolean
  description?: string
  btns?: Array<tableColumnInnerBtnType>
  isSelect?: boolean
  isChip?: boolean
  maxlength?: number
  checkIcon?: string
  uncheckIcon?: string
  isFirstValue?: boolean
  deptCd?: string
  deptName?: string
  jobName?: string
  spotName?: string
  imageRestriction?: tableColumnImageRestrictionType
  uploaderSetting?: attachSettingType
  datetimeType?: string
  isArray?: boolean
  isObject?: boolean
  valueText?: string
  valueKey?: string
  colorItems?: Array<stepMasterType>
  prefix?: string
  suffix?: string
  component?: Component
  disableTarget?: string
  disableCon?: string
  userId?: string
  selectionAble?: boolean
  colorTarget?: string
  colorTarget2?: string
  colorTarget3?: string
  colorClass?: string
  isInout?: boolean
  inoutCol?: string
  isExamine?: boolean
  in?: string
  out?: string
  level?: string | number | null | object
  colspan?: string | number | null
  vendorInfo?: vendorType
  facilityInfo?: {
    facilityName: string
  }
  equipInfo?: {
    equipmentName: string
    equipmentNo: string
  }
  child?: Array<tableColumnType>
}
export type tableMergeType = {
  index: number
  colName: string
}
