import { RouteLocationNormalizedLoadedGeneric } from 'vue-router'

import { routeView } from '@/types/routerView'

export const useTagViewsStore = defineStore('tagViews', () => {
  const visitedViews = ref<Array<routeView>>([])
  const cachedViews = ref<Array<string>>([])

  function addView(view: RouteLocationNormalizedLoadedGeneric) {
    /** ADD_VISITED_VIEW */
    if (visitedViews.value.some((v) => v.path === view.path)) return
    if (view.meta.title) {
      visitedViews.value.unshift(
        Object.assign({}, view, {
          title: view.meta.title
        })
      )
    }
    /** ADD_CACHED_VIEW */
    if (cachedViews.value.includes(String(view.name))) return
    if (!view.meta.noCache) {
      cachedViews.value.unshift(String(view.name))
    }
  }

  function delView(view: RouteLocationNormalizedLoadedGeneric) {
    return new Promise((resolve) => {
      delVisitedView(view)
      delCachedView(view)
      resolve([...visitedViews.value])
    })
  }

  function delVisitedView(view: RouteLocationNormalizedLoadedGeneric) {
    return new Promise((resolve) => {
      for (const [i, v] of visitedViews.value.entries()) {
        if (v.path === view.path) {
          visitedViews.value.splice(i, 1)
          break
        }
      }
      resolve([...visitedViews.value])
    })
  }

  function delCachedView(view: RouteLocationNormalizedLoadedGeneric) {
    return new Promise((resolve) => {
      for (const i of cachedViews.value) {
        if (i === view.name) {
          const index = cachedViews.value.indexOf(i)
          cachedViews.value.splice(index, 1)
          break
        }
      }
      resolve([...cachedViews.value])
    })
  }

  function delOthersViews(view: RouteLocationNormalizedLoadedGeneric) {
    return new Promise((resolve) => {
      delOthersVisitedViews(view)
      delOthersCachedViews(view)
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }

  function delOthersVisitedViews(view: RouteLocationNormalizedLoadedGeneric) {
    return new Promise((resolve) => {
      for (const [i, v] of visitedViews.value.entries()) {
        if (v.path === view.path) {
          visitedViews.value = visitedViews.value.slice(i, i + 1)
          break
        }
      }
      resolve([...visitedViews.value])
    })
  }

  function delOthersCachedViews(view: RouteLocationNormalizedLoadedGeneric) {
    return new Promise((resolve) => {
      for (const i of cachedViews.value) {
        if (i === view.name) {
          const index = cachedViews.value.indexOf(i)
          cachedViews.value = cachedViews.value.slice(index, index + 1)
          break
        }
      }
      resolve([...cachedViews.value])
    })
  }

  function delAllViews() {
    return new Promise((resolve) => {
      delAllVisitedViews()
      delAllCachedViews()
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }

  function delAllVisitedViews() {
    return new Promise((resolve) => {
      visitedViews.value = []
      resolve([...visitedViews.value])
    })
  }

  function delAllCachedViews() {
    return new Promise((resolve) => {
      cachedViews.value = []
      resolve([...cachedViews.value])
    })
  }

  function updateVisitedView(view: RouteLocationNormalizedLoadedGeneric) {
    for (let v of visitedViews.value) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }

  return {
    /** state */
    visitedViews,
    cachedViews,
    /** actions */
    addView,
    delView,
    delOthersViews,
    delAllViews,
    updateVisitedView
  }
})
