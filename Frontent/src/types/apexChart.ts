export type apexChartType = {
  options: apexChartOptionType | any
  series: Array<apexChartSeriesType> | any
  chartWidth?: stringNull
  seriesQuarter?: objectString
  height?: stringNull
}

export type apexChartOptionType = {
  chart?: objectStringNumber // 차트 디자인
  title?: objectString // 제목
  subtitle?: objectString
  plotOptions?: objectString // 차트 모양
  xaxis?: objectStringNumber // x축 설정
  yaxis?: objectStringNumber // y축 설정
  colors?: arrayString | null // bar별 색 설정
  dataLabels?: objectStringNumber // 라벨 표시 여부
  stroke?: objectStringNumber // 곡선(부드러운 느낌) 강도 설정
  grid?: objectStringNumber // 그리드 디자인 설정
  markers?: objectStringNumber // series 마커 표시
  legend?: objectStringNumber // 범례 여부
  redrawOnParentResize?: boolean
  fill?: objectString
  tooltip?: objectString
  annotations?: objectString
}

export type apexChartSeriesType = {
  name?: stringNull
  data?: Array<any>
  group?: stringNull
  hazardCd?: stringNull
  code?: stringNull
  id?: stringNull
  type?: stringNull
  ramMatrixRiskStandardsId?: stringNull
  envAirMstInspectItemId?: stringNull
}
