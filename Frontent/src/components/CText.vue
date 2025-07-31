<!--
목적 : 확장검색 기능을 지원하는 컴포넌트
Detail :
 *
examples:
 *
-->
<template>
  <div class="fix-height" :class="[counter ? 'c-text-counter' : '']">
    <c-text-string
      v-if="type !== 'number'"
      :name="name"
      :placeholder="placeholder"
      :editable="editable"
      :maxlength="maxlength"
      :beforeIcon="beforeIcon"
      :prependIcon="prependIcon"
      :appendIcon="appendIcon"
      :afterIcon="afterIcon"
      :required="required"
      :clearable="clearable"
      :disabled="disabled"
      :readonly="readonly"
      :type="type"
      :counter="counter"
      :close="close"
      :search="search"
      :detail="detail"
      :prefix="prefix"
      :suffix="suffix"
      :label="label"
      :mask="mask"
      :fillMask="fillMask"
      :beforeText="beforeText"
      :dense="dense"
      :phoneNumberCheck="phoneNumberCheck"
      :bizNumberCheck="bizNumberCheck"
      :error="error"
      :validMessage="validMessage"
      v-model:value="value"
      @dataChange="dataChange"
      @searchPop="searchPop"
      @detailPop="detailPop"
      @callback="callback"
      @blur="blur"
    />
    <c-text-number
      v-else
      :name="name"
      :placeholder="placeholder"
      :editable="editable"
      :maxlength="maxlength"
      :beforeIcon="beforeIcon"
      :prependIcon="prependIcon"
      :appendIcon="appendIcon"
      :afterIcon="afterIcon"
      :required="required"
      :clearable="clearable"
      :disabled="disabled"
      :readonly="readonly"
      :type="type"
      :counter="counter"
      :close="close"
      :search="search"
      :detail="detail"
      :prefix="prefix"
      :suffix="suffix"
      :label="label"
      :mask="mask"
      :fillMask="fillMask"
      :beforeText="beforeText"
      :dense="dense"
      :numberOptions="props.numberOptions"
      :customClass="customClass"
      :error="error"
      :validMessage="validMessage"
      v-model:value="value"
      @dataChange="dataChange"
      @searchPop="searchPop"
      @detailPop="detailPop"
      @callback="callback"
    />
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
  name: 'CText'
})

/******************************
 * @Pinia_store_선언
 * TODO 반응형 유지를 위해 storeToRefs 사용 (function은 사용 X)
 *******************************/

/******************************
 * @Emit_선언
 *******************************/
const emits = defineEmits(['input', 'dataChange', 'callback', 'searchPop', 'detailPop', 'blur'])

/******************************
 * @Vue_관련_선언 (ex. vue-router)
 *******************************/

/******************************
 * @Interface_선언
 *******************************/
interface propType {
  name?: string
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
  customClass?: string
  close?: boolean
  search?: boolean
  detail?: boolean
  prefix?: string
  suffix?: string
  label?: string
  mask?: string
  fillMask?: string
  beforeText?: string
  dense?: boolean
  numberOptions?: object | any
  phoneNumberCheck?: boolean
  bizNumberCheck?: boolean
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
  placeholder: '',
  editable: true,
  maxlength: 400,
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
  customClass: 'text-right',
  close: true,
  search: false,
  detail: false,
  prefix: '',
  suffix: '',
  label: '',
  mask: '',
  beforeText: '',
  dense: true,
  // eslint-disable-next-line vue/require-valid-default-prop
  numberOptions: { currency: null },
  phoneNumberCheck: false,
  bizNumberCheck: false
})

/******************************
 * @VModel_선언
 *******************************/
// value: objectStringNumber | arrayObject | undefined | null
const value = defineModel('value', {
  default: null,
  type: [String, Number] as PropType<string | number>
})

/******************************
 * @Data_선언
 * TODO ref, reactive 사용, 불명확한 단어 사용 X (ex. data, date)
 *******************************/

/******************************
 * @Computed_선언
 *******************************/
/******************************
 * @Watch_선언
 *******************************/
/******************************
 * @Life_cycle_선언
 *******************************/

/******************************
 * @Function_선언
 * TODO function 주석 작성 (asdffunctionannotation 사용)
 *  * arrow function 사용해도 무관
 *******************************/

/******************************
 * TODO (목적): 데이터 변경
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function dataChange() {
  emits('input', value.value)
  emits('dataChange', value.value)
}
/******************************
 * TODO (목적): 검색 팝업
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function searchPop() {
  emits('searchPop', value.value)
}
/******************************
 * TODO (목적): 상세 팝업
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function detailPop() {
  emits('detailPop', value.value)
}
/******************************
 * TODO (목적): 아이콘 클릭 시 callback
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function callback(_item: any) {
  emits(_item.callbackName, _item)
}
/******************************
 * TODO (목적): blur
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function blur() {
  emits('blur')
}
/******************************
 * @Provide_선언
 *  ! types 폴더에 type 명시
 *******************************/
</script>
