<template>
  <!--Q-Dialog는 외부 포커스를 허용하지 않음. 그래서 팝업에서 swal alert에 포커스가 가지 않음
  allow-focus-outside 로 허용-->
  <div>
    <q-dialog
      ref="dialog"
      no-backdrop-dismiss
      allow-focus-outside
      position="top"
      :persistent="false"
      :no-esc-dismiss="false"
      :class="{
        customDialog: true,
        'full-dialog': param.isFull,
        'mini-dialog': !param.isFull
      }"
      :style="{ opacity: bodyOpacity }"
      v-model="param.visible"
      @show="onShow"
      @hide="onHide"
    >
      <q-layout
        ref="dialogLayout"
        view="Lhh lpR fff"
        class="bg-white no-scroll dialog-layout"
        :style="{
          'max-width': param.isFull ? 'none' : param.width,
          'min-height': 'auto',
          'max-height': param.isFull ? '98%' : 'calc(100vh - 60px)'
        }"
      >
        <q-header
          ref="dialogHeader"
          class="text-white dialog-header"
          :class="
            param.isFull
              ? param.isApproval
                ? 'bg-mini-dialog cursor-move'
                : 'bg-full-dialog'
              : 'bg-mini-dialog cursor-move'
          "
        >
          <q-toolbar ref="toolbar-header">
            <q-toolbar-title
              >{{ $language(param.title) }}
              <q-chip
                v-if="param.suffixChip"
                outline
                square
                dense
                color="white"
                text-color="main-custom"
                icon="bookmark"
              >
                {{ param.suffixChip }}
              </q-chip>
            </q-toolbar-title>
            <q-btn flat round dense icon="info" v-if="regUserInfo.regUserName">
              <q-tooltip anchor="bottom middle" self="top end">
                <div class="tooltip-layer">
                  <div class="tooltip-title" v-if="regUserInfo.regUserName">
                    {{
                      $language('최초작성자 :') +
                      ' ' +
                      regUserInfo.regUserName +
                      (regUserInfo.regUserDeptName ? '/' + regUserInfo.regUserDeptName : '')
                    }}
                  </div>
                  <div class="tooltip-content" v-if="regUserInfo.regUserName">
                    {{ regUserInfo.regDtStrTime }}
                  </div>
                  <br />
                  <div class="tooltip-title" v-if="regUserInfo.chgUserName">
                    {{
                      $language('최근수정자 :') +
                      ' ' +
                      regUserInfo.chgUserName +
                      (regUserInfo.chgUserDeptName ? '/' + regUserInfo.chgUserDeptName : '')
                    }}
                  </div>
                  <div class="tooltip-content" v-if="regUserInfo.chgUserName">
                    {{ regUserInfo.chgDtStrTime }}
                  </div>
                </div>
              </q-tooltip>
            </q-btn>
            <q-btn
              flat
              @click="setFullScreen"
              round
              dense
              :icon="screenIcon"
              size="12px"
              v-if="!param.isFull"
            >
              <q-tooltip class="bg-white text-primary">{{ screenIconText }}</q-tooltip>
            </q-btn>
            <q-btn flat @click="closePopup" round dense icon="close">
              <q-tooltip class="bg-white text-primary">{{ $language('창닫기') }}</q-tooltip>
            </q-btn>
          </q-toolbar>
        </q-header>
        <q-page-container
          class="custom-dialog-page-container"
          :style="{
            'overflow-y': 'auto',
            'min-height': 'auto',
            'max-height':
              param.isFull || param.width == '95%' || param.width == '99%'
                ? 'calc(100vh)'
                : 'calc(100vh - 100px)'
          }"
        >
          <q-page padding style="min-height: 200px">
            <div
              :style="{
                height: param.isFull
                  ? 'calc(100vh - 70px)'
                  : param.width == '95%' || param.width == '99%'
                    ? 'calc(100vh - 70px)'
                    : 'auto'
              }"
            >
              <!-- :is="componentTarget" -->
              <component
                :is="param.target"
                :style="`background:` + bodyColor"
                :popupParam="param.param"
                :contentHeight="contentHeight"
                :returnData="returnData"
                @setRegInfo="setRegInfo"
                @closePopup="param.closeCallback"
              />
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
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
  name: 'CDialog'
})

/******************************
 * @Pinia_store_선언
 * TODO 반응형 유지를 위해 storeToRefs 사용 (function은 사용 X)
 *******************************/

/******************************
 * @Emit_선언
 *******************************/
const emits = defineEmits(['onShow', 'onHide'])

/******************************
 * @Vue_관련_선언 (ex. vue-router)
 *******************************/

/******************************
 * @Interface_선언
 *******************************/
interface propType {
  param: popupParamType
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
  param: (): popupParamType => ({
    isFull: true,
    isApproval: false,
    target: null,
    title: '',
    visible: false,
    suffixChip: '',
    width: '',
    top: '',
    param: {},
    closeCallback: () => {}
  })
})

/******************************
 * @Data_선언
 * TODO ref, reactive 사용, 불명확한 단어 사용 X (ex. data, date)
 *******************************/
const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') !== -1
const isFull = ref<boolean | undefined>(true)
const screenIcon = ref('fullscreen') // fullscreen_exit
const screenIconText = ref('') //
const bodyColor = ref('#FFFFFF')
const bodyOpacity = ref('0.99 !important')
const bodyTimer = ref<NodeJS.Timeout>(setTimeout(() => {}, 1))
const contentHeight = ref('auto')
const oriWidth = ref<string | undefined>('')
const returnData = ref({
  // 최대 3개의 data를 return
  col1: null,
  col2: null,
  col3: null
})
const target = ref<HTMLElement | null>(null)
const nodeDragg = ref<HTMLElement | null>(null)
const regUserInfo = ref({
  regUserName: '',
  regUserDeptName: '',
  regDtStrTime: '',
  chgUserName: '',
  chgUserDeptName: '',
  chgDtStrTime: ''
})
const dialogLayout = ref<any>(null)
const dialogHeader = ref<any>(null)

/******************************
 * @Computed_선언
 *******************************/

/******************************
 * @Watch_선언
 *******************************/
watch(
  () => props.param.visible,
  () => {
    setSize()
  }
)

/******************************
 * @Life_cycle_선언
 *******************************/
onBeforeMount(() => {
  window.addEventListener('resize', setSize)
  init()
})
onBeforeUnmount(() => {
  if (props.param.visible && bodyTimer.value) {
    clearTimeout(bodyTimer.value)
  }
  if (!isChrome) {
    bodyOpacity.value = '0.99 !important'
  }
  window.removeEventListener('resize', setSize)
})
onUpdated(() => {
  if (props.param.visible) {
    if (!isChrome) {
      bodyTimer.value = setTimeout(setBodyTimer, 2000)
    } else {
      bodyOpacity.value = '1 !important'
    }
  } else {
    if (!isChrome) {
      bodyOpacity.value = '0.99 !important'
    }
  }
})

/******************************
 * @Function_선언
 * TODO function 주석 작성 (asdffunctionannotation 사용)
 *  * arrow function 사용해도 무관
 *******************************/
/******************************
 * TODO (목적): 초기셋팅
 *******************************/
function init() {
  screenIconText.value = $language('크게보기')
}
/******************************
 * TODO (목적): 팝업 사이즈 변환(전체/기존)
 *******************************/
function setFullScreen() {
  isFull.value = !isFull.value
  if (isFull.value) {
    screenIcon.value = 'fullscreen_exit'
    screenIconText.value = $language('기존크기')
    props.param.width = '99%'
  } else {
    screenIcon.value = 'fullscreen'
    screenIconText.value = $language('크게보기')
    props.param.width = oriWidth.value
  }
}
/******************************
 * TODO (목적): 팝업안에 표시되는 업무 등록/수정자 셋팅
 * @param (1): 팝업안에 표시되는 업무 정보
 *******************************/
function setRegInfo(_data: any) {
  // 상세팝업 최초작성/최근수정 정보 노출
  regUserInfo.value.regUserName = _data.regUserName
  regUserInfo.value.regUserDeptName = _data.regUserDeptName
  regUserInfo.value.regDtStrTime = _data.regDtStrTime
  regUserInfo.value.chgUserName = _data.chgUserName
  regUserInfo.value.chgUserDeptName = _data.chgUserDeptName
  regUserInfo.value.chgDtStrTime = _data.chgDtStrTime
}
/******************************
 * TODO (목적): onUpdated Hook에서 body style 변환하여 팝업이 옅어지는걸 방지
 *******************************/
function setBodyTimer() {
  bodyOpacity.value = '1 !important'
  clearTimeout(bodyTimer.value)
}
/******************************
 * TODO (목적): 팝업 사이즈 조절
 *******************************/
function setSize() {
  isFull.value = props.param.isFull
  oriWidth.value = props.param.width
  if (props.param.visible) {
    setTimeout(() => {
      const height = dialogLayout.value.$el.offsetHeight - dialogHeader.value.$el.offsetHeight - 50
      contentHeight.value = !isNaN(height) ? String(height) : 'auto'
    }, 300)
  } else {
    contentHeight.value = 'auto'
  }
}
/******************************
 * TODO (목적): 팝업 닫기
 *******************************/
function closePopup() {
  regUserInfo.value.regUserName = ''
  regUserInfo.value.regUserDeptName = ''
  regUserInfo.value.regDtStrTime = ''
  regUserInfo.value.chgUserName = ''
  regUserInfo.value.chgUserDeptName = ''
  regUserInfo.value.chgDtStrTime = ''

  props.param.closeCallback(returnData.value)
}
/******************************
 * TODO (목적): 팝업 열었을때
 *******************************/
function onShow() {
  if (!props.param.isFull) {
    const dialogElements = document.getElementsByClassName('mini-dialog')
    target.value =
      dialogElements[dialogElements.length - 1].querySelector<HTMLElement>('.dialog-layout')
    nodeDragg.value = target.value!.querySelector<HTMLElement>('.q-header')
    nodeDragg.value!.addEventListener('mousedown', onGrab)

    emits('onShow')
  }
}
/******************************
 * TODO (목적): 팝업 닫을때
 *******************************/
function onHide() {
  if (!props.param.isFull) {
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', onLetGo)
    nodeDragg.value!.removeEventListener('mousedown', onGrab)
    emits('onHide')
  }
}
/******************************
 * TODO (목적): 팝업 헤더를 마우스 드래그 할 때
 * @param (1): 마우스 이벤트, x, y좌표 읽기 위함
 *******************************/
function onDrag(e: MouseEvent) {
  if (!props.param.isFull) {
    const originalStyles = window.getComputedStyle(target.value!)
    target.value!.style.left = parseInt(originalStyles.left) + e.movementX + 'px'
    target.value!.style.top = parseInt(originalStyles.top) + e.movementY + 'px'

    if (parseInt(originalStyles.top) + e.movementY < 0) {
      target.value!.style.top = '0px'
    }
    if (parseInt(originalStyles.top) + e.movementY + 60 > window.innerHeight) {
      target.value!.style.top = window.innerHeight - 60 + 'px'
    }
  }
}
/******************************
 * TODO (목적): 팝업 나가기 전 이벤트 제거
 *******************************/
function onLetGo() {
  if (!props.param.isFull) {
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', onLetGo)
  }
}
/******************************
 * TODO (목적):
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function onGrab() {
  if (!props.param.isFull) {
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', onLetGo)
  }
}

/******************************
 * @Provide_선언
 *  ! types 폴더에 type 명시
 *******************************/
</script>
