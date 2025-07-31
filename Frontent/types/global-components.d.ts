import SvgIcon from '@/components/SvgIcon/index.vue'

/** app.component에 의해 전역적으로 등록된 구성 요소는
 * Volar 플러그인에서 제공하는 유형 힌트를 얻기위해 TS 유형을 선언. */
declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: typeof SvgIcon
  }
}

export {}
