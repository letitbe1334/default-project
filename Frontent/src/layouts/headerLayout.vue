<template>
  <q-header class="layout-header">
    <q-toolbar>
      <q-toolbar-title @click="goPage('/')"><img width="200px" height="45px" src="@images/logo.png" /></q-toolbar-title>
      <q-btn flat dense :icon="props.menuIcon" aria-label="Menu" @click="toggleLeftDrawer" />
      <tab-menus />
      <div class="header-right-menu">
        <div class="header-shotcut">
          <q-btn
            flat
            dense
            color="white"
            class="top-shortcut-round"
            icon="star"
            @click="toggleRightDrawer"
          >
            <q-tooltip>{{ $language('즐겨찾기') }}</q-tooltip>
          </q-btn>
        </div>
        <user-info />
        <allim />
        <change-lanuage />
        <menu-search />
        <site-map />
      </div>
    </q-toolbar>
  </q-header>
</template>
<script setup lang="ts">
import tabMenus from '@layouts/header/tabMenus.vue'
import allim from '@layouts/header/allim.vue'
import siteMap from '@layouts/header/siteMap.vue'
import menuSearch from '@layouts/header/menuSearch.vue'
import changeLanuage from '@layouts/header/changeLanuage.vue'
import userInfo from '@layouts/header/userInfo.vue'
const router = useRouter()
defineOptions({
  name: 'headerLayout'
})

interface propType {
  menuIcon: string
}
const emits = defineEmits(['updateLeftDrawerOpen', 'updateRightDrawerOpen'])

const props = withDefaults(defineProps<propType>(), {
  menuIcon: ''
})

function toggleLeftDrawer() {
  emits('updateLeftDrawerOpen')
}
function toggleRightDrawer() {
  emits('updateRightDrawerOpen')
}
function goPage(_path: string) {
  router.push({ path: _path })
}
</script>
