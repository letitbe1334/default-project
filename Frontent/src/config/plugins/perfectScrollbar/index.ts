import { type App } from 'vue'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'

export function loadPerfectScollbar(app: App) {
  /** vue3 perfect scollbar */
  app.use(PerfectScrollbarPlugin, {
    componentName: 'PerfectScrollbar'
  })
}
