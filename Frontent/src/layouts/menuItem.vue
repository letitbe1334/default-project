<template>
  <q-expansion-item
    v-if="haveChild"
    ref="expansionItem"
    :key="props.menu.name"
    :icon="props.menu.icon"
    :label="props.menu.title"
    :class="'expmenu-lvl-' + props.menu.menuLevel, 'testet'"
    :default-opened="isOpened"
    :model-value="isOpened"
    @click.stop="handleExpansion"
  >
    <menu-item
      v-for="(child, idx) in props.menu.children"
      :key="`${child.name}_${idx}`"
      :menu="child"
    />
  </q-expansion-item>
  <q-card v-else class="menu-card">
    <q-card-section
      v-ripple
      :class="{
        ['expmenu-lvl-' + props.menu.menuLevel]: true,
        'menu-active': route.name === props.menu.name
      }"
      @click.exact="goPage(props.menu.name)"
    >
      {{ props.menu.title }}
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import menuItem from '@layouts/menuItem.vue'
import { menuData, usePermissionStore } from '@stores/permission'
defineOptions({
  name: 'leftLayout'
})

/** permission 호출 */
const permission = usePermissionStore()
const { openMenus } = storeToRefs(permission)

const route = useRoute()
const router = useRouter()

interface propType {
  menu: menuData
}

const props = withDefaults(defineProps<propType>(), {
  menu: () => {
    return {
      title: '',
      icon: '',
      name: '',
      path: '',
      menuLevel: '',
      githubOwner: '',
      githubRepo: '',
      githubBranch: '',
      parentMenuId: '',
      sortOrder: 0,
      children: []
    }
  },
})

// 메뉴에 자식이 있는지 확인
const haveChild = computed(() => props.menu.children && props.menu.children.length > 0)

// 현재 메뉴가 열려 있는지 확인
const isOpened = computed(() => openMenus.value.includes(props.menu.name))

// 페이지 이동 함수
function goPage(_name: string) {
  router.push({ name: _name })
}

// 메뉴 확장/축소 처리
function handleExpansion() {
  toggleMenu(props.menu.name)
}

// 메뉴 상태 토글
function toggleMenu(menuName: string) {
  const menuIndex = openMenus.value.indexOf(menuName)
  if (menuIndex > -1) {
    // 현재 메뉴를 닫기
    openMenus.value.splice(menuIndex, 1)
    openMenus.value = [...openMenus.value] // 배열 새로 할당
  } else {
    // 클릭한 메뉴 및 클릭한 메뉴의 부모만 열기
    // openMenus.value = [menuName] // 기존 메뉴 모두 닫기
    permission.findOpenMenus(menuName, true)
  }
}
</script>
