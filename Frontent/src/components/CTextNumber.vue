<!--
목적 : 확장검색 기능을 지원하는 컴포넌트
Detail :
 *
examples:
 *
-->
<template>
  <div>
    <q-input
      ref="ctext"
      bottom-slots
      no-error-icon
      stack-label
      :label="$language(label)"
      type="text"
      :counter="counter"
      :maxlength="maxlength"
      class="customText"
      :class="[
        prefix ? 'prefix-custom-text' : '',
        beforeText ? 'before-text' : '',
        afterIcon ? 'customText-btn' : '',
        prefix != '' ? 'customText-prefix' : '',
        suffix != '' ? 'customText-suffix' : ''
      ]"
      :prefix="prefix"
      :suffix="suffix"
      :mask="mask"
      :placeholder="$language(placeholder)"
      fill-mask
      :input-class="customClass"
      color="orange-custom"
      :bg-color="type === 'textarea' ? 'grey-1' : ''"
      :rules="[validRule]"
      :validMessage="validMessage"
      :disable="disabled || !editable"
      :readonly="readonly"
      v-model="vValue"
      @update:model-value="input"
      @focus="focusInput"
      @blur="blurInput"
      @keydown="onlyNumber"
      @v-on:input="onlyNumber"
    >
      <!-- v-currency="numberOptions" -->
      <template v-slot:label>
        <div v-if="label" class="row items-center all-pointer-events">
          <b>
            <span class="formLabelTitle">{{ $language(props.label) }}</span>
            <i v-if="required" class="material-icons labelfrontIcon text-requiredColor">check</i>
          </b>
        </div>
      </template>

      <template v-slot:before>
        <template v-if="beforeIcon && beforeIcon.length > 0">
          <q-icon
            v-for="(icon, index) in beforeIcon"
            :key="index"
            :name="String(icon.name)"
            class="textOtherIcon"
            :class="{ 'cursor-pointer': icon.click }"
            @click="iconClick(icon)"
          >
            <q-tooltip v-if="icon.tooltip">{{ icon.tooltip }}</q-tooltip>
          </q-icon>
        </template>
        <template v-if="beforeText">
          <div class="custom-text-before q-pl-xs q-pr-xs bg-blue-7 text-white">
            {{ beforeText }}
          </div>
        </template>
      </template>

      <template v-slot:prepend v-if="prependIcon && prependIcon.length > 0">
        <q-icon
          v-for="(icon, index) in prependIcon"
          :key="index"
          :name="String(icon.name)"
          class="textOtherIcon"
          :class="{ 'cursor-pointer': icon.click }"
          @click="iconClick(icon)"
        >
          <q-tooltip v-if="icon.tooltip">{{ icon.tooltip }}</q-tooltip>
        </q-icon>
      </template>

      <template v-slot:append>
        <div
          v-if="detail && !disabled && editable"
          class="vendor-self cursor-pointer"
          @click="detailClick"
        >
          {{ $language('상세') }}
        </div>
        <q-icon
          v-if="search && !disabled && editable"
          name="search"
          @click="searchClick"
          class="cursor-pointer textCloseIcon"
        />
        <q-icon
          v-if="close && !disabled && editable && !readonly"
          name="close"
          @click="closeClick"
          class="cursor-pointer textCloseIcon"
        />
        <template v-if="appendIcon && appendIcon.length > 0">
          <q-icon
            v-for="(icon, index) in appendIcon"
            :key="index"
            :name="String(icon.name)"
            class="textOtherIcon"
            :class="{ 'cursor-pointer': icon.click }"
            @click="iconClick(icon)"
          >
            <q-tooltip v-if="icon.tooltip">{{ icon.tooltip }}</q-tooltip>
          </q-icon>
        </template>
      </template>

      <!-- <template v-slot:hint>
      </template> -->

      <template v-slot:after v-if="afterIcon && afterIcon.length > 0">
        <slot name="afterIconPre" />
        <q-btn
          v-for="(icon, index) in afterIcon"
          :key="index"
          unelevated
          flat
          size="xs"
          class="textOtherIcon"
          :class="{ 'cursor-pointer': icon.click }"
          :color="String(icon.color) == 'teal' ? 'light-blue' : String(icon.color)"
          :icon="String(icon.name)"
          @click="iconClick(icon)"
        />
        <slot name="afterIconAft" />
      </template>
    </q-input>
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

/******************************
 * @컴포넌트_옵션_선언
 * TODO 이름 정의 (파일 이름 그대로 지정)
 *******************************/
defineOptions({
  name: 'CTextNumber'
})

/******************************
 * @Pinia_store_선언
 * TODO 반응형 유지를 위해 storeToRefs 사용 (function은 사용 X)
 *******************************/

/******************************
 * @Emit_선언
 *******************************/
const emits = defineEmits([
  'update:value',
  'dataChange',
  'callback',
  'searchPop',
  'detailPop',
  'blur'
])

/******************************
 * @Vue_관련_선언 (ex. vue-router)
 *******************************/

/******************************
 * @Interface_선언
 *******************************/
interface propType {
  name?: string
  value?: string | number | null
  placeholder?: string
  editable?: boolean
  maxlength?: number
  beforeIcon?: arrayObject | undefined | null
  prependIcon?: arrayObject | undefined | null
  appendIcon?: arrayObject | undefined | null
  afterIcon?: arrayObject | undefined | null
  required?: boolean
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
  type?: any
  counter?: boolean
  close?: boolean
  search?: boolean
  detail?: boolean
  prefix?: string
  suffix?: string
  label?: string
  mask?: string
  beforeText?: string
  dense?: boolean
  customClass?: string
  numberOptions?: object | any
  error?: ErrorFunction
  validMessage?: stringNull
}

/******************************
 * @inject_선언
 *******************************/

/******************************
 * @Props_선언
 * TODO type & default 작성
 *******************************/
const props = withDefaults(defineProps<propType>(), {
  name: '',
  value: 0,
  placeholder: '',
  editable: true,
  maxlength: 30,
  beforeIcon: null,
  prependIcon: null,
  appendIcon: null,
  afterIcon: null,
  required: false,
  clearable: true,
  disabled: false,
  readonly: false,
  type: 'text',
  counter: false,
  close: true,
  search: false,
  detail: false,
  prefix: '',
  suffix: '',
  label: '',
  mask: '',
  beforeText: '',
  dense: true,
  customClass: 'text-right',
  // eslint-disable-next-line vue/require-valid-default-prop
  numberOptions: { currency: null }
})

/******************************
 * @VModel_선언
 *******************************/
// value: objectStringNumber | arrayObject | undefined | null

/******************************
 * @Data_선언
 * TODO ref, reactive 사용, 불명확한 단어 사용 X (ex. data, date)
 *******************************/
const vValue = ref<string>('')
const ctext: any = ref(null)

/******************************
 * @Computed_선언
 *******************************/

/******************************
 * @Watch_선언
 *******************************/
watch(
  () => props.value,
  () => {
    setValueAtWatch()
  }
)
/******************************
 * @Life_cycle_선언
 *******************************/
onBeforeMount(() => {
  init()
})

/******************************
 * @Function_선언
 * TODO function 주석 작성 (asdffunctionannotation 사용)
 *  * arrow function 사용해도 무관
 *******************************/
/******************************
 * TODO (목적):
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function init() {
  setValueAtWatch()
}
/******************************
 * TODO (목적): iconClick시 부모에게 emit한다.
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function input() {
  // TODO : 부모에게 변경여부 전달
  const splitData = _.split(vValue.value, '.')
  if (splitData && splitData.length > 1 && String(splitData[1]) == '00') {
    vValue.value = splitData[0]
  }
  setTimeout(() => {
    emits('dataChange', vValue.value)
    emits('update:value', vValue.value)
    // emits('input', getValue(ctext.value))
    // emits('dataChange', getValue(ctext.value))
  }, 200)
}
/******************************
 * TODO (목적): , 제거
 *******************************/
function focusInput() {
  vValue.value = _.replace(vValue.value, /[,]/g, '')
}
/******************************
 * TODO (목적): , 표시
 *******************************/
function blurInput() {
  vValue.value = toThousandFilter(Number(_.replace(vValue.value, /[^-.0-9]/g, '')), true) as string
}
/******************************
 * TODO (목적): 숫자만 들어가게 처리
 *******************************/
function onlyNumber() {
  vValue.value = _.replace(vValue.value, /[^-.0-9]/g, '')
}

/******************************
 * TODO (목적): iconClick시 부모에게 emit한다.
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function setValueAtWatch() {
  vValue.value = String(
    toThousandFilter(Number(_.replace(String(props.value || ''), /[^-.0-9]/g, '')), true)
  )
  // setValue(ctext.value, value)
}
/******************************
 * TODO (목적): iconClick시 부모에게 emit한다.
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function iconClick(_item: objectStringNumber) {
  if (!_item.callbackName) {
    return
  }
  emits('callback', _item)
}
/******************************
 * TODO (목적): 입력값 초기화
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function closeClick() {
  vValue.value = ''
  emits('update:value', vValue.value)
  emits('dataChange', vValue.value)
}
/******************************
 * TODO (목적): 입력값 초기화
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function searchClick() {
  emits('searchPop', vValue.value)
}
/******************************
 * TODO (목적): 입력값 초기화
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function detailClick() {
  emits('detailPop', vValue.value)
}
/******************************
 * TODO (목적):
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
// function focus() {
//   setTimeout(() => {
//     ctext.value.focus()
//     ctext.value.select()
//   }, 100)
// }
/******************************
 * TODO (목적): 유효성 검증
 * @param (1): 값
 * @return (반환): true: 통과, 그 외 : 통과X
 *******************************/
function validRule(val: any) {
  let validCheck = true
  if (props.required) {
    validCheck = Boolean(val) && val.length > 0
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
