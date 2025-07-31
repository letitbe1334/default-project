import { type App } from 'vue'
import VueSignaturePad from 'vue-signature-pad'

export function loadSignaturePad(app: App) {
  /** signature pad */
  app.use(VueSignaturePad)
}
