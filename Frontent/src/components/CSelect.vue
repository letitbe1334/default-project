<template>
  <div class="fix-height">
    <template v-if="isSelect">
      <q-select
        :class="[
          stype === 'tableHeaderselect'
            ? 'customTableHeaderSelect'
            : type === 'custom'
              ? 'customSelect2 customSelect'
              : 'customSelect'
        ]"
        no-error-icon
        stack-label
        ref="selectbox"
        :options="items"
        :clearable="clearable"
        :label="$language(label)"
        :color="color"
        :dense="stype === 'tableselect' || stype === 'tableHeaderselect'"
        :rules="[validRule]"
        :validMessage="validMessage"
        :disable="disabled || !editable"
        v-model="vValue"
        @update:model-value="input"
      >
        <template v-if="label" v-slot:label>
          <div class="row items-center all-pointer-events">
            <b>
              <span class="formLabelTitle">{{ $language(label) }}</span>
              <i v-if="required" class="material-icons labelfrontIcon text-requiredColor">check</i>
            </b>
            <slot name="suffixLabel" />
          </div>
        </template>
        <template v-slot:selected-item="scope">
          <template v-if="!isChip">
            {{ scope.opt.label }}
          </template>
          <template v-else>
            <div :class="['text-' + scope.opt.color, 'text-bold']" :style="scope.opt.style">
              {{ scope.opt.label }}
            </div>
          </template>
        </template>
      </q-select>
    </template>
    <template v-else>
      {{ valueText }}
    </template>
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
  name: 'CSelect'
})

/******************************
 * @Pinia_store_선언
 * TODO 반응형 유지를 위해 storeToRefs 사용 (function은 사용 X)
 *******************************/

/******************************
 * @Emit_선언
 *******************************/
const emits = defineEmits(['update:value', 'datachange', 'setCodeData'])

/******************************
 * @Vue_관련_선언 (ex. vue-router)
 *******************************/

/******************************
 * @Interface_선언
 *******************************/
interface propType {
  name?: string
  value: string | number | null | undefined
  stype?: string
  color?: string
  autofocus?: boolean
  label?: string
  editable?: boolean
  comboItems?: arrayObject | undefined
  itemText?: string
  itemValue?: string
  itemDisable?: string
  disabled?: boolean
  required?: boolean
  clearable?: boolean
  dense?: boolean
  type?: string
  typetext?: string
  codeGroupCd?: string
  codeAttrVal1?: string
  stepperGrpCd?: string
  default?: string | objectStringNumber | undefined | null
  isChip?: boolean
  rejectItems?: arrayString | undefined
  isSelect?: boolean
  error?: ErrorFunction
  validMessage?: stringNull
}
export type valueType = {
  label: string
  value: string | number | null | undefined
  disable?: boolean
  color?: string
  fontColor?: string
  style?: string
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
  value: null,
  stype: 'select',
  color: 'orange-custom',
  autofocus: false,
  label: '',
  editable: true,
  comboItems: undefined,
  itemText: '',
  itemValue: '',
  itemDisable: '',
  disabled: false,
  required: false,
  clearable: false,
  dense: true,
  type: 'none',
  typetext: '',
  codeGroupCd: '',
  codeAttrVal1: '',
  stepperGrpCd: '',
  default: undefined,
  isChip: false,
  rejectItems: undefined,
  isSelect: true
})

/******************************
 * @VModel_선언
 *******************************/

/******************************
 * @Data_선언
 * TODO ref, reactive 사용, 불명확한 단어 사용 X (ex. data, date)
 *******************************/
const vValue = ref<valueType | null | undefined>(null)
const items = ref<Array<valueType>>([])
const selectbox: any = ref(null)

/******************************
 * @Computed_선언
 *******************************/
const valueText = computed(() => {
  let data: any = null
  if (items.value && items.value.length > 0 && vValue.value && !props.isSelect) {
    data = _.find(items.value, { value: vValue.value })
    return data ? data.label : ''
  } else {
    return ''
  }
})

/******************************
 * @Watch_선언
 *******************************/
// TODO : 부모의 v-model 변경을 감시(예를 들면, db로부터 데이터를 조회 한 후 값을 바인딩 할 경우)
watch(
  () => props.value,
  () => {
    setValue()
  }
)
// 부모로 부터 값을 비동기로 가져올 경우 처리
watch(
  () => props.comboItems,
  () => {
    makeSelectOptions(props.comboItems)
  },
  { deep: true }
)
// TODO : 부모로 부터 값을 받아오는 경우, 상황에 따라 value 속성 값이 먼저 들어오고 comboItems의 값이 늦게 들어올 수 있으므로,
// 실제 항목인 items가 변경되면 vValue값을 value값으로 재 설정 해줌
watch(
  () => items.value,
  () => {
    setValue()
  },
  { deep: true }
)

/******************************
 * @Life_cycle_선언
 *******************************/
onBeforeMount(() => {
  if (props.comboItems && props.comboItems.length > 0) {
    makeSelectOptions(props.comboItems)
  } else if (props.codeGroupCd) {
    makeComboItems()
  } else if (props.stepperGrpCd) {
    makeStepperItems()
  } else {
    makeDefaultOptions(items.value)
  }
})

onMounted(() => {
  if (props.autofocus) {
    autoFocus()
  }
})
/******************************
 * @Function_선언
 * TODO function 주석 작성 (asdffunctionannotation 사용)
 *  * arrow function 사용해도 무관
 *******************************/

/******************************
 * TODO (목적): select show popup
 *******************************/
function autoFocus() {
  selectbox.value.showPopup()
}

/******************************
 * TODO (목적):
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function input(paramValue: objectStringNumber) {
  // TODO : 부모에게 변경여부 전달
  let emitData = null
  if (paramValue) {
    emitData = paramValue.value
  } else {
    emitData = paramValue
  }
  emits('update:value', emitData)
  emits('datachange', paramValue)
}

/******************************
 * TODO (목적):
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function makeComboItems() {
  getComboItems(props.codeGroupCd).then((_result: any) => {
    if (props.default && !vValue.value) {
      if (props.default === 'first') {
        emits('update:value', _result[0][props.itemValue])
      }
    }
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
function makeStepperItems() {
  getStepItems(props.stepperGrpCd).then((_result: any) => {
    if (props.default && !vValue.value) {
      if (props.default === 'first') {
        emits('update:value', _result[0][props.itemValue])
      }
    }
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
function makeSelectOptions(paramItems: arrayObject | undefined) {
  const options: Array<valueType> = []
  if (!paramItems || paramItems.length === 0) {
    makeDefaultOptions(options)
    items.value = options
  } else {
    let tempComboItems: any = null

    // 쓰기권환이 있으며 활성화 상태인 경우
    if (props.editable && !props.disabled) {
      // 사용여부가 Y인 것만 리스트에 표현한다.
      // default : 사용여부 상관없이 전체
      tempComboItems = _.reject(paramItems, { useFlag: 'N' })
    } else {
      tempComboItems = paramItems
    }
    // 추가속성으로 조회조건이 추가적으로있을경우 필터링
    if (props.codeAttrVal1) {
      tempComboItems = _.filter(tempComboItems, { attrVal1: props.codeAttrVal1 })
    }
    // 제외하고 싶은 아이템이 있는 경우
    if (props.rejectItems && props.rejectItems.length > 0) {
      _.forEach(props.rejectItems, (rejectItem: any) => {
        tempComboItems = _.reject(tempComboItems, (tempItem: any) => {
          return tempItem[props.itemValue] === rejectItem
        })
      })
    }

    _.forEach(tempComboItems, (_item) => {
      const colorRgbCheck = _item.attrVal1 && _item.attrVal1.indexOf('#') > -1
      options.push({
        label: _item[props.itemText],
        value: _item[props.itemValue],
        disable: !props.itemDisable ? false : _item[props.itemDisable],
        color: colorRgbCheck ? '' : _item.attrVal1,
        fontColor: _item.attrVal2,
        style: colorRgbCheck ? `color:${_item.attrVal1}` : ''
      })
    })
    makeDefaultOptions(options)
    items.value = options
  }
}
/******************************
 * TODO (목적):
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function makeDefaultOptions(_options: Array<valueType>) {
  if (props.type === 'edit') {
    _options.splice(0, 0, {
      label: $language('선택'),
      value: null
    })
  } else if (props.type === 'search') {
    _options.splice(0, 0, {
      label: $language('전체'),
      value: null
    })
  } else if (props.type === 'allEdit') {
    _options.splice(0, 0, {
      label: $language('일괄선택'),
      value: null
    })
  } else if (props.type === 'custom') {
    _options.splice(0, 0, {
      label: $language(props.typetext),
      value: null
    })
  }
}
/******************************
 * TODO (목적):
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function setValue() {
  if (items.value && items.value.length > 0) {
    const targetValue = props.value === '' ? null : props.value
    const _data: any = _.find(items.value, { value: targetValue })
    if (_data) {
      vValue.value = _data
    } else {
      vValue.value = null
    }
  }
}
/******************************
 * TODO (목적):
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
// eslint-disable-next-line
function getName() {
  const objValue = vValue.value as valueType
  const selectData = _.find(items.value, { value: objValue!.value! })
  if (selectData) {
    return selectData.label
  } else {
    return ''
  }
}
/******************************
 * TODO (목적): 유효성 검증
 * @param (1): 값
 * @return (반환): true: 통과, 그 외 : 통과X
 *******************************/
function validRule(val: any) {
  let validCheck = true
  if (props.required) {
    validCheck = Boolean(val) && Boolean(val.value)
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
