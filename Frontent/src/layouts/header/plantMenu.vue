<template>
  <div class="header-shotcut" v-if="plantItems.length > 1">
    <span>
      <q-btn flat dense color="white" class="top-shortcut-round" icon="villa">
        <q-menu
          anchor="bottom left"
          self="top middle"
          auto-close
          transition-show="jump-down"
          transition-hide="jump-up"
          class="top-menu-layer"
        >
          <q-list class="header-plant-list">
            <q-item
              v-for="tag in plantItems"
              :key="tag.code"
              clickable
              v-ripple
              :name="tag.codeName"
              :class="tag.class"
              ref="tag"
              icon="check"
              @click="setDefaultPlantCd(tag)"
            >
              <q-item-section>
                <q-item-label lines="1">{{ tag.codeName }}</q-item-label>
              </q-item-section>
              <q-item-section avatar v-if="checkDefaultPlant(tag.code)">
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
import { ref, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { indexOf, forEach } from 'lodash-es'

import { getComboItems } from '@utils/common'

import { codeMasterType } from '@/types/codeMaster'

import { useUserStore } from '@stores/user'

import { useMessage } from '@/composable/message'

defineOptions({
  name: 'plantMenu'
})

/** userStore 호출 */
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
/** message 호출 */
const { confirm } = useMessage()

const plantItems = ref<Array<codeMasterType>>([])
const defaultPlantName = ref('')

onBeforeMount(() => {
  init()
})

function init() {
  getComboItems('PLANT_CD').then((_result: any) => {
    plantItems.value = []
    let plantCds
    if (user.value.plantCds === null || user.value.plantCds === '') {
      plantCds = user.value.plantCd.split(',')
    } else {
      plantCds = user.value.plantCds.split(',')
    }
    forEach(_result, (_item) => {
      const index = indexOf(plantCds, _item.code)
      if (index > -1) {
        setClass(_item)
        plantItems.value.push(_item)
      }
    })

    if (plantItems.value.length === 1) {
      window.sessionStorage.setItem('defaultPlantCd', user.value.plantCd)
    }
  })
}

function setDefaultPlantCd(_tag: codeMasterType) {
  const defaultPlantCd = window.sessionStorage.getItem('defaultPlantCd')
  if (defaultPlantCd != _tag.code) {
    window.sessionStorage.setItem('defaultPlantCd', _tag.code)
    confirm({
      title: '확인',
      message: '변경된 기본사업장으로 화면을 새로고침 하시겠습니까?',
      type: 'info',
      confirmCallback: () => {
        window.location.reload()
      },
      cancelCallback: () => {
        forEach(plantItems.value, (_item) => {
          setClass(_item)
        })
      }
    })
  }
}

function checkDefaultPlant(_code: string) {
  const defaultPlantCd = window.sessionStorage.getItem('defaultPlantCd')
  if (defaultPlantCd === _code) {
    return true
  } else {
    return false
  }
}

function setClass(_item: codeMasterType) {
  let defaultPlantCd = window.sessionStorage.getItem('defaultPlantCd')
  if (defaultPlantCd === null || defaultPlantCd === '') {
    window.sessionStorage.setItem('defaultPlantCd', user.value.plantCd)
    defaultPlantCd = user.value.plantCd
  }
  if (defaultPlantCd === _item.code) {
    defaultPlantName.value = _item.codeName
    _item.class = 'activeTopMenu'
  } else {
    _item.class = ''
  }
}
</script>
<style lang="sass">
.topMenuShortDropdown
  padding-top: 0px !important
  padding-bottom: 0px !important
.toptabshort
  width: 26px
  height: 26px
  margin-right: 10px
  i
    margin-top: -8px
    margin-left: -6px
.topMenuShort
  min-width: 200px
  max-height: 289px
  *:hover
    text-decoration: none
  i
    font-size: 11px !important
  .q-item__label
    padding-left: 10px
</style>
