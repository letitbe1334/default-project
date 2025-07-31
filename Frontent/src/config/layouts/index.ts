import { type App } from 'vue'

import Default from '@/layouts/defaultLayout.vue'
import Full from '@/layouts/fullLayout.vue'
import None from '@/layouts/noneLayout.vue'

export function loadLayouts(app: App) {
  /** top, left, contents가 있는 layout */
  app.component('default', Default)
  /** contents만 있는 layout */
  app.component('full', Full)
  /** 아무것도 존재하지 않는 layout */
  app.component('none', None)
}
