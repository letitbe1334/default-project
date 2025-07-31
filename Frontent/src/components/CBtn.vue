<template>
  <q-btn
    unelevated
    :class="[btnclass ? btnclass : '', 'custom-btn']"
    :disable="disabled"
    :loading="loading"
    :outline="outline"
    :dense="dense"
    :size="size"
    :color="getColors()"
    :round="isIcon"
    :text-color="getTextColors()"
    :label="$language(props.label)"
    :icon="icon ? icon : void 0"
    :icon-right="iconRight ? iconRight : void 0"
    @click.prevent="btnClicked"
  >
    <slot name="tooltip" />
  </q-btn>
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
const emits = defineEmits(['beforeAction', 'btnCallback', 'btnClicked'])

/******************************
 * @Vue_관련_선언 (ex. vue-router)
 *******************************/

/******************************
 * @Interface_선언
 *******************************/
interface propType {
  label?: string
  btnclass?: string
  url?: string
  mappingType?: string
  param?: objectStringNumber | arrayObject | undefined | null
  isSubmit?: boolean
  size?: string
  color?: string
  icon?: string
  iconRight?: string
  disabled?: boolean
  showLoading?: boolean
  outline?: boolean
  dense?: boolean
  textColor?: string
}

/******************************
 * @inject_선언
 *******************************/

/******************************
 * @Props_선언
 * TODO type & default 작성
 *******************************/
const props = withDefaults(defineProps<propType>(), {
  label: '',
  btnclass: '',
  url: '',
  mappingType: '',
  param: null,
  isSubmit: false,
  size: 'md',
  color: '',
  icon: '',
  iconRight: '',
  disabled: false,
  showLoading: true,
  outline: false,
  dense: true,
  textColor: ''
})

/******************************
 * @Data_선언
 * TODO ref, reactive 사용, 불명확한 단어 사용 X (ex. data, date)
 *******************************/
const loading = ref(false)

/******************************
 * @Computed_선언
 *******************************/
const isIcon = computed(() => props.label === '' && props.icon !== '')

/******************************
 * @Watch_선언
 *******************************/
watch(
  () => props.isSubmit,
  () => {
    callButtonAction()
  }
)

/******************************
 * @Life_cycle_선언
 *******************************/

/******************************
 * @Function_선언
 * TODO function 주석 작성 (asdffunctionannotation 사용)
 *  * arrow function 사용해도 무관
 *******************************/
/******************************
 * TODO (목적): button color 반환
 * @return (반환): color class
 *******************************/
function getColors() {
  let returnColor = ''
  if (props.color !== '') {
    returnColor = props.color
  } else {
    switch (props.icon) {
      case 'add': // 추가/신규
      case 'add_circle': // 추가/신규 amber-7
        returnColor = 'yellow-custom'
        break
      case 'search': // 검색 // 에스엘용 수정 indigo / 원본 teal-5 indigo
        returnColor = 'blue-custom'
        break
      case 'delete_forever': // 삭제
      case 'remove': // 삭제 red
      case 'delete': // 삭제 red
        returnColor = 'red-custom'
        break
      case 'save': // 저장 blue-7
        returnColor = 'purple-custom1'
        break
      case 'check': // 선택
      case 'keyboard_arrow_up':
      case 'keyboard_arrow_down':
        returnColor = 'purple-custom1'
        break
      case 'autorenew': // 초기화 purple
      case 'history':
        returnColor = 'purple-custom'
        break
      case 'restart_alt': // 개정 amber-7
        returnColor = 'yellow-custom'
        break
      case 'help': // help deep-purple-6
        returnColor = 'deep-purple-6'
        break
      case 'save_alt': // 복사 green-7
        returnColor = 'teal-custom'
        break
      default:
        returnColor = 'blue-grey-8'
        break
    }
  }
  return returnColor
}
/******************************
 * TODO (목적): button text color 반환
 * @return (반환): color class (quasar 정의)
 *******************************/
function getTextColors() {
  let returnColor = ''
  if (props.textColor !== '') {
    returnColor = props.textColor
  } else {
    returnColor = getColors() === 'white' ? 'black' : 'white'
  }
  return returnColor
}
/******************************
 * TODO (목적): 버튼 클릭, Http 통신을 하는 경우 `beforeAction` emit
 *******************************/
function btnClicked() {
  if (props.showLoading) {
    loading.value = !loading.value
  } else {
    loading.value = false
  }
  // 저장일 경우 유효성 검사
  if (props.url) {
    closeLoading()
    emits('beforeAction')
  } else {
    closeLoading()
    callButtonAction()
  }
}
/******************************
 * TODO (목적): 버튼 클릭 후 action, Http 통신을 하는 경우 `isSubmit`을 통해 해당 함수 호출
 *******************************/
function callButtonAction() {
  // ajax action
  if (props.url) {
    if (props.mappingType === 'GET') {
      $http({
        url: props.url,
        method: props.mappingType,
        params: props.param
      }).then((_result: any) => {
        emits('btnCallback', _result)
      })
    } else {
      const data = props.param
      $http({
        url: props.url,
        method: props.mappingType,
        data
      }).then((_result: any) => {
        emits('btnCallback', _result)
      })
    }
  } else {
    emits('btnClicked')
  }
}
/******************************
 * TODO (목적): 버튼 로딩 제거 (0.1초)
 *******************************/
function closeLoading() {
  setTimeout(() => (loading.value = false), 100)
}

/******************************
 * @Provide_선언
 *  ! types 폴더에 type 명시
 *******************************/
</script>
