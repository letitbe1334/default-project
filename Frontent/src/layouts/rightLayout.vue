<template>
  <div class="right-sidebar-container">
    <q-drawer side="right" v-model="drawerOpen" bordered overlay persistent :width="250">
      <q-scroll-area style="height: 100%">
        <VueDraggableNext
          tag="ul"
          :list="favorites"
          class="list-group2 right-favorive-list"
          handle=".linehandle2"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
          @change="moveApprLine"
          :move="checkMove"
        >
          <transition-group type="transition" :name="!drag ? 'flip-list' : ''">
            <li
              class="list-group-item2 linehandle2"
              v-for="element in favorites"
              :key="element.sysMenuId"
            >
              <i class="material-icons linehandley2">reorder</i>
              <div class="linetext2" @click="movePageTab(element.href)">
                {{ element.title }}
                <q-tooltip anchor="center left" self="center right">{{ element.title }}</q-tooltip>
              </div>
              <i class="material-icons lineclose2" @click="removeAt(element.sysMenuId)">clear</i>
            </li>
          </transition-group>
        </VueDraggableNext>
      </q-scroll-area>
      <q-img class="absolute-top" src="@images/material.png" style="height: 50px">
        <div class="absolute-bottom bg-transparent">
          <div class="text-weight-bold">{{ $language('즐겨찾기') }}</div>
        </div>
      </q-img>
    </q-drawer>
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
import { VueDraggableNext } from 'vue-draggable-next'

/******************************
 * @컴포넌트_옵션_선언
 * TODO 이름 정의 (파일 이름 그대로 지정)
 *******************************/
defineOptions({
  name: 'rightLayout'
})

/******************************
 * @Pinia_store_선언
 * TODO 반응형 유지를 위해 storeToRefs 사용 (function은 사용 X)
 *******************************/
const router = useRouter()
/** userStore 호출 */
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
/** app 호출 */
const app = useAppStore()
const { favorites } = storeToRefs(app)
app.GetFavorites({ userId: user.value.userId })

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
interface propType {
  rightDrawer: {
    isOpen: boolean
  }
}

/******************************
 * @inject_선언
 *******************************/

/******************************
 * @Props_선언
 * TODO type & default 작성
 *******************************/
const props = withDefaults(defineProps<propType>(), {
  rightDrawer: () => {
    return {
      isOpen: false
    }
  },
  contentHeight: 'auto'
})
/******************************
 * @VModel_선언
 *******************************/

/******************************
 * @Data_선언
 * TODO ref, reactive 사용, 불명확한 단어 사용 X (ex. data, date)
 *******************************/
const editable = ref(true)
const drawerOpen = ref(props.rightDrawer.isOpen)
const drag = ref(false)

/******************************
 * @Computed_선언
 *******************************/
const dragOptions = computed(() => ({
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost'
}))

/******************************
 * @Watch_선언
 *******************************/
watch(
  () => props.rightDrawer.isOpen,
  (newVal) => {
    drawerOpen.value = newVal
  }
)
watch(drawerOpen, (newVal) => {
  props.rightDrawer.isOpen = newVal // 필요 시 상위 컴포넌트와 동기화
})
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
function movePageTab(_page: any) {
  drawerOpen.value = false
  router.push({ path: _page })
}
function moveApprLine() {
  let _cnt = 1
  _.forEach(favorites.value, (item: any) => {
    item.sortOrder = _cnt
    _cnt++
  })
  $http({
    url: transactionConfig.sys.favorite.save.url,
    method: 'POST',
    data: favorites.value
  }).then((_result: any) => {
    app.GetFavorites({ userId: user.value.userId })
  })
}
function checkMove(e: any) {
  if (e.draggedContext.futureIndex === 0) {
    return false
  }
}
function removeAt(_sysMenuId: any) {
  $http({
    url: transactionConfig.sys.favorite.insert.url,
    method: 'PUT',
    data: {
      userId: user.value.userId,
      sysMenuId: _sysMenuId
    }
  }).then((_result: any) => {
    app.GetFavorites({ userId: user.value.userId })
  })
}
/******************************
 * @Provide_선언
 *  ! types 폴더에 type 명시
 *******************************/
</script>
