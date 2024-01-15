import { effectScope, ref } from "vue"
import { piniaSymbol } from "./global"

export default function createPinia () {

  /**
   * state
   * store
   * scope
   */

  const store = new Map()
  const scope = effectScope(true)
  const state = scope.run(() => ref({}))

  return {
    store,
    scope,
    state,
    install
  }
}


function install(app) {
  app.provide(piniaSymbol, this)
}