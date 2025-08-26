<template>
  <div class="header-shotcut">
    <span>
      <q-btn flat dense color="white" class="top-shortcut-round" icon="language">
        <q-menu
          anchor="bottom left"
          self="top middle"
          auto-close
          transition-show="jump-down"
        transition-hide="jump-up"
          class="top-menu-layer"
        >
          <q-list class="header-change-lang">
            <q-item
              clickable
              v-ripple
              v-for="tag in LangItems"
              :key="tag.code"
              :name="tag.codeName"
              style="padding-left: 5px !important"
              ref="tag"
              @click="setDefaultLanguage(tag)"
            >
              <q-item-section avatar class="header-change-lang-icon">
                <country-flag v-if="tag.code !== 'generator'" :country="tag.icon" />
                <q-icon v-else :name="tag.icon" style="font-size: 28px !important" />
              </q-item-section>
              <q-item-section class="header-change-lang-txt">
                <q-item-label lines="1">{{ tag.codeName }}</q-item-label>
              </q-item-section>
              <q-item-section avatar v-if="checkSelectedLang(tag.code)">
                <q-icon color="primary" size="15px" name="check" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { storeToRefs } from 'pinia'
import Cookies from 'js-cookie'
import CountryFlag from 'vue-country-flag-next'
import { forEach } from 'lodash-es'

import selectConfig from '@utils/selectConfig'
import { $http } from '@utils/http'

import { useUserStore } from '@stores/user'

import { useMessage } from '@/composable/message'

defineOptions({
  name: 'changeLanuage'
})

/** userStore 호출 */
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
/** message 호출 */
const { requestSuccess } = useMessage()
/** langStore 호출 */
const langStore = useLangTranStore()

const lang = ref<string | undefined>('')
const generatorUrl = ref('')
const LangItems = computed(() => {
  const items = [
    {
      icon: 'kr',
      code: 'kr',
      codeName: 'Korea'
    },
    {
      icon: 'us',
      code: 'en',
      codeName: 'English'
    },
    {
      icon: 'jp',
      code: 'ja',
      codeName: 'Japen'
    },
    {
      icon: 'cn',
      code: 'zh_cn',
      codeName: 'Chinise(CN)'
    },
    {
      icon: 'tw',
      code: 'zh_tw',
      codeName: 'Chinise(TW)'
    },
    {
      icon: 'autorenew',
      code: 'generator',
      codeName: 'JSON 업데이트'
    }
  ]
  return items
})

onBeforeMount(() => {
  init()
})

function init() {
  generatorUrl.value = selectConfig.language.generatorJson.url
  lang.value = Cookies.get('language') ? Cookies.get('language') : 'kr'
  setClass()
}

function setDefaultLanguage(tag: { code: string }) {
  if (tag.code !== 'generator') {
    Cookies.set('language', tag.code)
    window.location.reload()
  } else {
    $http({
      url: generatorUrl.value,
      method: 'GET'
    }).then(() => {
      langStore.refetchLang().finally(() => {
        requestSuccess()
      })
    })
  }
}

function setClass() {
  forEach(LangItems.value, (_item: any) => {
    if (lang.value == _item.code) {
      _item.class = 'activeLanuage'
    }
  })
}

function checkSelectedLang(_code: string) {
  const _lang = Cookies.get('language') ? Cookies.get('language') : 'kr'
  if (_lang === _code) {
    return true
  } else {
    return false
  }
}
</script>
