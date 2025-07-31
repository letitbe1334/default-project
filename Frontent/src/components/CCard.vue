<template>
  <q-card
    bordered
    flat
    :class="[
      radiusFlag ? 'custom-card' : 'custom-card-noradius',
      topClass,
      noMarginPadding ? 'padding-margin-none' : ''
    ]"
  >
    <q-card-section v-if="!noHeaderCard" class="q-pa-xs cardhead" :class="'bg-' + bgClass">
      <div class="row items-center no-wrap">
        <div v-if="isTitle" class="col">
          <div class="text-h6" :class="'text-' + titleClass">
            <i
              v-if="isCardIcon"
              :class="[
                'material-icons',
                'pe-7s-angle-right-circle',
                titleClass ? 'text-' + titleClass : ''
              ]"
            >
              check_circle
            </i>
            {{ $language(props.title) }}
            <slot name="card-description" />
          </div>
        </div>
        <template v-else>
          <slot name="card-title-custom" />
        </template>
        <div class="col-auto">
          <slot name="card-button" />
        </div>
        <div class="col-auto cardselectarea">
          <slot name="card-select" />
        </div>
        <div class="float-right">
          <q-btn
            v-if="collapsed || title == '개정'"
            flat
            dense
            class="card-collapse"
            color="grey-6"
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
          />
        </div>
      </div>
    </q-card-section>
    <q-separator v-if="!noHeaderCard" />
    <q-card-section
      v-show="expanded"
      :class="['q-pa-sm row cardheader customCardbody', !displayFlax ? 'displayNoFlax' : '']"
      :style="
        height ? { height: height, 'min-height': height, 'max-height': height } : { height: 'auto' }
      "
    >
      <slot name="card-detail" />
    </q-card-section>
  </q-card>
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
  name: 'CCard'
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
  radiusFlag?: boolean
  displayFlax?: boolean
  title?: string
  height?: string
  bgClass?: string
  titleClass?: string
  collapsed?: boolean
  noHeader?: boolean
  topClass?: string
  noMarginPadding?: boolean
  isCardIcon?: boolean
  isRevision?: boolean
}

/******************************
 * @inject_선언
 *******************************/

/******************************
 * @Props_선언
 * TODO type & default 작성
 *******************************/
const props = withDefaults(defineProps<propType>(), {
  radiusFlag: true,
  displayFlax: true,
  title: '',
  height: 'auto',
  bgClass: 'grey-3',
  titleClass: 'grey-8',
  collapsed: false,
  noHeader: false,
  topClass: '',
  noMarginPadding: false,
  isCardIcon: true,
  isRevision: false
})

/******************************
 * @Data_선언
 * TODO ref, reactive 사용, 불명확한 단어 사용 X (ex. data, date)
 *******************************/
const expanded = ref(true)

/******************************
 * @Computed_선언
 *******************************/
const isTitle = computed(() => Boolean(props.title))
const noHeaderCard = computed(() => props.noHeader)

/******************************
 * @Watch_선언
 *******************************/
watch(
  () => props.isRevision,
  () => {
    if (props.isRevision) {
      // true로 바뀐 경우
      expanded.value = true
    } else if (!props.isRevision && props.title == '개정') {
      expanded.value = false
    }
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
 * @Provide_선언
 *  ! types 폴더에 type 명시
 *******************************/
</script>
