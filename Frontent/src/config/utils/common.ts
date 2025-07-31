// import Vue from 'vue'
import { Router } from 'vue-router'
import { storeToRefs } from 'pinia'
import moment, { DurationInputArg2, Moment } from 'moment'
import { forEach, filter, find, concat, map, split, join } from 'lodash-es'
import Cookies from 'js-cookie'
import $format from 'string-format'

import { useLangTranStore } from '@stores/langTran'

import selectConfig from '@utils/selectConfig'
import { $http } from '@utils/http'
import { utils, WorkSheet } from 'xlsx'

import { useMessage } from '@/composable/message'

moment.updateLocale('ko', {
  week: {
    dow: 1, // 한 주의 시작 요일은 일요일(0)
    doy: 4 //  연도의 첫 주는 1월 3일을 포함해야 될 경우. (계산 식: 7+dow-3)
  }
})

interface previewFile {
  sysAttachFileId: string
  contentType: string
}

interface recursivePromises {
  func: Function
  param?: any
  successMessage?: string
  exceptionMessage?: string
}

/** Router */
export function movePage(_$router: Router, _path: string) {
  _$router.push({
    path: _path
  })
}
export function movePageReplace(_$router: Router, _path: string) {
  _$router.replace({
    path: _path
  })
}

/** moment */
export function today() {
  return new Date(moment().format())
}
export function getToday(_isLocalSet?: string) {
  const dateFormat = _isLocalSet ? 'L' : 'YYYY-MM-DD' // default : ISO format('YYYY-MM-DD)
  return moment().format(dateFormat)
}
export function getTodayNone(_isLocalSet?: string) {
  const dateFormat = _isLocalSet ? 'L' : 'YYYYMMDD' // default : ISO format('YYYY-MM-DD)
  return moment().format(dateFormat)
}
export function getTodayDateTime() {
  const dateFormat = 'YYYY-MM-DD HH:mm:ss'
  return moment().format(dateFormat)
}
export function getTodayDateTiemMin() {
  const dateFormat = 'YYYY-MM-DD HH:mm'
  return moment().format(dateFormat)
}
export function getFirstDayThisYear() {
  return today().getFullYear() + '-01-01'
}
export function getLastDayThisYear() {
  return today().getFullYear() + '-12-31'
}
export function getThisMonth(_format?: string) {
  let formatL = ''
  _format = _format ? _format : 'YYYY-MM'
  if (_format === 'locale') {
    formatL = moment.localeData().longDateFormat('L')
    _format = formatL.replace(/D/g, '').replace(/^\W|\W$|\W\W/, '')
  }
  return moment().format(_format)
}
export function getPrevMonth(_prev: number, _format?: string) {
  let formatL = ''
  _format = _format ? _format : 'YYYY-MM'
  if (_format === 'locale') {
    formatL = moment.localeData().longDateFormat('L')
    _format = formatL.replace(/D/g, '').replace(/^\W|\W$|\W\W/, '')
  }
  return moment()
    .add(Math.abs(_prev) * -1, 'M')
    .format(_format)
}
export function getAddYear(_date: string, _cnt: number) {
  return moment(_date).add(_cnt, 'y').format('YYYY-MM-DD')
}
export function getAddMonth(_date: string, _cnt: number) {
  return moment(_date).add(_cnt, 'M').format('YYYY-MM-DD')
}
export function getAddDay(_date: string, _cnt: number) {
  return moment(_date).add(_cnt, 'd').format('YYYY-MM-DD')
}
export function getThisYear() {
  return moment().format('YYYY')
}
export function getPrevYear(_prev: number) {
  return moment()
    .add(Math.abs(_prev) * -1, 'y')
    .format('YYYY')
}
export function getCurWeek() {
  return moment().week()
}
/**
 * 기준일자(_thisDate)에서 계산된 날짜(년, 월, 일)를 가져오는 함수
 * 사용예) export function getCalculatedDate('10d')
 * @param {*String} _thisDateStr : 기준일자(년, 월, 일)
 * @param {*String} _gapOfDate : 현재일 기준 이전 날짜, 기본값 : 1y (예) -10d - 10일전, 10m - 10개월 후, 10y - 10년후
 * @param {*String} _givenFormat : 주어진 날짜의 형식
 * @param {*String} _format : 리턴되는 날짜 형식(기본값은 ISO 표준 형식)
 */
export function getCalculatedDate(
  _thisDateStr: string,
  _gapOfDate: string,
  _givenFormat: string,
  _format?: string
) {
  let gapOfDate = '6d'
  if (_gapOfDate) gapOfDate = _gapOfDate
  if (
    _gapOfDate.indexOf('d') === -1 &&
    _gapOfDate.indexOf('m') === -1 &&
    _gapOfDate.indexOf('y') === -1
  ) {
    return
  }
  const div = gapOfDate.substr(gapOfDate.length - 1, 1).toLowerCase()
  const gap = Number(gapOfDate.substring(0, gapOfDate.length - 1))
  const thisDate = moment(_thisDateStr, _givenFormat)
  // let define = _isAdd ? 1 : -1
  let format = _givenFormat.toUpperCase()
  let typeOfDate: DurationInputArg2 = 'd' // TODO : 계산되는 날짜 형식(https://momentjs.com/docs/ 페이지의 Add함수 참고)
  if (div === 'd') {
    format = _format ? _format : 'YYYY-MM-DD'
    typeOfDate = 'd'
  } else if (div === 'm') {
    format = _format ? _format : 'YYYY-MM'
    typeOfDate = 'M'
  } else if (div === 'y') {
    format = _format ? _format : 'YYYY'
    typeOfDate = 'y'
  }
  return thisDate.add(gap, typeOfDate).format(format)
}
/**
 * 날짜를 받아와서 두 날의 차이일수를 가져오는 함수
 * @param {*필수} _firstDate : 비교날짜 1
 * @param _secondDate : 비교날짜 2, 없으면
 * @return 차이일수
 */
export function getDatediff(_firstDate: Moment, _secondDate?: Moment) {
  if (!_firstDate) return null
  const secondDate = _secondDate || moment()
  return secondDate.diff(_firstDate, 'days')
}
export function isDateType(_str: string) {
  const m = moment(_str)
  return m.isValid()
}

/** 원시값(primitive) */
export function setNumberSeperator(_number: number) {
  if (!_number) return 0
  if (isNaN(_number)) return null
  return _number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export function isStringEmpty(_str: string) {
  if (_str === undefined) return true
  if (_str === null) return true
  if (_str.replace(/(\s*)/g, '') === '') return true
  return false
}
export function stringToBoolean(string: string) {
  switch (string.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true
    case 'false':
    case 'no':
    case '0':
    case null:
      return false
    default:
      return Boolean(string)
  }
}
export function toUndrFromCamelCase(_str: string) {
  return _str
    .replace(/(.)([A-Z][a-z]+)/g, '$1_$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toLowerCase()
}
export function telephoneMask(val: string) {
  if (val) {
    if (val.length <= 11) {
      return '##-###-####'
    } else if (val.length === 12) {
      return '###-###-####'
    } else {
      return '###-####-####'
    }
  } else {
    return ''
  }
}
export function toThousandFilter(num: number, returnBlank?: boolean) {
  const _num = (+num || (returnBlank ? '' : 0))
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  return _num === '0' ? 0 : _num
}
export function generateRandom(min: number, max: number) {
  const ranNum = Math.floor(Math.random() * (max - min + 1)) + min
  return ranNum
}
export function generateRandomComma(min: number, max: number) {
  const ranNum = Math.floor(Math.random() * (max - min + 1)) + min
  return toThousandFilter(ranNum)
}
export function convertHtml(text: string) {
  return text ? text.replace(/&gt;/g, '>').replace(/&lt;/g, '<') : ''
}
export function convertEnter(str: string | null | undefined) {
  str = String(str)
  if (str === 'null' || str === 'undefined') {
    str = ''
  }
  return str ? str.replace(/(?:\r\n|\n\r|\r|\n)/g, '<br />') : ''
  // return str ? str.replace(/ /g, '&nbsp;').replace(/(?:\r\n|\r|\n)/g, '<br />') : '';
}

/** Array, Object */
/**
 * 배열과 배열을 비교해서 포함되어 있는지 확인하는 함수
 * _targetArray : 대상 배열
 * _array : 원본 배열
 */
export function removeDuplicatedArray(_targetArray: Array<any>, _array: Array<any>) {
  let hasItems = false
  const filteredArray: Array<any> = []
  forEach(_array, (_item) => {
    hasItems = false
    forEach(_targetArray, (__item) => {
      if (JSON.stringify(_item) === JSON.stringify(__item)) hasItems = true
    })
    if (!hasItems) filteredArray.push(_item)
  })
  return filteredArray
}
/**
 * 배열과 배열을 비교해서 포함되어 있는지 확인하는 함수 (배열안의 데이터타입이 object인 경우)
 * _targetArray : 대상 배열
 * _array : 원본 배열
 * _key : 비교할 키
 */
export function removeDuplicatedArrayObject(
  _targetArray: Array<any>,
  _array: Array<any>,
  _key: string
) {
  let hasItems = false
  const filteredArray: Array<any> = []
  forEach(_array, (_item) => {
    hasItems = false
    forEach(_targetArray, (__item) => {
      if (_item[_key] === __item[_key]) {
        hasItems = true
      }
    })
    if (!hasItems) filteredArray.push(_item)
  })
  return filteredArray
}

/** file */
// Base64로 인코딩된 이미지, 텍스트 데이터 등을 Blob 유형으로 변환한다.
export function base64ToBlob(base64Data: string, contentType?: string, sliceSize?: number) {
  contentType = contentType || ''
  sliceSize = sliceSize || 512

  const byteCharacters = atob(base64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)
    if (slice && slice.length > 0) {
      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }
  }

  const blob = new Blob(byteArrays, {
    type: contentType
  })

  return blob
}
export function bytesToSize(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Bytes'
  const i: number = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10)
  if (i === 0) return `${bytes} ${sizes[i]}`
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`
}
export function getFileExtIcon(_fileExt?: string) {
  let iconExt = ''
  switch (_fileExt) {
    case 'pdf':
      iconExt = 'fas fa-file-pdf'
      break
    case 'xlsx':
    case 'xls':
      iconExt = 'fas fa-file-excel'
      break
    case 'doc':
    case 'docx':
      iconExt = 'fas fa-file-word'
      break
    case 'ppt':
    case 'pptx':
      iconExt = 'fas fa-file-powerpoint'
      break
    case 'txt':
      iconExt = 'fas fa-file-alt'
      break
    case 'zip':
      iconExt = 'fas fa-clone'
      break
    default:
      iconExt = 'fas fa-file-alt'
      break
  }
  return iconExt
}
export function getAccept(_fileExt: string) {
  let accept = 'application'
  if (_fileExt.indexOf('xls') >= 0) accept += '/vnd.ms-excel'
  else if (_fileExt.indexOf('doc') >= 0) accept += '/msword'
  else if (_fileExt.indexOf('ppt') >= 0) accept += '/vnd.ms-powerpoint'
  else if (_fileExt.indexOf('pdf') >= 0) accept += '/pdf'
  else accept += '/octet-stream'

  return accept
}
export function previewImage(file: previewFile) {
  return new Promise((_resolve, _reject) => {
    if (!file) return
    if (file.sysAttachFileId) {
      $http({
        url: selectConfig.com.upload.preview.url,
        method: 'get',
        params: {
          sysAttachFileId: encrypt(file.sysAttachFileId)
        }
      }).then((_result: any) => {
        const fileInfo = fileDownDecrypt(_result.data)
        if (fileInfo.id === file.sysAttachFileId) {
          _resolve('data:' + file.contentType + ';base64,' + fileInfo.bytes)
        } else {
          message.alert({
            title: '안내', // 안내
            message: '잘못된 정보입니다.',
            type: 'error' // success / info / warning / error
          })
          _reject('잘못된 정보입니다.')
        }
      })
    }
  })
}
export function previewImageParamTask(taskKey: string, taskClassCd: string) {
  return new Promise((_resolve, _reject) => {
    if (!taskKey || !taskClassCd) return
    $http({
      url: selectConfig.com.upload.previewParamTask.url,
      method: 'get',
      params: {
        taskKey: taskKey,
        taskClassCd: taskClassCd
      }
    }).then((_result: any) => {
      _resolve(_result.data)
    })
  })
}
export function uploderSetting(taskClassCd: string) {
  return new Promise((_resolve, _reject) => {
    if (!taskClassCd) return
    $http({
      url: $format(selectConfig.sys.attach.get.url, taskClassCd),
      method: 'get'
    }).then((_result: any) => {
      _resolve(_result.data)
    })
  })
}

/** cookie */
export function getCookie(cookieName: string) {
  return Cookies.get(cookieName)
}
export function setCookie(cookieName: string, contents: string, expireTime?: string) {
  if (typeof expireTime !== 'undefined' || expireTime != null) {
    const exTime = Number(expireTime) / 24
    Cookies.set(cookieName, contents, {
      expires: exTime
    })
  } else {
    Cookies.set(cookieName, contents)
  }
}

/** promise */
/**
 * 재귀함수로 promise 처리하는 함수
 * @param {Promise 함수와 옵션값을 가지고 있는 Object 배열} _promises
 * @param {배열의 index} _currIndex
 * _promises 내부 인자 값 설명
 * @param {Promise 함수} _promises[_currIndex].func
 * @param {Promise 함수의 parameter} _promises[_currIndex].param
 * @param {예외 처리용 메시지} _promises[_currIndex].exceptionMessage
 * @param {성공 처리용 메시지} _promises[_currIndex].successMessage
 */
export function recursivePromise(_promises: Array<recursivePromises>, _currIndex: number) {
  _currIndex = typeof _currIndex === 'undefined' ? 0 : _currIndex
  if (_currIndex >= _promises.length) return false
  const currentPromise = _promises[_currIndex]
  const currentPromiseFunc = currentPromise.func
  const param = currentPromise.param ? currentPromise.param : null

  const alertMessage = {
    title: '안내', // 안내
    message: '',
    type: 'warning'
  }

  if (typeof currentPromiseFunc !== 'function') return false
  currentPromiseFunc
    .call('', param)
    .then((_resolve: any) => {
      if (_resolve) {
        if (currentPromise.successMessage) {
          alertMessage.message = getLanguage(currentPromise.successMessage)
          alertMessage.type = 'success'
          // return window.getApp.$emit('ALERT', alertMessage)
        }
        return recursivePromise(_promises, ++_currIndex)
      } else {
        if (currentPromise.exceptionMessage) {
          alertMessage.message = getLanguage(currentPromise.exceptionMessage)
          // return window.getApp.$emit('ALERT', alertMessage)
        }
      }
    })
    .catch((_error: any) => {
      // if (_error) {
      //   if (window.getApp) {
      //     if (import.meta.env.MODE !== 'production') {
      //       window.getApp.$emit('APP_REQUEST_ERROR', _error)
      //     } else {
      //       window.getApp.$emit(
      //         'APP_REQUEST_ERROR',
      //         '서비스 처리 중 오류가 발생하였습니다.\n\r관리자에게 문의바랍니다.'
      //       )
      //     }
      //   }
      // } else {
      //   // nothing...
      // }
    })
}
/**
 * 재귀함수로 promise를 호출하는 진입 함수
 * @param {Promise 배열}} _promises
 */
export function orderedPromise(_promises: Array<recursivePromises>) {
  if (_promises.length <= 0) return
  recursivePromise(_promises, 0)
}

/** common api */
export function getComboItems(_codeGroupCd: string, _attrVal1?: string, useFlag?: string) {
  return new Promise((_resolve, _reject) => {
    let url = ''
    if (!_attrVal1) url = $format(selectConfig.sys.code.mst.list.url, _codeGroupCd)
    else url = $format(selectConfig.sys.code.mst.list.attr.url, _codeGroupCd, _attrVal1)
    $http({
      url: url,
      method: 'get'
    }).then((_result: any) => {
      if (!useFlag) {
        _resolve(_result.data)
      } else {
        _resolve(filter(_result.data, { useFlag: useFlag }))
      }
    })
  })
}
export function getMultiComboItems(_codeGroupCdArr: Array<string>) {
  return new Promise((_resolve, _reject) => {
    $http({
      url: selectConfig.sys.code.mst.list.multi.url,
      method: 'get',
      params: {
        codeGroupCds: _codeGroupCdArr
      }
    }).then((_result: any) => {
      // const returnData: { [key: string]: string | number | Array<any> } = {}
      const returnData: Record<string, string | number | Array<any>> = {}
      forEach(_codeGroupCdArr, (group) => {
        returnData[group] = filter(_result.data, { codeGrpCd: group })
      })
      _resolve(returnData)
    })
  })
}
export function getStepItems(_stepperGrpCd: string) {
  return new Promise((_resolve, _reject) => {
    $http({
      url: $format(selectConfig.sys.stepper.mst.list.url, _stepperGrpCd),
      method: 'get'
    }).then((_result: any) => {
      _resolve(_result.data)
    })
  })
}
export function getCodeName(_codeGroupCd: string, _cd: string) {
  let resp = ''
  $http({
    url: $format(selectConfig.sys.code.mst.get.url, _codeGroupCd, _cd),
    method: 'GET'
  }).then((_result: any) => {
    resp = _result.data.codeName
  })
  return resp
}

/** language */
const langJsonApi = '/json/lang/'
export function getLang() {
  return Cookies.get('language') || 'kr'
}
export function getLanguageJsonApi() {
  return `${langJsonApi}${getLang()}_language.json`
}
export function getLanguage(languageKey: string, format?: string): string {
  /** lang tran 호출 */
  const langTran = useLangTranStore()
  const { langs } = storeToRefs(langTran)

  if (!langs.value || langs.value.length === 0) return languageKey
  const labelList = langTran.langs
  const data = find(labelList, { languageKey: languageKey })
  let text = data ? data.conversionLanguage : ''
  if (text && format) {
    text = $format(text, format)
  }
  return text ? text : languageKey
}

/** excel */
export function getHeaders(sheet: WorkSheet) {
  const header: number = 0
  const hdr: Array<string | number> = []
  if (sheet == null || sheet['!ref'] == null) return []
  const range = sheet['!ref']
  let r
  switch (typeof range) {
    case 'string':
      r = safe_decode_range(range)
      break
    case 'number':
      r = safe_decode_range(sheet['!ref'])
      r.s.r = range
      break
    default:
      r = range
  }
  const rr = utils.encode_row(r.s.r)
  const cols = new Array(r.e.c - r.s.c + 1)
  for (let C = r.s.c; C <= r.e.c; ++C) {
    cols[C] = utils.encode_col(C)
    const val = sheet[cols[C] + rr]
    // if (header === 1) {
    //   hdr.push(C)
    // } else if (header === 2) {
    //   hdr.push(cols[C])
    // } else if (header === 3) {
    //   hdr.push(o.header[C - r.s.c])
    // } else {
    //   if (val === undefined) continue
    //   hdr.push(XLSX.utils.format_cell(val))
    // }
    switch (header) {
      case 1:
        hdr.push(C)
        break
      case 2:
        hdr.push(cols[C])
        break
      case 3:
        // hdr.push(o.header[C - r.s.c])
        break
      default:
        if (val === undefined) continue
        hdr.push(utils.format_cell(val))
    }
  }
  return hdr
}
function safe_decode_range(range: any) {
  const o = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }
  let idx = 0,
    i = 0,
    cc = 0
  const len = range.length
  for (idx = 0; i < len; ++i) {
    if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break
    idx = 26 * idx + cc
  }
  o.s.c = --idx

  for (idx = 0; i < len; ++i) {
    if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break
    idx = 10 * idx + cc
  }
  o.s.r = --idx

  if (i === len || range.charCodeAt(++i) === 58) {
    o.e.c = o.s.c
    o.e.r = o.s.r
    return o
  }

  for (idx = 0; i != len; ++i) {
    if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break
    idx = 26 * idx + cc
  }
  o.e.c = --idx

  for (idx = 0; i != len; ++i) {
    if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break
    idx = 10 * idx + cc
  }
  o.e.r = --idx
  return o
}

/** valid */
function getRequiredData(columns: Array<any>) {
  let required: Array<any> = []
  forEach(columns, (column) => {
    if (column.required === true) {
      required.push(column)
    }
    if (column.child && column.child.length > 0) {
      const _required = getRequiredData(column.child)
      if (_required && _required.length > 0) {
        required = concat(required, _required)
      }
    }
  })
  return required
}
export function validTable(
  columns: Array<any>,
  data: Array<any> | null | undefined,
  messageTarget?: stringNull,
  emptyFlag?: boolean
) {
  /** message 호출 */
  const { alert } = useMessage()
  const required = getRequiredData(columns)
  if (required && required.length > 0) {
    if (!data || data.length === 0) {
      if (!emptyFlag) {
        alert({
          title: '안내', // 안내
          message: !messageTarget
            ? '데이터가 없습니다.'
            : `[${messageTarget}] ${getLanguage('데이터가 없습니다.')}`,
          type: 'warning' // success / info / warning / error
        })
        return false
      } else {
        return true
      }
    }
    const checkItemType = map(required, 'type')
    const checkItem = map(required, 'name')
    const checkItemText: Array<string> = map(required, 'label')
    let isConti = true
    forEach(data, (item) => {
      let idx = 0
      forEach(checkItem, (check) => {
        if (!item[check]) {
          isConti = false
          return false
        } else if (Array.isArray(item[check]) && item[check].length === 0) {
          isConti = false
          return false
        } else if (checkItemType[idx] === 'proxy' && item[check] === '보기') {
          isConti = false
          return false
        }
        idx++
      })
    })

    if (!isConti) {
      alert({
        title: '안내', // 안내
        message:
          getLanguage('필수 입력값을 입력해 주세요.') + '\n[' + join(checkItemText, ', ') + ']',
        type: 'warning' // success / info / warning / error
      })
      return false
    } else {
      return true
    }
  } else {
    return true
  }
}

interface ibmTagItemType {
  title: string
  color: string
  sopImprovementId: string
  ibmClassCd: string
  ibmTooltip: string
}

/** improvement */
export function ibmTagItems(row: Record<string, string | number | Array<any> | any>) {
  const returnData: Array<ibmTagItemType> = []
  const splitId = split(row['sopImprovementIds'], ',')
  const splitStep = split(row['ibmStepNames'], ',')
  const splitClass = split(row['ibmClassCds'], ',')
  const splitTooltip = split(row['ibmTooltip'], '│')

  if (splitId.length === splitStep.length) {
    let i = 0
    const isClass = splitClass && splitClass.length > 0
    forEach(splitId, (item) => {
      let titleData = split(split(splitTooltip[i], '|')[0], ':')[1]
      if (titleData && titleData.length > 5) {
        titleData = titleData.substring(0, 5) + '...'
      }
      let title = `${titleData} [${splitStep[i]}]`
      if (isClass && splitClass[i] === 'IC00000005') {
        title = `${titleData} ${getLanguage('[즉시조치]')}`
      }
      returnData.push({
        title: title,
        color: isClass && splitClass[i] === 'IC00000005' ? 'light-blue' : 'red-6', // color ? color.colorClass : '',
        sopImprovementId: item,
        ibmClassCd: isClass ? splitClass[i] : '',
        ibmTooltip: splitTooltip[i]
      })
      i++
    })
  }
  return returnData
}
export function inspectIbmTagItems(
  row: Record<string, string | number | Array<any> | any>,
  otherKey: Array<string>
) {
  const returnData: Array<Record<string, string | number>> = []
  const splitId = split(row['sopImprovementIds'], ',')
  const splitStep = split(row['ibmStepNames'], ',')
  const splitClass = split(row['ibmClassCds'], ',')
  const splitTooltip = split(row['ibmTooltip'], '│')
  const splitTableKey = split(row['tableKeys'], ',')
  if (splitId.length === splitStep.length) {
    let i = -1
    const isClass = splitClass && splitClass.length > 0
    forEach(splitId, (item) => {
      i++

      if (otherKey && otherKey.length > 0) {
        if (splitTableKey[i] !== row[otherKey[1]]) return
      }
      // let color = find(colorItems, { stepperMstNm: splitStep[i] });
      let titleData = split(split(splitTooltip[i], '|')[0], ':')[1]
      if (titleData && titleData.length > 5) {
        titleData = titleData.substring(0, 5) + '...'
      }
      let title = `${titleData} [${splitStep[i]}]`
      if (isClass && splitClass[i] === 'IC00000005') {
        title = `${titleData} ${getLanguage('[즉시조치]')}`
      }
      returnData.push({
        title: title,
        color: isClass && splitClass[i] === 'IC00000005' ? 'light-blue' : 'red-6', // color ? color.colorClass : '',
        sopImprovementId: item,
        ibmClassCd: isClass ? splitClass[i] : '',
        ibmTooltip: splitTooltip[i]
      })
    })
  }
  return returnData
}
export function fmImprTagItems(row: Record<string, string | number | Array<any> | any>) {
  const returnData: Array<Record<string, string | number>> = []
  const splitId = split(row['ram4mAssessImprIds'], ',')
  const splitStep = split(row['stepFlagNames'], ',')
  const splitTooltip = split(row['ibmFmTooltip'], '│')

  if (splitId.length === splitStep.length) {
    let i = 0
    forEach(splitId, (item) => {
      let titleData = split(split(splitTooltip[i], '|')[0], ':')[1]
      if (titleData && titleData.length > 5) {
        titleData = titleData.substring(0, 5) + '...'
      }
      const title = `${titleData} [${splitStep[i]}]`
      returnData.push({
        title: title,
        color: 'red-6',
        ram4mAssessImprId: item,
        ibmFmTooltip: splitTooltip[i]
      })
      i++
    })
  }
  return returnData
}
export function isSame(array1: Array<any>, array2: Array<any>) {
  let isSame = true
  if (!array1 || !array2) return false

  let idx = 0
  forEach(array1, (item1: any) => {
    for (const [key, value] of Object.entries(item1)) {
      isSame = value === array2[idx][key]

      if (!isSame) return false
    }
    idx++
  })

  return isSame
}
export function isSameLength(array1: Array<any>, array2: Array<any>) {
  let isSame = true

  if (!array1 || !array2) return false

  if (array1.length !== array2.length) return false

  let idx = 0
  forEach(array1, (item1: any) => {
    for (const [key, value] of Object.entries(item1)) {
      if (typeof value === 'string') {
        isSame = value === array2[idx][key]

        if (!isSame) {
          return false
        }
      }
    }
    idx++
  })

  return isSame
}
/** row-key를 사용하는 경우 row를 다시 조회하여 셋팅할때 duplicate key update가 발생 */
/** 따라서 다음과 같이 초기화 후에 사용 */
export function setGridData(gridData: any, injectData: Array<any>, targetKey?: string) {
  return new Promise((_resolve, _reject) => {
    gridData[targetKey ? targetKey : 'data'] = []

    _resolve(
      delay(5).then(() => {
        gridData[targetKey ? targetKey : 'data'] = _.cloneDeep(injectData)
      })
    )
  })
}

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

/******************************
 * TODO (목적): 날짜를 'YYYY-MM-DD' 형식으로 변환
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
export function formatDate(dateString: stringNull) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 +1, 1월은 01로 변환
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
/******************************
 * TODO (목적): 키 이름 변경 (업로드엑셀파일의 헤더값과 마스터 값이 불일치할경우 마스터 값으로 변경)
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
export function renameKey(obj: any, oldKey: string, newKey: string) {
  // Key값 바꾸면서 검진항목 중 빈 값들은 필터
  if (oldKey !== newKey && obj[oldKey]) {
    obj[newKey] = obj[oldKey]
    delete obj[oldKey]
  }
}

/******************************
 * TODO (목적): array를 tree 구조로 변경
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
export function arrayToTree<T>(
  data: T[],
  options?: Partial<{
    parentProperty: string // 부모 항목을 식별하는 속성의 이름
    customID: string // 항목의 고유 ID를 식별하는 속성의 이름
  }>
): Array<T & { children?: Array<T> }> {
  if (!data || data.length === 0) return []

  const { parentProperty = 'parentId', customID = 'id' } = options || {}
  const tree: Array<T & { children?: Array<T> }> = []
  const lookup: Record<string, T & { children?: Array<T> }> = {}

  // 데이터 각각에 대해 트리의 노드를 생성
  data.forEach((item) => {
    const node = { ...item, children: [] } as T & { children: Array<T> }
    lookup[(item as any)[customID]] = node
  })

  // 부모-자식 관계 설정
  data.forEach((item) => {
    const parentId = (item as any)[parentProperty]
    const id = (item as any)[customID]

    if (parentId && lookup[parentId]) {
      // 부모가 존재하면 부모의 children 배열에 추가
      lookup[parentId].children = lookup[parentId].children || []
      lookup[parentId].children.push(lookup[id])
    } else {
      // 부모가 없으면 최상위 노드로 추가
      tree.push(lookup[id])
    }
  })
  return tree
}
