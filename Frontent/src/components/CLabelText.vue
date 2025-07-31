<!--목적 : 라벨 타이틀과 값 표시 컴포넌트-->
<template>
  <div class="fix-height div-nobottom-layout">
    <div class="row items-center all-pointer-events">
      <b>
        <i class="material-icons lblIcon">comment</i>
        <span class="lbltitle">{{ $language(props.title) }}</span>
      </b>
    </div>
    <div v-if="view === 'text'" class="lblvalue" :style="setStyle" v-html="convertValue" />
    <div v-else class="lblvalue" :style="setStyle">
      <slot name="contents" />
    </div>
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
import { computed } from 'vue'

/******************************
 * @컴포넌트_옵션_선언
 * TODO 이름 정의 (파일 이름 그대로 지정)
 *******************************/
defineOptions({
  name: 'CLabelText'
})

/******************************
 * @Pinia_store_선언
 * TODO 반응형 유지를 위해 storeToRefs 사용 (function은 사용 X)
 *******************************/

/******************************
 * @Emit_선언
 *******************************/

/******************************
 * @Vue_관련_선언 (ex. vue-router)
 *******************************/

/******************************
 * @Interface_선언
 *******************************/
interface propType {
  title?: string
  value?: string | number
  row?: number
  view?: string
}
/******************************
 * @inject_선언
 *******************************/

/******************************
 * @Props_선언
 * TODO type & default 작성
 *******************************/
const props = withDefaults(defineProps<propType>(), {
  value: '',
  title: '',
  row: 0,
  view: 'text'
})

/******************************
 * @VModel_선언
 *******************************/

/******************************
 * @Data_선언
 * TODO ref, reactive 사용, 불명확한 단어 사용 X (ex. data, date)
 *******************************/

/******************************
 * @Computed_선언
 *******************************/
const setStyle = computed(() => {
  let returnStyle = ''
  const height = props.row > 0 ? String(22 * props.row) + 'px' : 'auto'
  returnStyle =
    'max-height: ' + height + ';min-height: ' + (height === 'auto' ? '27px' : height) + ';'
  // const fontColor = !(props.row > 0) ? 'color: #2196F3;' : ''
  // returnStyle += fontColor
  return returnStyle
})
const convertValue = computed(() => {
  let vValue = props.value
  if (props.value === null) vValue = 'N/A'
  if (vValue) vValue = String(vValue).replace(/\n/g, '<br/>')
  return vValue
})

/******************************
 * @Watch_선언
 *******************************/

/******************************
 * @Life_cycle_선언
 *******************************/
</script>
