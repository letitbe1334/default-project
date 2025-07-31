import { type App } from 'vue'
import panZoom from 'vue-panzoom'

export function loadPanzoom(app: App) {
  /** panzoom */
  app.use(panZoom)
}
