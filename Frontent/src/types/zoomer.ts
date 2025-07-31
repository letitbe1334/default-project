export type zoomerType = {
  options?: zoomerOptionType
  maps?: Array<mapType>
  menu?: zoomerMenuType
  currentMap?: currentMapType
  height?: number
  ratio?: number
  style?: stringNull
  imageStyle?: stringNull
  value?: number
  interval?: number
}

export type zoomerOptionType = {
  minZoom?: number
  maxZoom?: number
  initialZoom?: number
  initialX?: number
  initialY?: number
  bounds?: boolean
  boundsPadding?: number
  zoomDoubleClickSpeed?: number
  onTouch?: (event: TouchEvent) => boolean
}

export type zoomerMenuType = {
  offsetX?: number
  offsetY?: number
}
export type currentMapType = {
  sopFireFightingMapId?: stringNull
  sopFireFightingLocationId?: stringNull
  sopMapId?: stringNull
}

export type mapType = {
  sopFireFightingMapId?: stringNull
  sopMapId?: stringNull
  mapSrc?: stringNull
  mapName?: stringNull
  ratio?: numberNull
  marks?: Array<markType>
  hhmHazardousMachineryId?: stringNull
}

export type markType = {
  sopFireFightingResultMapId?: stringNull // 작업위치 번호
  sopFireFightingMapId?: stringNull // 지도 일련번호
  locationXcoordinate?: numberNull // 작업위치 X좌표
  locationYcoordinate?: numberNull // 작업위치 Y좌표
  sopFireFightingId?: stringNull // 소방설비 일련번호
  mapContent?: stringNull
  plantCd?: stringNull // 사업장
  plantName?: stringNull
  sopFireFightingTypeCd?: stringNull // 유형
  sopFireFightingTypeName?: stringNull
  sopFireFightingKindCd?: stringNull // 점검 소방시설 종류
  sopFireFightingKindName?: stringNull
  manageNo?: stringNull // 관리번호
  fireFightingName?: stringNull // 소방설비명
  deptCd?: stringNull // 관리부서
  deptName?: stringNull
  processCd?: stringNull // 관련공정
  processName?: stringNull
  sopFireFightinhReplacementCycleCd?: stringNull // 소방설비 교체 주기
  sopFireFightinhReplacementCycleName?: stringNull
  locationName?: stringNull // 장소
  installDate?: stringNull // 제조일
  checkDate?: stringNull // 최근 점검일
  curdateDiff?: stringNull // 현재일로부터 최근 점검일 지난일수
  sopFireFightingIssueCheckId?: stringNull // 소방 이슈점검 일련번호
  sysAttachFileId?: stringNull
  imagePath?: stringNull
}
