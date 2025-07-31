<template>
  <div class="fix-height div-nobottom-layout">
    <q-field
      v-show="false"
      ref="customDatepicker"
      class="customDate"
      :class="[beforeText ? 'before-field' : '']"
      filled
      stack-label
      color="orange-custom"
      :rules="[validRule]"
      :validMessage="validMessage"
      :label="$language(label)"
      :disable="disabled || !editable"
      v-model="valueText"
      v-on:click.self.prevent="click"
      @focus="click"
      @blur="blur"
    >
      <template v-slot:label v-if="label">
        <div class="row items-center all-pointer-events">
          <b>
            <span class="formLabelTitle">{{ $language(label) }}</span>
            <i v-if="required" class="material-icons labelfrontIcon text-requiredColor">check</i>
          </b>
        </div>
      </template>
      <template v-slot:control> {{ valueText }} </template>

      <template v-slot:before>
        <template v-if="beforeText">
          <div class="custom-text-before q-pl-xs q-pr-xs bg-blue-7 text-white">
            {{ beforeText }}
          </div>
        </template>
      </template>

      <template v-slot:append>
        <q-icon
          v-if="editable && !disabled"
          name="close"
          class="cursor-pointer dateCloseIcon"
          @click.self.prevent="reset"
        />
      </template>
    </q-field>

    <!-- :open="isOpen" -->
    <div class="row items-center all-pointer-events customdatelabel" v-if="label">
      <b>
        <span class="formLabelTitle-2">{{ $language(label) }}</span>
        <i v-if="required" class="material-icons labelfrontIcon text-requiredColor">check</i>
      </b>
    </div>
    <!-- :not-before="start"
      :not-after="end" -->
    <date-picker
      v-model:value="value"
      :width="datepickerWidth"
      :lang="krLanguage"
      :range="range"
      :type="type"
      :format="format"
      :value-type="format"
      :disabled-date="disabledDate"
      :clearable="clearable"
      :append-to-body="appendToBody"
      class="cdatetimepic"
      input-class="inputClass"
      popup-class="datepopupClass"
      :confirm="isConfirm"
      confirmText="ok"
      :minute-step="minuteStep"
      :time-picker-options="timePickerOptions"
      :show-time-header="true"
      :time-title-format="timeTitleFormat"
      :disabled="disabled || !editable"
      @change="change"
      @confirm="confirm"
      @calendar-change="calendarChange"
      @panel-change="panelChange"
      @clear="clear"
    >
      <template v-slot:header v-if="type == 'date'">
        <q-btn-group outline v-if="range">
          <button type="button" class="cal-btn-header" @click="dateMovePrevYear">작년</button>
          <button type="button" class="cal-btn-header" @click="monthMove(-12)">-1Y</button>
          <button type="button" class="cal-btn-header" @click="monthMove(-6)">-6M</button>
          <button type="button" class="cal-btn-header" @click="monthMove(-3)">-3M</button>
          <button type="button" class="cal-btn-header" @click="monthMove(-1)">-1M</button>
          <button type="button" class="cal-btn-header" @click="dateMove(-7)">-1W</button>
          <button type="button" class="cal-btn-header" @click="monthMove(0)">Today</button>
          <button type="button" class="cal-btn-header" @click="monthMoveRange(1)">-1M~+1M</button>
          <button type="button" class="cal-btn-header" @click="monthMoveRange(3)">-3M~+3M</button>
          <button type="button" class="cal-btn-header" @click="dateMoveThisYear">올해</button>
        </q-btn-group>
        <q-btn-group outline v-else>
          <button type="button" class="cal-btn-header" @click="dayMove(0)">Today</button>
        </q-btn-group>
      </template>
    </date-picker>
  </div>
</template>

<script setup lang="ts">
/******************************
 * #Important 사용하지 않는 로직, 변수 등 선언 X
 *******************************/

/******************************
 * @import_선언
 * TODO 아래 순서에 맞추어 import (각 순서 마다 띄우기)
 *  * 1. Dependency
 *  * 2. Utils
 *  * 3. Types
 *  * 4. Stores
 *  * 5. Vue
 *  * 6. Etc (생길 시 얘기.)
 *******************************/
import DatePicker from 'vue-datepicker-next'
import ko from 'vue-datepicker-next/locale/ko.es'
import en from 'vue-datepicker-next/locale/en.es'
import ja from 'vue-datepicker-next/locale/ja.es'
import zh_cn from 'vue-datepicker-next/locale/zh-cn.es'
import zh_tw from 'vue-datepicker-next/locale/zh-tw.es'
import moment, { unitOfTime } from 'moment'

/******************************
 * @컴포넌트_옵션_선언
 * TODO 이름 정의 (파일 이름 그대로 지정)
 *******************************/
defineOptions({
  name: 'CDatepicker'
})

/******************************
 * @Pinia_store_선언
 * TODO 반응형 유지를 위해 storeToRefs 사용 (function은 사용 X)
 *******************************/

/******************************
 * @Emit_선언
 *******************************/
const emits = defineEmits(['datachange'])

/******************************
 * @Vue_관련_선언 (ex. vue-router)
 *******************************/

/******************************
 * @Interface_선언
 *******************************/
interface timePickerOptionsType {
  start: string
  step: string
  end: string
  format?: string
}
interface propType {
  name: string
  label?: string
  editable?: boolean
  disabled?: boolean
  required?: boolean
  range?: boolean
  type?: string
  minuteStep?: number
  default?: string | arrayString
  defaultPeriod?: string
  placeholder?: string
  datepickerWidth?: string
  start?: string
  end?: string
  clearable?: boolean
  timePickerOptions?: timePickerOptionsType
  viewFormat?: string
  dense?: boolean
  beforeText?: string
  defaultStart?: string
  defaultEnd?: string
  appendToBody?: boolean
  error?: ErrorFunction
  validMessage?: stringNull
}

/******************************
 * @inject_선언
 *******************************/
const $language = inject('$language') as GetTranLanguageFunction

/******************************
 * @Props_선언
 * TODO type & default 작성
 *******************************/
const props = withDefaults(defineProps<propType>(), {
  name: 'date',
  label: '',
  editable: true,
  disabled: false,
  required: false,
  range: false,
  type: 'date',
  minuteStep: 0,
  default: '',
  defaultPeriod: '1m',
  placeholder: '',
  datepickerWidth: '100%',
  start: '',
  end: '',
  clearable: true,
  viewFormat: '',
  dense: true,
  beforeText: '',
  defaultStart: '',
  defaultEnd: '',
  appendToBody: true
})

/******************************
 * @VModel_선언
 *******************************/
const value = defineModel('value', {
  default: '',
  type: [Array, String] as PropType<string | arrayString | null | undefined>
})

/******************************
 * @Data_선언
 * TODO ref, reactive 사용, 불명확한 단어 사용 X (ex. data, date)
 *******************************/
/** TODO : datepicker 내부 값, YYYY-MM-DD(ISO 표준) 형태의 값 */
const isOpen = ref(false)
const valueText = ref<string | null>('')
const timer = ref<NodeJS.Timeout>(setTimeout(() => {}, 1))

/******************************
 * @Computed_선언
 *******************************/
const isConfirm = computed(() => props.range || props.type === 'time' || props.type === 'datetime')
const format = computed(() => {
  if (props.viewFormat) {
    return props.viewFormat
  }
  let returnText = 'YYYY-MM-DD'
  if (props.type === 'month') {
    returnText = 'YYYY-MM'
  } else if (props.type === 'year') {
    returnText = 'YYYY'
  } else if (props.type === 'time') {
    if (props.minuteStep > 0) {
      returnText = 'HH:mm'
    } else {
      returnText = 'HH:mm:ss'
    }
  } else if (props.type === 'datetime') {
    if (props.minuteStep > 0) {
      returnText = 'YYYY-MM-DD HH:mm'
    } else {
      returnText = 'YYYY-MM-DD HH:mm:ss'
    }
  } else {
    returnText = 'YYYY-MM-DD'
  }
  return returnText
})
const timeTitleFormat = computed(() => {
  let returnText = 'HH:mm'
  if (props.type === 'datetime' || props.type === 'date') {
    if (props.minuteStep > 0) {
      if (getLang() === 'kr') {
        returnText = 'HH시mm분'
      }
    } else {
      if (getLang() === 'kr') {
        returnText = 'HH시mm분s초'
      } else {
        returnText = 'HH:mm:s'
      }
    }
  }
  return returnText
})
const krLanguage = computed(() => {
  let lang = ko
  if (getLang() === 'en') {
    lang = en
  } else if (getLang() === 'ja') {
    lang = ja
  } else if (getLang() === 'zh_cn') {
    lang = zh_cn
  } else if (getLang() === 'zh_tw') {
    lang = zh_tw
  }
  return lang
})

/******************************
 * @Watch_선언
 *******************************/
watch(
  () => [props.default, props.defaultStart, props.defaultEnd],
  () => {
    setDefault()
  }
)
watch(
  value,
  () => {
    setValueText()
  },
  {
    deep: true
  }
)

/******************************
 * @Life_cycle_선언
 *******************************/
onBeforeMount(() => {
  setValueText()
  setDefault()
})

/******************************
 * @Function_선언
 * TODO function 주석 작성 (asdffunctionannotation 사용)
 *  * arrow function 사용해도 무관
 *******************************/
/******************************
 * TODO (목적): datepicker v-model 정보를 화면에 표시할 text값 지정
 *******************************/
function setValueText() {
  if (!props.range && !Array.isArray(value.value)) {
    valueText.value = _.clone(String(value.value))
  } else {
    if (value.value && value.value.length === 2 && value.value[0]) {
      valueText.value = value.value[0] + ' ~ ' + value.value[1]
    } else {
      valueText.value = ''
    }
  }
}
/******************************
 * TODO (목적): datepicker v-model 변경 시 부모에게 v-model 정보 전달, datepicker의 달력이 confirm 형식이였을 경우 직접 달력 닫기
 *******************************/
function change() {
  setValueText()
  if (
    props.range &&
    Array.isArray(value.value) &&
    value.value &&
    value.value.length === 2 &&
    !value.value[0]
  ) {
    value.value = null
  }
  emits('datachange', value.value)

  if (!isConfirm.value) {
    isOpen.value = false
  }
}
/******************************
 * TODO (목적): 달력에서 비활성화 할 날짜 지정
 * @param (1): date(Date), 달력의 날짜
 * @return (반환): 받은 날짜가 start, end 사이에 존재할 경우 true, 그 외 false
 *******************************/
function disabledDate(date: Date) {
  let startCheck = false
  let endCheck = false
  if (props.start) {
    startCheck = date < moment(props.start).toDate()
  }
  if (props.end) {
    endCheck = date > moment(props.end).toDate()
  }
  return startCheck || endCheck
}
/******************************
 * TODO (목적): 날짜 초기화
 *******************************/
function reset() {
  valueText.value = ''
  value.value = null
}
function clear() {
  valueText.value = ''
  value.value = null
}
/******************************
 * TODO (목적): field 영역 클릭 시 달력 팝업 표시
 *******************************/
function click() {
  if (props.editable && !props.disabled) {
    isOpen.value = true
  }
}
/******************************
 * TODO (목적): 달력의 confirm 처리 후 팝업 닫기
 *******************************/
function confirm() {
  isOpen.value = false
}
/******************************
 * TODO (목적): 달력 외 영역 클릭 시 팝업 닫기
 *******************************/
function blur() {
  if (!isConfirm.value) {
    timer.value = setTimeout(() => {
      isOpen.value = false
    }, 200)
  }
}
/******************************
 * TODO (목적): 달력이 변경되었을 시 timer 종료
 *******************************/
function calendarChange() {
  clearTimeout(timer.value)
}
/******************************
 * TODO (목적): 달력 판넬이 변경되었을 시 timer 종료
 *******************************/
function panelChange() {
  clearTimeout(timer.value)
}
/******************************
 * TODO (목적): 달력의 default값을 지정
 *******************************/
function setDefault() {
  if (!value.value || (value.value && value.value.length === 0)) {
    // 범위인 경우 defaultStart, defaultEnd 값이 들어온 경우에 한에서 처리
    if (
      props.range &&
      props.defaultStart &&
      props.defaultEnd &&
      (!value.value || value.value.length === 0)
    ) {
      const typeList: Array<unitOfTime.DurationConstructor> = ['y', 'M', 'd']
      const start = {
        type: 'd' as unitOfTime.DurationConstructor,
        num: 0
      }
      const end = {
        type: 'd' as unitOfTime.DurationConstructor,
        num: 0
      }
      _.forEach(typeList, (item) => {
        if (_.indexOf(props.defaultStart, item) > -1) {
          start.type = item
          start.num = Number(_.replace(props.defaultStart, start.type, ''))
        }
        if (_.indexOf(props.defaultEnd, item) > -1) {
          end.type = item
          end.num = Number(_.replace(props.defaultEnd, end.type, ''))
        }
      })

      value.value = [
        props.defaultStart === 'startOfYear'
          ? getFirstDayThisYear()
          : moment().add(start.num, start.type).format(format.value),
        moment().add(end.num, end.type).format(format.value)
      ]
    }

    if (!props.default) return

    if (props.default === 'today') {
      if (props.range) {
        value.value = [moment().format(format.value), moment().format(format.value)]
      } else {
        value.value = moment().format(format.value)
      }
    }
  }
}
/******************************
 * TODO (목적): 달력 값 월 단위 이동
 * @param (1): 이동할 월
 *******************************/
function monthMove(_mon: number) {
  if (_mon == 0) {
    value.value = [getToday(), getToday()]
  } else if (_mon > 0) {
    value.value = [getToday(), getAddMonth(getToday(), _mon)]
  } else if (_mon < 0) {
    value.value = [getAddMonth(getToday(), _mon), getToday()]
  }
}
/******************************
 * TODO (목적): 달력 값 일 단위 이동
 * @param (1): 이동할 일
 *******************************/
function dateMove(_day: number) {
  if (_day == 0) {
    value.value = [getToday(), getToday()]
  } else if (_day > 0) {
    value.value = [getToday(), getAddDay(getToday(), _day)]
  } else if (_day < 0) {
    value.value = [getAddDay(getToday(), _day), getToday()]
  }
}
/******************************
 * TODO (목적): 달력 값 일 이동
 * @param (1): 이동할 일
 *******************************/
function dayMove(_day: number) {
  if (_day == 0) {
    value.value = getToday()
  } else if (_day > 0) {
    value.value = getAddDay(getToday(), _day)
  } else if (_day < 0) {
    value.value = getAddDay(getToday(), _day)
  }
}
/******************************
 * TODO (목적): 달력 값 월 단위 범위 이동
 * @param (1): 이동할 월
 *******************************/
function monthMoveRange(_mon: number) {
  value.value = [getAddMonth(getToday(), _mon * -1), getAddMonth(getToday(), _mon * 1)]
}
/******************************
 * TODO (목적): 달력 값 올해로 이동
 *******************************/
function dateMoveThisYear() {
  value.value = [getFirstDayThisYear(), getLastDayThisYear()]
}
/******************************
 * TODO (목적): 달력 값 작년으로 이동
 *******************************/
function dateMovePrevYear() {
  value.value = [getPrevYear(1) + '-01-01', getPrevYear(1) + '-12-31']
}
/******************************
 * TODO (목적): 유효성 검증
 * @param (1): 값
 * @return (반환): true: 통과, 그 외 : 통과X
 *******************************/
function validRule(val: any) {
  let validCheck = true
  if (props.required) {
    validCheck = Boolean(val) && val !== 'null' && val !== 'undefined' && val.length > 0
  }

  if (validCheck && props.error) {
    validCheck = props.error(val)
  }
  return validCheck
}

/******************************
 * @Provide_선언
 *  ! types 폴더에 type 명시
 *******************************/
</script>
