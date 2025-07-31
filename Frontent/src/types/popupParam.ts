import { objectStringNumber } from '@/types/variable'
import { Component } from 'vue'

export type popupParamType = {
  isFull?: boolean
  isApproval?: boolean
  target: Component | null | undefined
  title: string
  visible?: boolean
  suffixChip?: string
  width?: string
  height?: string
  top?: string
  param?: objectStringNumber
  closeCallback: (data: any) => void
}
export type closePopupType = (data?: any) => void
