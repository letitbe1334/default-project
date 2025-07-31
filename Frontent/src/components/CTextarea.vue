<!--
목적 : 확장검색 기능을 지원하는 컴포넌트
Detail :
 *
examples:
 *
-->
<template>
  <div class="fix-height" :class="[counter ? 'c-textarea-counter' : '', noLabel ? 'noLabel' : '']">
    <q-input
      :rows="rows"
      v-if="type === 'normal'"
      bottom-slots
      no-error-icon
      stack-label
      unmasked-value
      :autogrow="autogrow"
      :label="$language(label)"
      type="textarea"
      :input-style="{ minHeight: 28 * rows + 'px', maxHeight: 28 * maxrows + 'px' }"
      class="customTextArea"
      :counter="counter"
      :maxlength="maxlength"
      :prefix="prefix"
      :suffix="suffix"
      :readonly="readonly"
      color="orange-custom"
      :rules="[validRule]"
      :validMessage="validMessage"
      :disable="disabled || !editable"
      v-model="value"
      @update:model-value="input"
    >
      <template v-slot:label>
        <div v-if="label" class="row items-center all-pointer-events">
          <b>
            <span class="formLabelTitle">{{ $language(label) }}</span>
            <i v-if="required" class="material-icons labelfrontIcon text-requiredColor">check</i>
            <q-checkbox
              v-if="isCheck"
              color="orange-custom"
              :editable="editable"
              :disable="disabled || !editable"
              :label="$language('항목사용')"
              true-value="O"
              false-value="X"
              name="click"
              v-model="checkValue"
              @update:model-value="checkboxClick"
            />
          </b>
        </div>
      </template>

      <template v-slot:before v-if="beforeIcon && beforeIcon.length > 0">
        <q-icon
          v-for="(icon, index) in beforeIcon"
          :key="index"
          :name="String(icon.name)"
          :class="{ 'cursor-pointer': icon.click }"
          @click="iconClick(icon)"
        />
      </template>

      <template v-slot:prepend>
        <q-icon
          v-for="(icon, index) in prependIcon"
          :key="index"
          :name="String(icon.name)"
          :class="{ 'cursor-pointer': icon.click }"
          @click="iconClick(icon)"
        />
      </template>

      <template v-slot:append>
        <q-icon
          v-if="close && !disabled && editable && !readonly"
          name="close"
          @click="closeClick"
          class="cursor-pointer textareaCloseIcon"
        />
        <q-icon
          v-for="(icon, index) in appendIcon"
          :key="index"
          :name="String(icon.name)"
          :class="{ 'cursor-pointer': icon.click }"
          @click="iconClick(icon)"
        />
      </template>

      <!-- <template v-slot:hint>
      </template> -->

      <template v-slot:after>
        <q-icon
          v-for="(icon, index) in afterIcon"
          :key="index"
          :name="String(icon.name)"
          :class="{ 'cursor-pointer': icon.click }"
          @click="iconClick(icon)"
        />
      </template>
    </q-input>

    <q-card v-else style="width: 100%" flat class="c-editor-card">
      <q-card-section horizontal style="top: -14px">
        <div
          class="q-field__label no-pointer-events ellipsis"
          style="line-height: 15px; padding-bottom: 1px; font-size: 12px; padding-left: 8px"
        >
          <div class="row items-center all-pointer-events">
            <b class="custom-textarea-label">
              <span class="formLabelTitle">{{ $language(label) }}</span>
              <i v-if="required" class="material-icons labelfrontIcon text-requiredColor">check</i>
            </b>
          </div>
        </div>
      </q-card-section>
      <q-card-section
        :style="{
          paddingBottom: '10px',
          paddingLeft: '0',
          paddingRight: '0',
          height: 'auto',
          minHeight: editheight + 'rem',
          top: '0px'
        }"
        :class="{
          'cursor-pointer': !disabled && editable,
          'q-py-none': true,
          'custom-q-editor-section': true
        }"
        v-if="editable"
      >
        <q-editor
          v-model="value"
          ref="editor"
          :min-height="editheightrem"
          autofocus
          :disable="disabled || !editable"
          @keyup.enter.stop
          @update:model-value="input"
          :definitions="definitions"
          :toolbar="[
            [
              {
                label: $language('정렬'),
                fixedLabel: true,
                list: 'only-icons',
                options: ['left', 'center', 'right', 'justify']
              }
            ],
            ['bold', 'italic', 'strike', 'underline'],
            ['token'],
            ['hr'],
            [
              {
                label: $language('폰트크기'),
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
              }
            ],
            ['undo', 'redo'],
            ['insert_img'],
            ['viewsource'],
            ['fullscreen'],
            ['preview']
          ]"
        >
          <template v-slot:token>
            <q-btn-dropdown
              dense
              no-caps
              ref="token"
              no-wrap
              unelevated
              color="white"
              text-color="primary"
              label="Font Color"
              size="sm"
            >
              <q-list>
                <q-item tag="label" clickable @click="color('backColor', highlight)">
                  <q-item-section side>
                    <q-icon name="highlight"
                      ><q-tooltip>{{ $language('배경색') }}</q-tooltip></q-icon
                    >
                  </q-item-section>
                  <q-item-section>
                    <q-color
                      v-model="highlight"
                      default-view="palette"
                      no-header
                      no-footer
                      class="my-picker"
                    />
                  </q-item-section>
                </q-item>
                <q-item tag="label" clickable @click="color('foreColor', foreColor)">
                  <q-item-section side>
                    <q-icon name="format_paint"
                      ><q-tooltip>{{ $language('폰트색') }}</q-tooltip></q-icon
                    >
                  </q-item-section>
                  <q-item-section>
                    <q-color
                      v-model="foreColor"
                      no-header
                      no-footer
                      default-view="palette"
                      class="my-picker"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </template>
        </q-editor>
      </q-card-section>
      <q-card-section
        v-else
        :style="{ padding: '0px', height: 'auto', top: '0px' }"
        :class="{ 'q-py-none': true }"
      >
        <div class="custom-textarea-editor" v-html="convertHtml(value)" />
      </q-card-section>
      <!-- <q-separator color="grey-5" /> -->
    </q-card>
    <q-dialog
      ref="previewHtmlDialog"
      :persistent="false"
      :no-esc-dismiss="false"
      no-backdrop-dismiss
      content-class="full-dialog"
      position="top"
      v-model="isPreview"
    >
      <q-layout
        ref="dialog-layout"
        view="Lhh lpR fff"
        class="bg-white no-scroll dialog-layout"
        style="max-width: none; min-height: auto; max-height: 98%"
      >
        <q-header ref="dialog-header" class="text-white dialog-header bg-full-preview">
          <q-toolbar ref="toolbar-header">
            <q-toolbar-title>{{ $language('미리보기') }}</q-toolbar-title>
            <q-btn flat @click="closePopupPreview" round dense icon="close">
              <q-tooltip class="bg-white text-primary">{{ $language('창닫기') }}</q-tooltip>
            </q-btn>
          </q-toolbar>
        </q-header>
        <q-page-container
          class="custom-dialog-page-container"
          style="overflow-y: auto; min-height: auto; max-height: calc(100vh)"
        >
          <q-page padding style="min-height: 200px">
            <div style="height: auto; padding-bottom: 20px" v-html="convertHtml(value)" />
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
import { convertHtml } from '@utils/common'

/******************************
 * @컴포넌트_옵션_선언
 * TODO 이름 정의 (파일 이름 그대로 지정)
 *******************************/
defineOptions({
  name: 'CTextarea'
})

/******************************
 * @Pinia_store_선언
 * TODO 반응형 유지를 위해 storeToRefs 사용 (function은 사용 X)
 *******************************/

/******************************
 * @Emit_선언
 *******************************/
const emits = defineEmits(['input', 'dataChange', 'checkboxClick', 'callback'])

/******************************
 * @Vue_관련_선언 (ex. vue-router)
 *******************************/

/******************************
 * @Interface_선언
 *******************************/
interface propType {
  name?: string
  type?: any
  placeholder?: string
  editable?: boolean
  autogrow?: boolean
  maxlength?: number
  beforeIcon?: arrayObject | undefined | null
  prependIcon?: arrayObject | undefined | null
  appendIcon?: arrayObject | undefined | null
  afterIcon?: arrayObject | undefined | null
  required?: boolean
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
  counter?: boolean
  close?: boolean
  search?: boolean
  detail?: boolean
  prefix?: string
  suffix?: string
  label?: string
  mask?: string
  rows?: number
  editheight?: number
  maxrows?: number
  isCheck?: boolean
  error?: ErrorFunction
  validMessage?: stringNull
  noLabel?: boolean
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
  type: 'normal',
  placeholder: '',
  editable: true,
  autogrow: false,
  maxlength: 300,
  beforeIcon: null,
  prependIcon: null,
  appendIcon: null,
  afterIcon: null,
  required: false,
  clearable: true,
  disabled: false,
  readonly: false,
  counter: false,
  close: true,
  search: false,
  detail: false,
  prefix: '',
  suffix: '',
  label: '',
  mask: '',
  rows: 1,
  editheight: 30,
  maxrows: 8,
  isCheck: false,
  noLabel: false
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
const editor = ref<any>(null)
const token = ref<any>(null)
const foreColor = ref<string>('#000000')
const highlight = ref<string>('#ffff00aa')
const editheightrem = ref<string>('')
const checkValue = ref<string>('X')
const isPreview = ref<boolean>(false)

/******************************
 * @Computed_선언
 *******************************/
const definitions = computed(() => ({
  insert_img: {
    tip: $language('사진 첨부'),
    label: $language('사진넣기'),
    icon: 'photo',
    handler: insertImg
  },
  viewsource: {
    tip: $language('HTML 보기')
  },
  fullscreen: {
    tip: $language('전체화면 보기')
  },
  hr: {
    tip: $language('구분선 삽입')
  },
  preview: {
    label: $language('미리보기'),
    handler: previewHtml
  }
}))

/******************************
 * @Watch_선언
 *******************************/

/******************************
 * @Life_cycle_선언
 *******************************/
onBeforeMount(() => {
  editheightrem.value = `${props.editheight}rem`
})

/******************************
 * @Function_선언
 * TODO function 주석 작성 (asdffunctionannotation 사용)
 *  * arrow function 사용해도 무관
 *******************************/

/******************************
 * TODO (목적): 이미지 삽입
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function insertImg() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.png, .jpg, .gif'
  input.onchange = () => {
    const files = Array.from(input.files ?? [])
    const file = files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      value.value += `<div><img style="max-width: 800px;" src="${dataUrl}" /></div>`
      emits('input', value.value as string | number)
    }
    reader.readAsDataURL(file)
  }
  input.click()
}

/******************************
 * TODO (목적): 검색 팝업
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function input() {
  // TODO : 부모에게 변경여부 전달
  emits('input', value.value)
  emits('dataChange', value.value)
}
/******************************
 * TODO (목적): 에디터 색상
 * @param (1):
 * @param (2):
 * @return (반환):
 *******************************/
function color(cmd: string, name: string) {
  token.value.hide()
  editor.value.caret.restore()
  editor.value.runCmd(cmd, name)
  editor.value.focus()
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

function previewHtml() {
  isPreview.value = true
}

function closePopupPreview() {
  isPreview.value = false
}
function checkboxClick() {
  emits('checkboxClick', checkValue.value)
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
<style lang="sass">
.textareaCloseIcon
  margin-top: 16px !important
</style>
