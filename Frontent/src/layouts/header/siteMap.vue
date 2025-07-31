<template>
  <div class="header-shotcut">
    <span>
      <q-btn flat dense color="white" class="top-shortcut-round" icon="local_library">
        <q-tooltip>{{ $language('전체 메뉴') }}</q-tooltip>
        <q-popup-proxy transition-show="jump-down" transition-hide="jump-up" class="site-map-layer">
          <div class="horizon-full-menu-area2">
            <div class="row items-center top-menu-item-group2-head2">
              <q-btn
                v-for="(topMenu, idx) in menus"
                :key="idx"
                :icon="topMenu.icon"
                :flat="state.activeMenu == topMenu.name ? false : true"
                :unelevated="state.activeMenu == topMenu.name ? true : false"
                color="blue-custom"
                size="13px"
                stack
                class="sitemap-btn"
                :label="topMenu.title"
                @mouseover="linkClick(topMenu, true)"
              />
            </div>
            <div class="top-sitemap-body">
              <ul class="under-menu-list2">
                <li v-for="(sceondMenu1, idx2) in secondMenus" :key="idx2" class="under-menu-item2">
                  <div
                    :class="[
                      'sceond-menu2',
                      sceondMenu1.children.length == 0 ? 'sceond-menu2-nochild cursor-pointer' : ''
                    ]"
                    @click="linkClick(sceondMenu1, false)"
                  >
                    <i class="material-icons">arrow_right</i> {{ sceondMenu1.title }}
                  </div>
                  <div class="third-menu" v-if="Boolean(sceondMenu1.children)">
                    <div
                      v-for="(thirdMenu, idx3) in sceondMenu1.children"
                      :key="idx3"
                      class="third-menu-item2"
                    >
                      <i class="material-icons under-muenu-title2">arrow_right</i>
                      <a
                        v-if="!Boolean(thirdMenu.children) || thirdMenu.children.length <= 0"
                        class="third-menu-button cursor-pointer"
                        @click="linkClick(thirdMenu, false)"
                      >
                        {{ thirdMenu.title }}
                      </a>
                      <span v-else>
                        {{ thirdMenu.title }}
                        <div class="third-menu-pop" v-if="Boolean(thirdMenu.children)">
                          <div v-for="(lastMenu, idx4) in thirdMenu.children" :key="idx4">
                            <a
                              class="third-menu-button cursor-pointer"
                              @click="linkClick(lastMenu, false)"
                            >
                              <i class="material-icons under-muenu-title2">arrow_right</i>
                              {{ lastMenu.title }}
                            </a>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </q-popup-proxy>
      </q-btn>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePermissionStore } from '@stores/permission'
import { movePage } from '@utils/common'

defineOptions({
  name: 'siteMap'
})

interface link {
  name: string
  href: string
}
const state = ref({
  isTopMenuOpen: false,
  isOpen: false,
  isOpenMobileMenu: false,
  activeMenu: '',
  dropdownMenuFullClass: 'dropdown-menu-full2'
})

/** permission 호출 */
const permission = usePermissionStore()
const { routers } = storeToRefs(permission)

const menus = ref(routers.value)
const router = useRouter()

const secondMenus = computed(() => {
  if (!state.value.activeMenu) {
    if (menus.value.length > 0) {
      state.value.activeMenu! = menus.value[0].name
    }
  }
  const selectMenu = menus.value.find((menu) => menu.name === state.value.activeMenu) as any
  if (selectMenu !== undefined) {
    return selectMenu.children
  } else {
    return selectMenu
  }
})

function linkClick(_link: link, isTop: boolean) {
  if (isTop) {
    state.value.activeMenu = _link.name
  }
  if (_link.href) {
    movePage(router, _link.href)
    const _selectedMenu = document.getElementsByClassName('dropdown-menu-full2')[0]
    if (_selectedMenu) {
      _selectedMenu.classList.remove('show')
    }
  }
}
</script>
