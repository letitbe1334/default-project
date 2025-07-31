import { type App } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

export function loadApexCharts(app: App) {
  app.use(VueApexCharts)
  app.component('apexcharts', VueApexCharts)
}
