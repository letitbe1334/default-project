<template>
  <div>
    <q-layout view="hHh Lpr lFf">
      <!-- 상단(헤더) -->
      <header-layout
        :menuIcon="menuIcon"
        @updateLeftDrawerOpen="updateLeftDrawerOpen"
        @updateRightDrawerOpen="updateRightDrawerOpen"
      />
      <!-- 왼쪽(메뉴) -->
      <left-layout :leftDrawer="leftDrawer" />
      <!-- 오른쪽(즐겨찾기) -->
      <right-layout :rightDrawer="rightDrawer" />
      <!-- 중앙(Contents) -->
      <q-page-container>
        <div class="page-contents">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" :key="route.name" />
            </keep-alive>
          </router-view>
          <!-- <slot /> -->
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import headerLayout from '@layouts/headerLayout.vue'
import leftLayout from '@layouts/leftLayout.vue'
import rightLayout from '@layouts/rightLayout.vue'

defineOptions({
  name: 'defaultLayout'
})

const route = useRoute()

const menuIcon = ref('menu')
const leftDrawer = ref({
  isOpen: false
})
const rightDrawer = ref({
  isOpen: false
})

function updateLeftDrawerOpen() {
  leftDrawer.value.isOpen = !leftDrawer.value.isOpen
  if (leftDrawer.value.isOpen) {
    menuIcon.value = 'menu'
  } else {
    menuIcon.value = 'sort'
  }
}

function updateRightDrawerOpen() {
  rightDrawer.value.isOpen = !rightDrawer.value.isOpen
}
</script>
