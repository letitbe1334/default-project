<template>
  <div class="topTabs">
    <q-tabs
      v-model="topTab"
      dense
      inline-label
      outside-arrows
      mobile-arrows
      align="left"
      class="tabmenu-bg"
    >
      <VueDraggableNext :list="visitedViews" class="topTab-drag" ghost-class="topTab-drag-ghost">
        <q-tab
          v-for="tag in visitedViews"
          ref="tag"
          :key="tag.path"
          :name="tag.path"
          :label="tag.title"
          :class="getFavoriteClass(tag.name)"
          v-on:click="movePath(tag.path)"
        >
          <q-menu transition-show="scale" transition-hide="scale" touch-position context-menu>
            <q-list dense class="topTabContext">
              <q-item clickable v-close-popup v-on:click="allCloseTab">
                <q-item-section
                  ><q-icon class="text-dark" name="cancel" /> {{ $language('전체닫기') }}
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup v-on:click="OtherCloseTab(tag)">
                <q-item-section
                  ><q-icon class="text-dark" name="highlight_off" /> {{ $language('다른탭닫기') }}
                </q-item-section>
              </q-item>
              <!-- <q-item clickable v-close-popup v-on:click="addFavoriteTab(tag)">
                <q-item-section
                  ><q-icon class="text-dark" name="star" /> {{ setFavoriteLabel(tag) }}
                </q-item-section>
              </q-item> -->
              <q-item clickable v-close-popup v-on:click="openNewWindow(tag)">
                <q-item-section
                  ><q-icon class="text-dark" name="launch" /> {{ $language('새창으로 열기') }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          <q-icon
            class="deltab3 text-orange"
            name="bug_report"
            @click="openDefect(tag)"
            v-if="isDefectManage()"
          >
            <q-tooltip>{{ $language('결함등록') }}</q-tooltip>
          </q-icon>
          <q-icon
            class="deltab2 text-orange"
            name="quiz"
            @click="openManual(tag)"
            v-if="tag.meta.manual"
          >
            <q-tooltip>{{ $language('매뉴얼 보기') }}</q-tooltip>
          </q-icon>
          <q-icon class="deltab text-primary" name="close" @click="closeTag(tag)">
            <q-tooltip>{{ $language('닫기') }}</q-tooltip>
          </q-icon>
        </q-tab>
      </VueDraggableNext>
    </q-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { VueDraggableNext } from 'vue-draggable-next'
import { findIndex } from 'lodash-es'

import transactionConfig from '@utils/transactionConfig'
import { movePage } from '@utils/common'
import { $http } from '@utils/http'

import { routeView } from '@/types/routerView'
import { GetTranLanguageFunction } from '@/types/language'
// import { favorite } from '@/types/favoriteMenu'

import { useTagViewsStore } from '@stores/tagsView'
import { useUserStore } from '@stores/user'
import { useAppStore } from '@stores/app'

defineOptions({
  name: 'tabMenus'
})

/** tagViews 호출 */
const tagViews = useTagViewsStore()
const { visitedViews } = storeToRefs(tagViews)

/** userStore 호출 */
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

/** app 호출 */
const app = useAppStore()
const { favorites } = storeToRefs(app)
// TODO
// setTimeout(() => {
//   if (!favorites.value || favorites.value.length === 0) {
//     app.GetFavorites({ userId: user.value.userId })
//   }
// }, 500)

const route = useRoute()
const router = useRouter()

const $language = inject('$language') as GetTranLanguageFunction

const topTab = ref('menus')

watch(route, () => {
  addViewTags()
  topTab.value = route.path
})
watch(topTab, () => {
  if (topTab.value !== route.path) {
    topTab.value = route.path
  }
})

onMounted(() => {
  addViewTags()
  topTab.value = route.path
})

function isDefectManage() {
  return user.value.defectManageFlag === 'Y' ? true : false
}

function getFavoriteClass(_sysMenuId: any) {
  if (findIndex(favorites.value, { sysMenuId: _sysMenuId }) > -1) {
    return 'favoritePageTab'
  } else {
    return ''
  }
}

function addViewTags() {
  if (route.name) {
    tagViews.addView(route)
  }
  return false
}

function isActive(path: string) {
  return route.path === path
}

function movePath(path: string) {
  if (!isActive(path)) {
    movePage(router, path)
  }
}

function closeTag(tag: routeView) {
  tagViews.delView(tag).then((visitedViews: any) => {
    if (isActive(tag.path)) {
      const latestView = visitedViews.slice(0)[0]
      if (latestView) {
        router.push(latestView)
      } else {
        router.push(user.value.url!)
      }
    }
  })
}

function openManual(tag: routeView) {
  window.open(
    '/sys/menu/manualPage?sysMenuId=' + String(tag.name) + '',
    'manualpop',
    'width=1120, height=768, menubar=no, status=no, toolbar=no'
  )
}

function openDefect(tag: routeView) {
  window.open(
    '/sys/defect/defectManage?sysMenuId=' + String(tag.name) + '',
    'manualpop',
    'width=' + (window.innerWidth - 200) + ', height=768, menubar=no, status=no, toolbar=no'
  )
}

function allCloseTab() {
  tagViews.delAllViews()
  router.push(user.value.url!)
}

function OtherCloseTab(tag: routeView) {
  if (route.path !== tag.path) {
    router.push(tag)
  }
  tagViews.delOthersViews(tag).then(() => {
    topTab.value = route.path
  })
}

function setFavoriteLabel(tag: routeView) {
  if (findIndex(favorites.value, { sysMenuId: String(tag.name) }) < 0) {
    return $language('즐겨찾기 추가')
  } else {
    return $language('즐겨찾기 삭제')
  }
}

// TODO
// function addFavoriteTab(tag: routeView) {
//   let method = 'PUT'
//   if (findIndex(favorites.value, { sysMenuId: String(tag.name) }) < 0) {
//     method = 'POST'
//   }
//   $http({
//     url: transactionConfig.sys.favorite.insert.url,
//     method: method,
//     data: {
//       userId: user.value.userId,
//       sysMenuId: tag.name,
//       sortOrder: favorites.value.length + 1
//     }
//   }).then(() => {
//     app.GetFavorites({ userId: user.value.userId })
//   })
// }

function openNewWindow(tag: routeView) {
  window.open(tag.fullPath)
}
</script>
