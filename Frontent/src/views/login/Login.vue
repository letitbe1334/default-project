<template>
  <div class="loginLayout">
    <section class="loginfrm ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12 col-lg-10">
            <div class="wrap d-md-flex">
              <div class="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                <div class="text w-100 anivertilogo">
                  <h2>DEOH - default project</h2>
                </div>
              </div>
              <div class="login-wrap p-4 p-lg-5">
                <div class="d-flex">
                  <div class="w-100">
                    <h3 class="mb-4">{{ $language('Log In') }}</h3>
                  </div>
                  <div class="w-100" />
                </div>
                <q-form @submit="onSubmit" class="signin-form">
                  <div class="form-group mb-3">
                    <q-input
                      class="loginText"
                      rounded
                      outlined
                      color="login-main-color"
                      filled
                      v-model="loginForm.email"
                      placeholder="ID"
                      name="email"
                      required
                    >
                      <template v-slot:prepend>
                        <q-icon name="person" />
                      </template>
                      <template v-slot:append>
                        <q-icon
                          name="close"
                          @click="loginForm.email = ''"
                          class="cursor-pointer"
                        />
                      </template>
                    </q-input>
                  </div>
                  <div class="form-group mb-3">
                    <q-input
                      class="loginText"
                      :type="isPwd ? 'password' : 'text'"
                      rounded
                      outlined
                      color="login-main-color"
                      filled
                      v-model="loginForm.password"
                      placeholder="PASSWORD"
                      autoComplete="on"
                      name="password"
                      required
                    >
                      <template v-slot:prepend>
                        <q-icon name="password" />
                      </template>
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                      </template>
                    </q-input>
                  </div>
                  <div class="form-group mb-3">
                    <q-input
                      class="loginText"
                      type="text"
                      rounded
                      outlined
                      color="login-main-color"
                      filled
                      v-model="loginForm.nickname"
                      placeholder="닉네임"
                      autoComplete="on"
                      name="nickname"
                    >
                      <template v-slot:prepend>
                        <q-icon name="badge" />
                      </template>
                      <template v-slot:append>
                        <q-icon
                          name="close"
                          @click="loginForm.nickname = ''"
                          class="cursor-pointer"
                        />
                      </template>
                    </q-input>
                  </div>
                  <div class="form-group">
                    <q-btn
                      :loading="loading"
                      rounded
                      size="lg"
                      icon="lock_open"
                      color="login-main-color"
                      style="width: 100%"
                      type="submit"
                    >
                      Sign In
                      <template v-slot:loading>
                        <q-spinner-gears class="on-left" />
                        Sign In...
                      </template>
                    </q-btn>
                    <q-btn
                      rounded
                      size="lg"
                      icon="lock_open"
                      color="login-main-color"
                      style="width: 100%"
                      v-on:click="register"
                    >
                      회원가입
                    </q-btn>
                  </div>
                  <div class="form-group d-md-flex">
                    <div class="w-50 text-left">
                      <label class="checkbox-wrap checkbox-primary mb-0">
                        Remember Email
                        <input type="checkbox" v-model="rememberMe" />
                      </label>
                    </div>
                    <div class="w-50 text-right">
                      <q-btn flat dense :label="selectedCountry" icon="language">
                        <q-menu
                          anchor="bottom left"
                          self="top middle"
                          auto-close
                          transition-show="jump-down"
                          transition-hide="jump-up"
                        >
                          <q-list class="topMenuShortLanguage">
                            <q-item
                              clickable
                              v-ripple
                              v-for="tag in LangItems"
                              :key="tag.code"
                              :name="tag.codeName"
                              :class="tag.class"
                              style="padding-left: 5px !important"
                              ref="tag"
                              @click="setDefaultLanguage(tag)"
                            >
                              <q-item-section avatar>
                                <country-flag :country="tag.country" class="lanauageFlag" />
                              </q-item-section>
                              <q-item-section>
                                <q-item-label lines="1">{{ tag.codeName }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </q-btn>
                    </div>
                  </div>
                </q-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <c-dialog :param="popupOptions" />
  </div>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie'
import CountryFlag from 'vue-country-flag-next'
import { encrypt, decrypt } from '@utils/aes256'

import { useLogin } from '@/composable/login'
import { useMessage } from '@/composable/message'

defineOptions({
  name: 'Login'
})

const router = useRouter()

/** message 호출 */
const { alert } = useMessage()
/** login 호출 */
const { LoginByUserAccount } = useLogin()

const lang = ref('')
const selectedCountry = ref('')
const LangItems = reactive([
  {
    code: 'kr',
    country: 'kr',
    codeName: 'Korea',
    class: ''
  },
  {
    code: 'en',
    country: 'us',
    codeName: 'English',
    class: ''
  },
  {
    code: 'ja',
    country: 'jp',
    codeName: 'Japen',
    class: ''
  },
  {
    code: 'zh_cn',
    country: 'cn',
    codeName: 'Chinise(CN)',
    class: ''
  },
  {
    code: 'zh_tw',
    country: 'tw',
    codeName: 'Chinise(TW)',
    class: ''
  }
])
const rememberMe = ref(false)
const isPwd = ref(true)
const loginForm = reactive({
  email: '',
  password: '',
  nickname: ''
})
const loading = ref(false)
const popupOptions = ref<popupParamType>({
  target: null,
  title: '',
  visible: false,
  width: '40%',
  isFull: false,
  param: {},
  closeCallback: null
})
const signupUrl = ref('')

onBeforeMount(() => {
  console.log('login')
  lang.value = Cookies.get('language') || 'kr'

  _.forEach(LangItems, (_item) => {
    if (lang.value === _item.code) {
      selectedCountry.value = _item.codeName
    }
  })
  setClass()
  init()
})

function init() {
  const rememberLoginId = window.localStorage.getItem('rememberLoginId')
  if (rememberLoginId !== null) {
    loginForm.email = decrypt(rememberLoginId)
    rememberMe.value = true
  }
  signupUrl.value = transactionConfig.auth.login.signup.url
}

function onSubmit() {
  loading.value = true
  orderedPromise([
    // { func: checkValid, exceptionMessage: 'M0000000001' }, /** id, pwd 입력여부 */
    { func: actionLogin } /** login api 호출 */,
  ])
}

function actionLogin() {
  return new Promise((_resolve, _reject) => {
    if (rememberMe.value === true) {
      window.localStorage.setItem('rememberLoginId', encrypt(loginForm.email))
    } else {
      window.localStorage.removeItem('rememberLoginId')
    }
    Cookies.set('language', lang.value)
    loading.value = true

    LoginByUserAccount({
        email: loginForm.email,
        password: loginForm.password
        // password: encrypt(loginForm.password)
      })
      .then(() => {
        loginPageMove()
        loading.value = false
        _resolve(true)
      })
      .catch((error) => {
        alert({
          title: '에러',
          message: error.message,
          type: 'error'
        })
        loading.value = false
        _reject(error)
      })
  })
}

function loginPageMove() {
  router
    .push({
      path: '/'
    })
    .catch(() => {})
}

function changePassword(message: string) {
  popupOptions.value.title = '비밀번호 변경 안내'
  popupOptions.value.param = {
    loginId: loginForm.email,
    message: message
  }
  popupOptions.value.visible = true
  popupOptions.value.target = shallowRef(defineAsyncComponent(() => import(`./initChangePw.vue`)))
  popupOptions.value.closeCallback = closePopup
}

function closePopup(returnMessage: string) {
  popupOptions.value.target = null
  popupOptions.value.visible = false
  if (returnMessage === 'change') {
    alert({
      title: '안내',
      message: '다시 로그인 해주시기 바랍니다.',
      type: 'info'
    })
  }
}

function setDefaultLanguage(tag: any) {
  lang.value = tag.code
  selectedCountry.value = tag.codeName
  setClass()
}

function setClass() {
  _.forEach(LangItems, (_item) => {
    _item.class = ''
    if (lang.value == _item.code) {
      _item.class = 'activeLanuage'
    }
  })
}

function register() {
  $http({
    url: signupUrl.value,
    method: 'POST',
    data: loginForm
  }).then((_result: any) => {
    console.log(_result)
  })
}
</script>
