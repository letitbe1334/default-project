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
      :type="type"
      :counter="counter"
      :maxlength="maxlength"
      unmasked-value
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
      :fill-mask="fillMask"
      color="orange-custom"
      :bg-color="type === 'textarea' ? 'grey-1' : ''"
      :rules="[validRule]"
      :validMessage="validMessage"
      :disable="disabled || !editable"
      :readonly="readonly"
      v-model="value"
      @update:model-value="input"
      @blur="blur"
    >
      <template v-slot:label>
        <div v-if="label" class="row items-center all-pointer-events">
          <b>
            <span class="formLabelTitle">{{ $language(label) }}</span>
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
          <div style="color: #1e88e5; font-size: 0.8rem; font-weight: 700; line-height: 1.8rem">
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
        <div v-if="detail && editable" class="vendor-self cursor-pointer" @click="detailClick">
          {{ $language('상세') }}
        </div>
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
  name: 'CTextString'
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
  close?: boolean
  search?: boolean
  detail?: boolean
  prefix?: string
  suffix?: string
  label?: string
  mask?: string
  fillMask?: boolean
  beforeText?: string
  dense?: boolean
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
  fillMask: true,
  beforeText: '',
  dense: true,
  phoneNumberCheck: false,
  bizNumberCheck: false
})

/******************************
 * @VModel_선언
 *******************************/
// value: objectStringNumber | arrayObject | undefined | null
const value = defineModel('value', {
  default: '',
  type: [String] as PropType<string>
})

/******************************
 * @Data_선언
 * TODO ref, reactive 사용, 불명확한 단어 사용 X (ex. data, date)
 *******************************/
const ctext: any = ref(null)

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
function input() {
  // TODO : 부모에게 변경여부 전달
  if (props.phoneNumberCheck) {
    const splitVal: any = value.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})(\d{0,4})/)
    value.value = !splitVal[2]
      ? splitVal[1]
      : splitVal[1] + '-' + splitVal[2] + (splitVal[3] ? '-' + splitVal[3] : '')
  }
  if (props.bizNumberCheck) {
    const splitVal: any = value.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,5})/)
    value.value = !splitVal[2]
      ? splitVal[1]
      : splitVal[1] + '-' + splitVal[2] + (splitVal[3] ? '-' + splitVal[3] : '')
  }
  emits('input', value.value)
  emits('dataChange', value.value)
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
  value.value = ''
  emits('input', value.value)
  emits('dataChange', value.value)
}
/******************************
 * TODO (목적): 검색 아이콘 클릭할 때
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function searchClick() {
  emits('searchPop', value.value)
}
/******************************
 * TODO (목적): 상세 아이콘 클릭할 때
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function detailClick() {
  emits('detailPop', value.value)
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
 * TODO (목적): blur
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function blur() {
  emits('blur')
}
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
