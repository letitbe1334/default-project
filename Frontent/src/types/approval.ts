import { objectStringNumber } from '@/types/variable'

export type apprInfoType = {
  sysApprovalRequestId: string // 결재요청번호
  /**
   * 결재상태코드
   * ASC0000001	결재중
   * ASC0000002	반려
   * ASC9999999	결재완료
   */
  approvalStatusCd: string
  apprEditable: boolean // 결재버튼 활성화 기준
  param: objectStringNumber // 결재 param
  approvalUrl: string // 결재 url
  isApproval: boolean // 결재 submit
  approvalParamValue: any
  approvalTypeCd: string
  approvalRequestName: string // 결재요청명 (문서 title)
  approvalConnId: string // 결재연결용 업무일련번호 (문서 key)
}
