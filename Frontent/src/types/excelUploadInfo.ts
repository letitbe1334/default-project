export type excelUploadInfo = {
  rowKeys: Array<string>
  taskClassCd: string // 엑셀업로드 양식 구분 값
  sheetNum: number
  columns: Array<any>
  data: Array<any>
}
