import { customRef } from "vue";

export function debounceRef(value: any, delay=1000) {
  let timer: any
  return customRef((track, trigger) => {
    return {
      get() {
        // 依赖收集 track()
        track()
        return value
      },
      set(val) {
        clearInterval(timer)
        timer = setTimeout(() => {
          value = val
          // 派发更新 trigger()
          trigger()
        }, delay)
      }
    }
  })
}