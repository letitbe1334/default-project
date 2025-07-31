<template>
  <div>
    <q-form ref="editForm">
      <c-card class="cardClassDetailForm passwordChangeArea">
        <template v-slot:card-title-custom>
          <div class="titleArea">
            <div class="title">
              “고객님의 비밀번호를 <span class="emphasis">변경</span>해 주세요.”
            </div>
            <div class="subtitle" v-html="subtitle" />
          </div>
        </template>
        <template v-slot:card-detail>
          <div class="col-12">
            <c-label-text
              title="아이디"
              style="padding-bottom: 25px !important"
              :value="userInfo.loginId"
            />
          </div>
          <div class="col-12">
            <c-text
              :required="true"
              label="기존 비밀번호"
              name="oripassword"
              type="password"
              autoComplete="off"
              v-model:value="userInfo.oripassword"
            />
          </div>
          <div class="col-12">
            <c-text
              :required="true"
              label="변경 비밀번호"
              name="password"
              type="password"
              autoComplete="off"
              v-model:value="userInfo.password"
            />
          </div>
          <div class="col-12">
            <c-text
              :required="true"
              label="변경 비밀번호 확인"
              name="passwordConf"
              type="password"
              autoComplete="off"
              v-model:value="userInfo.passwordConf"
            />
          </div>
          <div class="col-12" style="text-align: right">
            <q-btn-group outline>
              <c-btn label="다음에 변경하기" icon="redo" @btnClicked="nextChangePw" />
              <c-btn label="비밀번호 변경" icon="save" @btnClicked="savePw" />
            </q-btn-group>
          </div>
        </template>
      </c-card>
    </q-form>
  </div>
</template>
<script setup lang="ts">
/******************************
 * #Important 사용하지 않는 로직, 변수 등 선언 X
 *******************************/

/******************************
 * @import_선언
 * TODO 아래 순서에 맞추어 import (각 순서 마다 띄우기)
 *  * 1. Dependency
 *  * 2. Utils
 *  * 3. Types
 *  * 4. Stores
 *  * 5. Vue
 *  * 6. Etc (생길 시 얘기.)
 *******************************/
import { useMessage } from '@/composable/message'

/******************************
 * @컴포넌트_옵션_선언
 * TODO 이름 정의 (파일 이름 그대로 지정)
 *******************************/
defineOptions({
  name: 'initChangePw'
})

/******************************
 * @Pinia_store_선언
 * TODO 반응형 유지를 위해 storeToRefs 사용 (function은 사용 X)
 *******************************/
/** message 호출 */
const { alert, confirm, requestSuccess } = useMessage()

/******************************
 * @Emit_선언
 *******************************/
const emits = defineEmits(['closePopup'])

/******************************
 * @Vue_관련_선언 (ex. vue-router)
 *******************************/
const route = useRoute()

/******************************
 * @Interface_선언
 *******************************/
interface propType {
  popupParam: {
    loginId: stringNull
    message: stringNull
  }
}

/******************************
 * @inject_선언
 *******************************/
const $language = inject('$language') as GetTranLanguageFunction

/******************************
 * @Props_선언
 * TODO type & default 작성
 *******************************/
const props = withDefaults(defineProps<propType>(), {
  popupParam: () => {
    return {
      loginId: '',
      message: ''
    }
  }
})

/******************************
 * @VModel_선언
 *******************************/

/******************************
 * @Data_선언
 * TODO ref, reactive 사용, 불명확한 단어 사용 X (ex. data, date)
 *******************************/
const editable = ref(true)
const userInfo = ref({
  loginId: '',
  oripassword: '',
  password: '',
  passwordConf: '',
  chgUserId: ''
})
const saveUrl = ref('')
const nextChangeUrl = ref('')

/******************************
 * @Computed_선언
 *******************************/
const subtitle = computed(() => {
  let text =
    '✔ 고객님의 소중한 개인정보를 보호하기 위하여 비밀번호 변경을 안내해 드리고 있습니다.<br/>' +
    '✔ 정기적인 비밀번호 변경으로 고객님의 개인정보를 보호해 주세요.<br/>' +
    '❗❗ 비밀번호는 8자리 이상 소문자/대문자/숫자/특수문자 중 3개 이상 조합하여 작성하세요.'
  if (props.popupParam.message) {
    text = `✔ ${props.popupParam.message} <br/>` + text
  }
  return text
})

/******************************
 * @Watch_선언
 *******************************/

/******************************
 * @Life_cycle_선언
 *******************************/
onMounted(() => {
  init()
})

/******************************
 * @Function_선언
 * TODO function 주석 작성 (asdffunctionannotation 사용)
 *  * arrow function 사용해도 무관
 *******************************/
/******************************
 * TODO (목적): 초기셋팅
 *******************************/
function init() {
  // role setting
  editable.value = Boolean(route.meta.editable)
  // url setting
  saveUrl.value = transactionConfig.auth.login.changepw.url
  nextChangeUrl.value = transactionConfig.auth.login.nextChangePw.url
  // code setting
  userInfo.value.loginId = props.popupParam.loginId

  // list setting
}
function savePw() {
  const passwordReg = {
    lowerCase: /[a-z]/g,
    upperCase: /[A-Z]/g,
    numberCase: /[0-9]/g,
    /* eslint-disable-next-line */
    specialCase: /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g,
    lowerCaseTest: false,
    upperCaseTest: false,
    numberCaseTest: false,
    specialCaseTest: false
  }
  if (
    userInfo.value.oripassword === '' ||
    userInfo.value.password === '' ||
    userInfo.value.passwordConf === ''
  ) {
    alert({
      title: '안내',
      message: $language('비밀번호를 입력하세요!'), //'비밀번호를 입력하세요!',
      type: 'warning' // success / info / warning / error
    })
  } else if (userInfo.value.password !== userInfo.value.passwordConf) {
    alert({
      title: '안내',
      message: $language('변경비밀번호와 비밀번호 확인이 다릅니다.'), //'변경비밀번호와 비밀번호 확인이 다릅니다.',
      type: 'warning' // success / info / warning / error
    })
  } else {
    /**
     * 비밀번호 조건
     *  - 패스워드 길이 최소 8자리 이상
     *  - 대문자/소문자/숫자/특주문자 중 3개 포함
     */
    passwordReg.lowerCaseTest = passwordReg.lowerCase.test(userInfo.value.password)
    passwordReg.upperCaseTest = passwordReg.upperCase.test(userInfo.value.password)
    passwordReg.numberCaseTest = passwordReg.numberCase.test(userInfo.value.password)
    passwordReg.specialCaseTest = passwordReg.specialCase.test(userInfo.value.password)

    const resultTest = _.filter(passwordReg, (value) => {
      return value === false
    })
    if (resultTest.length > 1 || userInfo.value.password.length < 8) {
      alert({
        title: '안내',
        message:
          '비밀번호는 최소 8자리여야 하며,\n 대문자/소문자/숫자/특주문자 중 3개를 포함해야합니다.',
        type: 'warning' // success / info / warning / error
      })
      return
    } else {
      confirm({
        title: $language('확인'), //'확인',
        message: '변경하시겠습니까?',
        type: 'info', // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          $http({
            url: saveUrl.value,
            method: 'POST',
            data: {
              loginId: userInfo.value.loginId,
              oripassword: encrypt(userInfo.value.oripassword),
              password: encrypt(userInfo.value.password),
              passwordConf: encrypt(userInfo.value.passwordConf),
              chgUserId: userInfo.value.chgUserId
            }
          }).then((_result: any) => {
            if (_result.data === 'W') {
              alert({
                title: '안내',
                message: $language('기존 비밀번호가 틀립니다.'), //'기존 비밀번호가 틀립니다.',
                type: 'warning' // success / info / warning / error
              })
            } else {
              requestSuccess()
              emits('closePopup', 'change')
            }
          })
        },
        // 취소 callback 함수
        cancelCallback: () => {}
      })
    }
  }
}
function nextChangePw() {
  confirm({
    title: $language('확인'), //'확인',
    message: '다음에 변경하시겠습니까?',
    type: 'info', // success / info / warning / error
    // 확인 callback 함수
    confirmCallback: () => {
      $http({
        url: nextChangeUrl.value,
        method: 'PUT',
        data: {
          loginId: userInfo.value.loginId,
          chgUserId: userInfo.value.chgUserId
        }
      }).then((_result: any) => {
        requestSuccess()
        emits('closePopup', 'change')
      })
    },
    // 취소 callback 함수
    cancelCallback: () => {}
  })
}
/******************************
 * @Provide_선언
 *  ! types 폴더에 type 명시
 *******************************/
</script>
