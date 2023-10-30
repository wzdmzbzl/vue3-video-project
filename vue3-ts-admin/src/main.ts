import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "@/store/index";
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import registerGlobComp from '@/components'
// import "@/router/initDynamicRouter"
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);

// element默认主题
import 'element-plus/dist/index.css'
// 公共样式，包含自定义暗黑模式，element重置样式
import '@/styles/index.scss'
// 字体样式
import '@/assets/fonts/font.scss'

/** 加载异步路由 */
import '@/router/initDynamicRouter'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(registerGlobComp)

app.use(router);
app.use(pinia);
app.mount("#app");
