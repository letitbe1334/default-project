<template>
  <div>
    <FeatureTitle title="axios 셋팅" />
    <q-banner rounded inline-actions class="bg-grey-4">
      <template v-slot:avatar>
        <q-icon name="question_mark" color="deep-orange" />
      </template>
      Axios는 node.js와 브라우저를 위한 Promise 기반 HTTP 클라이언트임<br/>
      간편한 API를 통해 비동기적으로 HTTP 요청(GET, POST, PUT, DELETE 등)을 보내고 응답을 처리할 수 있으며<br/>
      요청/응답 인터셉터, 자동 JSON 변환, 요청 취소, 클라이언트 측 CSRF 보호 등 다양한 기능을 지원하여 보다 유연하고 강력한 통신 환경을 구축할 수 있음.
      <template v-slot:action>
        <q-btn flat color="primary" label="더 알아보기" v-on:click="goDocu" />
      </template>
    </q-banner>
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
  name: 'AxiosPresenter'
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
const route = useRoute()

/******************************
 * @Interface_선언
 *******************************/

/******************************
 * @inject_선언
 *******************************/

/******************************
 * @Props_선언
 * TODO type & default 작성
 *******************************/

/******************************
 * @VModel_선언
 *******************************/

/******************************
 * @Data_선언
 * TODO ref, reactive 사용, 불명확한 단어 사용 X (ex. data, date)
 *******************************/
const editable = ref(true)

/******************************
 * @Computed_선언
 *******************************/

/******************************
 * @Watch_선언
 *******************************/

/******************************
 * @Life_cycle_선언
 *******************************/
onMounted(() => {
  init()
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
  // role setting
  editable.value = Boolean(route.meta.editable)
  // url setting
  // code setting
  // list setting
}
/******************************
 * TODO (목적): 작업허가서 조회
 *******************************/
function goDocu() {
  window.open("https://axios-http.com/kr/docs/intro")
}

/******************************
 * @Provide_선언
 *  ! types 폴더에 type 명시
 *******************************/
</script>
