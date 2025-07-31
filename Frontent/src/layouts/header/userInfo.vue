<template>
  <div class="header-shotcut">
    <q-btn
      flat
      dense
      color="white"
      class="top-shortcut-round"
      :label="userName"
      icon="account_circle"
    >
      <q-popup-proxy transition-show="jump-down" transition-hide="jump-up" class="top-menu-layer">
        <q-card class="header-userinfo-layer">
          <q-card-section class="menu-userinfo-user">
            <q-icon name="account_circle" color="white" />
            {{ userName }}
          </q-card-section>
          <q-card-section class="menu-userinfo-dept">
            <q-icon name="business" color="white" />
            {{ userDeptName }}
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

const userName = ref('')
const userDeptName = ref('')
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
  userName.value = user.value.userName
  userDeptName.value = user.value.deptName
}

function logout() {
  login.LogOut().finally(() => {
    location.reload() // In order to re-instantiate the vue-router object to avoid bugs
  })
}
</script>
