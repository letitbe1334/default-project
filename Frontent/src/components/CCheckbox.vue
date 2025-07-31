<template>
  <div class="fix-height">
    <q-field
      ref="customCheckbox"
      color="orange-custom"
      class="q-field--float customCheck"
      :class="[
        items && items.length <= 2 ? 'under_border' : '',
        noborder ? 'checkboxNoborder' : '',
        addClasses ? addClasses : ''
      ]"
      stack-label
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
        <template v-if="!isFlag">
          <q-option-group
            :options="items"
            :disable="disabled || !editable"
            :name="name"
            :dense="dense"
            :inline="inline"
            val=""
            label=""
            color="orange-custom"
            type="checkbox"
            class="q-pb-xs CoptionGroupCheck"
            v-model:modelValue="vValue"
            @update:model-value="input"
          />
        </template>
        <template v-else>
          <div class="q-pb-xs CoptionGroupCheckOne">
            <q-checkbox
              v-model:modelValue="vValue"
              :dense="dense"
              color="orange-custom"
              :label="setFlagLabel"
              :true-value="trueValue"
              :false-value="falseValue"
              @update:model-value="input"
            />
          </div>
        </template>
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
  name: 'CBtn'
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
  name: string
  value: objectStringNumber | arrayObject | undefined | null
  label?: string
  editable?: boolean
  disabled?: boolean
  required?: boolean
  inline?: boolean
  comboItems?: arrayObject | undefined
  itemText?: string
  itemValue?: string
  dense?: boolean
  codeGroupCd?: string
  codeAttrVal1?: string
  isObject?: boolean
  valueText?: string
  valueKey?: string
  isFlag?: boolean
  trueValue?: string
  falseValue?: string
  trueLabel?: string
  falseLabel?: string
  isArray?: boolean
  noborder?: boolean
  addClasses?: string
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
  value: null,
  label: '',
  editable: true,
  disabled: false,
  required: false,
  inline: true,
  comboItems: undefined,
  itemText: 'codeName',
  itemValue: 'code',
  dense: true,
  codeGroupCd: '',
  codeAttrVal1: '',
  isObject: false,
  valueText: '',
  valueKey: '',
  isFlag: false,
  trueValue: 'Y',
  falseValue: 'N',
  trueLabel: 'Yes',
  falseLabel: 'No',
  isArray: true,
  noborder: false,
  addClasses: ''
})

/******************************
 * @VModel_선언
 *******************************/
// const value = defineModel('value', {
//   default: null,
//   type: [Object, Array, String, Number] as PropType<
//     objectStringNumber | arrayObject | arrayString | string | number | undefined | null
//   >
// })

/******************************
 * @Data_선언
 * TODO ref, reactive 사용, 불명확한 단어 사용 X (ex. data, date)
 *******************************/
const vValue = ref<arrayObject | arrayString | string | undefined | null>('')
const items = ref<Array<any>>([])

/******************************
 * @Computed_선언
 *******************************/
const setFlagLabel = computed(() =>
  props.trueValue === vValue.value ? $language(props.trueLabel) : $language(props.falseLabel)
)

/******************************
 * @Watch_선언
 *******************************/
watch(
  () => props.value,
  () => {
    setValue()
  }
)
watch(
  () => props.comboItems,
  () => {
    if (props.comboItems) {
      makeSelectOptions(props.comboItems)
    }
    setValue()
  },
  {
    deep: true
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
  if (
    (Array.isArray(props.value) || typeof props.value === 'string') &&
    props.value &&
    props.value.length > 0
  ) {
    if (!props.isFlag) {
      if (Array.isArray(props.value)) {
        vValue.value = _.cloneDeep(props.value)
      } else {
        // String type으로 구분자가 ,로 들어오는 경우는 value값만
        if (props.value !== '') {
          vValue.value = _.split(props.value, ',')
        }
      }
    } else {
      vValue.value = _.clone(props.value)
    }
  } else {
    if (!props.isFlag) {
      vValue.value = []
    } else {
      vValue.value = _.clone(props.falseValue)
    }
  }
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
  const emitData: Array<any> = []
  if (!props.isFlag && vValue.value && Array.isArray(vValue.value) && vValue.value.length > 0) {
    _.forEach(vValue.value, (item) => {
      /**
       * 다음 두 상황으로 value를 return 할수 있게 처리
       *
       * 1. value만 Array에 담기는 경우
       * 2. Object로 itemText, itemValue에 맞춰 Array에 담기는 경우
       */
      if (props.isObject) {
        // case 1
        const data: any = _.find(items.value, { value: item })
        const pushData: objectStringNumber = {}
        pushData[props.valueText] = data!.label
        pushData[props.valueKey] = data!.value
        emitData.push(pushData)
      } else {
        // case 2
        emitData.push(item)
      }
    })
  } else if (props.isFlag) {
    emits('update:value', vValue.value)
    emits('datachange', vValue.value)
    return
  }

  emits('update:value', props.isArray ? emitData : emitData.toString())
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

  // items를 컴포넌트에서 조회를 하는 경우 setValue method를 타는 시점에서 items가 없으므로 해당 setValue 처리
  setValue()
}
/******************************
 * TODO (목적):
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function setValue() {
  let tempValue: Array<any> = []
  if (Array.isArray(props.value)) {
    tempValue = _.cloneDeep(props.value)
  } else {
    // String type으로 구분자가 ,로 들어오는 경우는 value값만
    if (typeof props.value === 'string' && props.value !== '') {
      tempValue = _.split(props.value, ',')
    }
  }

  if (items.value && items.value.length > 0) {
    const data: Array<any> = []
    if (!props.isFlag && tempValue && tempValue.length > 0) {
      _.forEach(tempValue, (item) => {
        /**
         * 다음 두 상황으로 v-model을 받을 수 있게 처리
         *
         * 1. value만 Array에 담기는 경우
         * 2. Object로 itemText, itemValue에 맞춰 Array에 담기는 경우
         */
        let pushValue = ''
        let findData: any = {}
        if (props.isObject) {
          // case 1
          findData = _.find(items.value, { value: item[props.valueKey] })
        } else {
          // case 2
          findData = _.find(items.value, { value: item })
        }
        if (findData) {
          pushValue = findData.value
        }
        data.push(pushValue)
      })
    }

    if (data) {
      vValue.value = data
    } else {
      vValue.value = []
    }
  } else {
    if (!props.isFlag) {
      vValue.value = []
    } else {
      // 단일형인 경우에는 해당 값은 String형태로 넘어오며 값을 v-model로 넣어 처리
      vValue.value = _.clone(String(props.value))
    }
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
