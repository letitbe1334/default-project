<template>
  <div class="loginLayout">
    <section class="loginfrm ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12 col-lg-10">
            <div class="wrap d-md-flex">
              <div class="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                <div class="text w-100 anivertilogo">
                  <h2>Andami – SHMS</h2>
                  <p>(PSM Based Safety and Health Management System)</p>
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
                      ref="userIdInput"
                      class="loginText"
                      rounded
                      outlined
                      color="login-main-color"
                      filled
                      v-model="loginForm.userId"
                      placeholder="ID"
                      name="userId"
                      required
                    >
                      <template v-slot:prepend>
                        <q-icon name="person" />
                      </template>
                      <template v-slot:append>
                        <q-icon
                          name="close"
                          @click="loginForm.userId = ''"
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
                  </div>
                  <div class="form-group d-md-flex">
                    <div class="w-50 text-left">
                      <label class="checkbox-wrap checkbox-primary mb-0">
                        Remember User ID
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

const route = useRoute()
const router = useRouter()

/** message 호출 */
const { alert } = useMessage()
/** langTran 호출 */
const langTran = useLangTranStore()
/** login 호출 */
const { LoginByUserAccount, LogOut } = useLogin()

// const cookies = inject('$cookies')
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
const connIp = ref('')
const rememberMe = ref(false)
const isPwd = ref(true)
const loginForm = reactive({
  userId: '',
  password: ''
})
const loading = ref(false)
const redirect = ref<string | null>(null)
const popupOptions = ref<popupParamType>({
  target: null,
  title: '',
  visible: false,
  width: '40%',
  isFull: false,
  param: {},
  closeCallback: null
})
const lang = ref('')

watch(
  route,
  () => {
    redirect.value = String(route.query?.redirect)
  },
  { immediate: true }
)

onBeforeMount(() => {
  lang.value = Cookies.get('language') || 'kr'

  _.forEach(LangItems, (_item) => {
    if (lang.value === _item.code) {
      selectedCountry.value = _item.codeName
    }
  })

  // orderedPromise([
  //   { func: getLangInfo, param: 'login' },
  //   { func: getLangInfo, param: 'common' }
  // ])
  setClass()
})

onMounted(() => {
  $http({
    url: 'https://ipinfo.io/json',
    method: 'GET'
  }).then((_result: any) => {
    connIp.value = _result.data.ip
  })
  init()
})

function init() {
  const rememberLoginId = window.localStorage.getItem('rememberLoginId')
  if (rememberLoginId !== null) {
    loginForm.userId = decrypt(rememberLoginId)
    rememberMe.value = true
  }
}

function onSubmit() {
  loading.value = true
  orderedPromise([
    // { func: checkValid, exceptionMessage: 'M0000000001' }, /** id, pwd 입력여부 */
    { func: actionLogin } /** login api 호출 */,
    { func: getLangInfo } /** 언어별 라벨, 메시지 정보 get */
  ])
}

function actionLogin() {
  return new Promise((_resolve, _reject) => {
    if (rememberMe.value === true) {
      window.localStorage.setItem('rememberLoginId', encrypt(loginForm.userId))
    } else {
      window.localStorage.removeItem('rememberLoginId')
    }
    Cookies.set('language', lang.value)
    loading.value = true

    LoginByUserAccount({
        userId: loginForm.userId,
        password: encrypt(loginForm.password),
        connIp: connIp.value
      })
      .then(() => {
        _resolve(true)
      })
      .catch((error) => {
        if (error && error.response.data.returnCode === 'INIT_PASSWORD') {
          changePassword(loginForm.userId)
          _resolve(false)
        } else if (error && error.response.data.returnCode === 'PASS_PASSWORD') {
          changePassword(error.response.data.message)
          _resolve(false)
        } else if (error && error.response.data.returnCode === 'UNDER_CONSTRUCTION') {
          // 개발서버 접속 못하게 설정하였을 경우
          alert({
            title: '알림',
            message: error.response.data.message,
            type: 'info'
          })
        } else {
          alert({
            title: '에러',
            message: error.response.data.message,
            type: 'error'
          })
        }
        loading.value = false
        _reject(error)
      })
  })
}

function loginPageMove() {
  router
    .push({
      path:
        redirect.value === 'undefined' || redirect.value === undefined
          ? '/'
          : redirect.value || '/login'
    })
    .catch(() => {})
}

function getLangInfo() {
  return new Promise((_resolve, _reject) => {
    langTran
      .GetNonAuthLangInfo({ lang: Cookies.get('language') })
      .then((hasLang) => {
        if (hasLang) {
          loginPageMove()
        }
        loading.value = false
        _resolve(hasLang)
      })
      .catch((error) => {
        if (error && error.message === 'Network Error') {
          alert({
            title: error.message,
            message: '서버에 연결할 수 없습니다. 관리자에게 문의바랍니다.',
            type: 'info',
            buttonLabel: '확인'
          })
        } else {
          alert({
            title: '로그인 에러',
            message: '로그인 진행중 에러가 발생하였습니다. 관리자에게 문의바랍니다.',
            type: 'info',
            buttonLabel: '확인'
          })
          LogOut()
            .then(() => {
              loginPageMove()
            })
            .catch(() => {
              loginPageMove()
            })

          loading.value = false
        }
        _reject()
      })
  })
}

function changePassword(message: string) {
  popupOptions.value.title = '비밀번호 변경 안내'
  popupOptions.value.param = {
    loginId: loginForm.userId,
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
</script>
