<template>
  <div class="header-shotcut">
    <q-btn
      flat
      dense
      color="white"
      class="top-shortcut-round"
      :label="user.nickname"
      icon="account_circle"
    >
      <q-popup-proxy transition-show="jump-down" transition-hide="jump-up" class="top-menu-layer">
        <q-card class="header-userinfo-layer">
          <q-card-section class="menu-userinfo-user">
            <q-icon name="account_circle" color="white" />
            {{ user.nickname }}
          </q-card-section>
          <q-card-section class="menu-userinfo-dept">
            <q-icon name="business" color="white" />
            {{ user.email }}
          </q-card-section>
          <q-card-actions align="around" class="menu-userinfo-btn">
            <q-btn
              outline
              rounded
              size="sm"
              icon="logout"
              color="orange"
              style="width: 110px"
              label="Logout"
              @click="logout"
            />
          </q-card-actions>
        </q-card>
      </q-popup-proxy>
    </q-btn>
    <c-dialog :param="popupOptions" />
  </div>
</template>

<script setup lang="ts">
import { useLogin } from '@/composable/login'

defineOptions({
  name: 'userInfo'
})

/** login 호출 */
const login = useLogin()
/** userStore 호출 */
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const popupOptions = ref({
  target: {},
  title: '',
  visible: false,
  width: '40%',
  isFull: false,
  param: {},
  closeCallback: () => {}
})

onMounted(() => {
  init()
})

function init() {
}

function logout() {
  login.LogOut().finally(() => {
    location.reload()
  })
}
</script>
