<template>
  <div class="fix-height">
    <q-field
      ref="customCheckbox"
      color="orange-custom"
      class="q-field--float customRadio"
      no-error-icon
      :rules="[validRule]"
      :validMessage="validMessage"
      :disable="!editable || disabled"
      :label="$language(props.label)"
      v-model="vValue"
    >
      <template v-slot:label v-if="label">
        <div class="row items-center all-pointer-events">
          <b>
            <span class="formLabelTitle">{{ $language(props.label) }}</span>
            <i v-if="required" class="material-icons labelfrontIcon text-requiredColor">check</i>
          </b>
        </div>
      </template>
      <template v-slot:control>
        <q-option-group
          :options="items"
          :disable="disabled || !editable"
          :name="name"
          dense
          inline
          color="orange-custom"
          class="q-pb-xs CoptionGroupRadio"
          v-model="vValue"
          @update:model-value="input"
        />
      </template>
    </q-field>
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
  name: 'CRadio'
})

/******************************
 * @Pinia_store_선언
 * TODO 반응형 유지를 위해 storeToRefs 사용 (function은 사용 X)
 *******************************/

/******************************
 * @Emit_선언
 *******************************/
const emits = defineEmits(['input', 'datachange', 'setCodeData'])

/******************************
 * @Vue_관련_선언 (ex. vue-router)
 *******************************/

/******************************
 * @Interface_선언
 *******************************/
interface propType {
  name?: string
  value: string | number
  label?: string
  editable?: boolean
  disabled?: boolean
  required?: boolean
  comboItems?: arrayObject | undefined
  itemText?: string
  itemValue?: string
  codeGroupCd?: string
  codeAttrVal1?: string
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
  name: '',
  value: '',
  label: '',
  editable: true,
  disabled: false,
  required: false,
  comboItems: undefined,
  itemText: 'codeName',
  itemValue: 'code',
  codeGroupCd: '',
  codeAttrVal1: ''
})

/******************************
 * @VModel_선언
 *******************************/
const vValue = defineModel<string | number | null | undefined>('value', {
  default: null
})

/******************************
 * @Data_선언
 * TODO ref, reactive 사용, 불명확한 단어 사용 X (ex. data, date)
 *******************************/
const items = ref<Array<any>>([])

/******************************
 * @Computed_선언
 *******************************/

/******************************
 * @Watch_선언
 *******************************/
watch(
  () => props.value,
  (newValue) => {
    if (newValue !== vValue.value) {
      vValue.value = newValue ?? null
    }
  }
)
watch(
  () => props.comboItems,
  (newItems) => {
    if (newItems) {
      makeSelectOptions(newItems)
      if (props.value !== vValue.value) {
        vValue.value = props.value
      }
    }
  },
  {
    deep: false // deep 옵션 제거. 꼭 필요한 경우에만 true로 설정
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
 * TODO (목적): 초기화
 *******************************/
function init() {
  vValue.value = props.value ?? null
  if (props.comboItems && props.comboItems.length > 0) {
    makeSelectOptions(props.comboItems)
  } else if (props.codeGroupCd) {
    getItems()
  }
}
/******************************
 * TODO (목적):
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function input() {
  emits('input', vValue.value)
  emits('datachange', vValue.value)
}
/******************************
 * TODO (목적):
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function getItems() {
  getComboItems(props.codeGroupCd).then((_result: any) => {
    makeSelectOptions(_result)
    emits('setCodeData')
  })
}
/******************************
 * TODO (목적):
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function makeSelectOptions(_items: arrayObject) {
  const options: arrayObject = []
  if (!_items || _items.length === 0) return options
  let tempcomboItems = []
  // 쓰기권환이 있으며 활성화 상태인 경우
  if (props.editable && !props.disabled) {
    // 사용여부가 Y인 것만 리스트에 표현한다.
    // default : 사용여부 상관없이 전체
    tempcomboItems = _.reject(_items, { useFlag: 'N' })
  } else {
    tempcomboItems = _items
  }
  // 추가속성으로 조회조건이 추가적으로있을경우 필터링
  if (props.codeAttrVal1) {
    tempcomboItems = _.filter(tempcomboItems, { attrVal1: props.codeAttrVal1 })
  }

  _.forEach(tempcomboItems, (_item) => {
    options.push({
      label: _item[props.itemText],
      value: _item[props.itemValue]
    })
  })
  items.value = options
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
