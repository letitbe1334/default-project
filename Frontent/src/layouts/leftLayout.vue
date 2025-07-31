<template>
  <div class="left-sidebar-container">
    <q-drawer v-model="drawerOpen" show-if-above bordered :width="250">
      <q-scroll-area style="height: 100%">
        <q-list class="left-sidebar-menu">
          <menu-item
            v-for="(menu, idx) in menus"
            :key="`${menu.name}_${idx}`"
            :menu="menu"
            :level="0"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'

import { usePermissionStore } from '@stores/permission'

import menuItem from '@layouts/menuItem.vue'

defineOptions({
  name: 'leftLayout'
})

/** permission 호출 */
const permission = usePermissionStore()
const { routers } = storeToRefs(permission)

const menus = ref(routers.value)
const props = defineProps({
  leftDrawer: {
    type: Object,
    default: () => {
      return {
        isOpen: false
      }
    }
  }
})
const drawerOpen = ref(props.leftDrawer.isOpen)
watchEffect(() => {
  menus.value = routers.value
})
watch(
  () => props.leftDrawer.isOpen,
  (newVal) => {
    drawerOpen.value = newVal
  }
)
watch(drawerOpen, (newVal) => {
  props.leftDrawer.isOpen = newVal // 필요 시 상위 컴포넌트와 동기화
})
</script>
