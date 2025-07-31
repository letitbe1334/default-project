<template>
  <div class="header-shotcut">
    <q-btn flat dense color="white" class="top-shortcut-round" icon="manage_search">
      <q-popup-proxy transition-show="jump-down" transition-hide="jump-up" class="top-menu-layer">
        <q-card class="header-menusearch-layer">
          <q-card-section class="menu-search-title">
            {{ $language('메뉴명 검색') }}
          </q-card-section>
          <q-card-section class="menu-search-content">
            <q-input
              outlined
              :placeholder="$language('메뉴명 입력 후 Enter 시 메뉴가 검색됩니다.')"
              v-model="filter"
            />
            <q-scroll-area class="menu-search-result" v-if="filter !== ''">
              <!-- 일치하는 메뉴명이 없습니다. -->
              <q-tree
                ref="customTreeMenu"
                :nodes="routers"
                node-key="name"
                label-key="title"
                :no-results-label="$language('일치하는 메뉴명이 없습니다.')"
                :filter="filter"
                default-expand-all
                v-model:selected="selected"
              >
                <template v-slot:header-generic="prop">
                  <div class="row items-center">
                    <div class="text-weight-bold text-primary">{{ prop.node.title }}</div>
                  </div>
                </template>
              </q-tree>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </q-popup-proxy>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { movePage } from '@utils/common'

import { usePermissionStore } from '@stores/permission'

defineOptions({
  name: 'menuSearch'
})

/** permission 호출 */
const permission = usePermissionStore()
const { routers } = storeToRefs(permission)

const router = useRouter()

const filter = ref('')
const selected = ref(null)

const customTreeMenu = ref<any>(null)

watch(selected, () => {
  if (selected.value !== null && customTreeMenu.value !== null) {
    const data = customTreeMenu.value.getNodeByKey(selected.value)
    if (data.href !== null) {
      if (data.href !== '') {
        if (data.href !== window.location.pathname) {
          filter.value = ''
          movePage(router, data.href)
          selected.value = null
          const _selectedMenu = document.getElementsByClassName('top-menu-search')[0]
          if (_selectedMenu) {
            _selectedMenu.classList.remove('show')
          }
        }
      }
    }
  }
})
</script>
