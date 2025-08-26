<template>
  <div class="header-shotcut">
    <q-btn flat dense color="white" class="top-shortcut-round" icon="notifications">
      <q-badge
        color="red-custom"
        rounded
        floating
        v-show="isBadge"
        :class="[isBadge, 'animatedBadge']"
      />
      <q-popup-proxy transition-show="jump-down" transition-hide="jump-up" class="top-menu-layer">
        <q-card class="header-allim-layer">
          <q-card-section class="menu-search-title">
            {{ $language('알림') }}
          </q-card-section>
          <q-card-section class="menu-search-content">
            <q-tabs v-model="allimtab" narrow-indicator dense align="justify">
              <q-tab class="text-purple" name="appr" icon="mail" label="나의 결재"
                ><q-badge floating color="red" :label="apprCntTotal"
              /></q-tab>
              <q-tab class="text-orange" name="work" icon="alarm" label="업무 알림"
                ><q-badge floating color="red" :label="taskCntTotal"
              /></q-tab>
              <q-tab class="text-teal" name="push" icon="movie" label="푸시 알림"
                ><q-badge floating color="red" :label="pushMessageCntTotal"
              /></q-tab>
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="allimtab" animated>
              <q-tab-panel name="appr">
                <q-list separator>
                  <q-item clickable v-ripple @click="goPage('/sys/appr/doc/apprTodo')">
                    <q-item-section avatar>
                      <q-avatar size="sm" color="primary" text-color="white">{{
                        apprCnt1
                      }}</q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="allim-txt">결재할 문서</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="chat_bubble" color="green" size="xs" />
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-ripple @click="goPage('/sys/appr/doc/apprTodo')">
                    <q-item-section avatar>
                      <q-avatar size="sm" color="primary" text-color="white">{{
                        apprCnt2
                      }}</q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="allim-txt">합의할 문서</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="chat_bubble" color="green" size="xs" />
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-ripple @click="goPage('/sys/appr/doc/apprTodo')">
                    <q-item-section avatar>
                      <q-avatar size="sm" color="primary" text-color="white">{{
                        apprCnt3
                      }}</q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="allim-txt">확인할 문서</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="chat_bubble" color="green" size="xs" />
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-ripple @click="goPage('/sys/appr/doc/apprPass')">
                    <q-item-section avatar>
                      <q-avatar size="sm" color="orange" text-color="white">{{
                        apprCnt4
                      }}</q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="allim-txt">회람함 (최근 1주일)</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="chat_bubble" color="orange" size="xs" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="work">
                <div class="text-h6">알림이 없습니다.</div>
              </q-tab-panel>

              <q-tab-panel name="push">
                <q-list separator>
                  <q-item clickable v-ripple v-for="msg in pushMessages" :key="msg.title">
                    <q-item-section avatar>
                      <q-avatar size="sm" color="primary" text-color="white">P</q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ msg.title }}</q-item-label>
                      <q-item-label caption lines="1">{{ msg.content }}</q-item-label>
                      <q-item-label caption lines="2">{{ msg.regDt }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="close" color="red" size="xs" @click="deletePush(msg)" />
                    </q-item-section>
                  </q-item>
                </q-list>
                <div style="text-align: center; padding-top: 20px" v-if="isPushMessage">
                  <q-btn-group outline>
                    <c-btn
                      label="푸시알림 비우기"
                      icon="delete_forever"
                      color="red-5"
                      @btnClicked="deletePushAll"
                    />
                  </q-btn-group>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card>
      </q-popup-proxy>
    </q-btn>
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
 import { useMessage } from '@/composable/message'

/******************************
 * @컴포넌트_옵션_선언
 * TODO 이름 정의 (파일 이름 그대로 지정)
 *******************************/
defineOptions({
  name: 'allim'
})

/******************************
 * @Pinia_store_선언
 * TODO 반응형 유지를 위해 storeToRefs 사용 (function은 사용 X)
 *******************************/
/** message 호출 */
const { confirm, requestSuccess } = useMessage()
const userStroe = useUserStore()
const { user } = storeToRefs(userStroe)

/******************************
 * @Emit_선언
 *******************************/

/******************************
 * @Vue_관련_선언 (ex. vue-router)
 *******************************/
const router = useRouter()

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
const apprCnt1 = ref(0)
const apprCnt2 = ref(0)
const apprCnt3 = ref(0)
const apprCnt4 = ref(0)
const tasks = ref<Array<any>>([])
const pushMessages = ref<Array<any>>([])
const allimtab = ref('appr')

/******************************
 * @Computed_선언
 *******************************/
const apprCntTotal = computed(() => {
  return apprCnt1.value + apprCnt2.value + apprCnt3.value + apprCnt4.value
})
const taskCntTotal = computed(() => {
  return tasks.value && tasks.value.length > 0 ? _.sum(_.map(tasks.value, 'cnt')) : 0
})
const pushMessageCntTotal = computed(() => {
  return pushMessages.value && pushMessages.value.length > 0 ? pushMessages.value.length : 0
})
const isBadge = computed(() => {
  return apprCntTotal.value + taskCntTotal.value > 0 ? true : false
})
const isPushMessage = computed(() => {
  return pushMessageCntTotal.value > 0
})
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
  // url setting
  // code setting
  // list setting
  getTask()
  getPushMessage()
}

function goPage(_page: any) {
  router.push({ path: _page })
}
function getTask() {
  // $http({
  //   url: taskUrl.value,
  //   method: 'GET',
  //   params: { userId: user.value.userId }
  // }).then((_result: any) => {
  //   tasks.value = _result.data
  // })
}
function getPushMessage() {
  // $http({
  //   url: pushUrl.value,
  //   method: 'GET',
  //   params: { userId: user.value.userId }
  // }).then((_result: any) => {
  //   pushMessages.value = _result.data
  // })
}
function deletePush(_push: any) {
  confirm({
    title: '확인',
    message: '알림을 삭제하시겠습니까?',
    type: 'warning', // success / info / warning / error
    // 확인 callback 함수
    confirmCallback: () => {
      $http({
        url: $format(transactionConfig.sys.push.history.delete.url, _push.pushMessageId),
        method: 'DELETE'
      }).then((_result: any) => {
        getPushMessage()
        requestSuccess()
      })
    },
    // 취소 callback 함수
    cancelCallback: () => {}
  })
}
function deletePushAll() {
  confirm({
    title: '확인',
    message: '알림 전체를 삭제하시겠습니까?',
    type: 'warning', // success / info / warning / error
    // 확인 callback 함수
    confirmCallback: () => {
      $http({
        url: $format(transactionConfig.sys.push.history.user.url, user.value.userId),
        method: 'DELETE'
      }).then((_result: any) => {
        getPushMessage()
        requestSuccess()
      })
    },
    // 취소 callback 함수
    cancelCallback: () => {}
  })
}
/******************************
 * @Provide_선언
 *  ! types 폴더에 type 명시
 *******************************/
</script>
