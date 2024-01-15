import { formatArgs, isComputed, isFunction } from "./utils"
import { reactive, effectScope, isReactive, isRef, inject } from "vue"
import { piniaSymbol } from "./global"

/**
 * 
 * @param  {...any} args => 1/2
 * 
 * 1 => options
 * 2 => id options
 *   => id setup
 */
export default function defineStore(...args) {
  const { id, setup, options } = formatArgs(args)

  const isSetup = isFunction(setup)

  function useStore() {
    const pinia = inject(piniaSymbol)

    if(!pinia.store.has(id)) {
      if(isSetup) {
        createSetupStore(pinia, id, setup)
      }else {
        createOptions()
      }
    }

    return pinia.store.get(id)
  }

  return useStore
}


function createSetupStore(pinia, id, setup) {
  const setupStore = setup()
  const store = reactive({})
  let storeScope;

  const result = pinia.scope.run(() => {
    storeScope = effectScope()
    return storeScope.run(() => complieSetup(pinia, id , setupStore))
  })

  pinia.store.set(id, store)
  Object.assign(store, result)

  return store
}

function complieSetup(pinia, id, setupStore) {
  !pinia.state.value[id] && (pinia.state.value[id] = {})

  for(let key in setupStore) {
    const el = setupStore[key]

    if((isRef(el) && !isComputed(el)) || isReactive(el)) {
      pinia.state.value[id][key] = el
    }
  }

  return {
    ...setupStore
  }
}

function createOptions() {

}