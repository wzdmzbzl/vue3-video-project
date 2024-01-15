import Test from "../components/Test.vue"

// 自定义插件全局注册组件
export default function test() {
  return {
    install(app, options) {
      app.provide('stopDelay', 5000) // inject('stopDelay')

      app.component('Test', {
        ...Test,
        props: {
          stopDelay: {
            type: Number,
            default: options.stopDelay
          }
        }
      })
    },
  };
}
