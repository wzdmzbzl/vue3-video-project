import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import test from "./plugin/test";
import { createPinia } from "./pinia";

const pinia = createPinia();

console.log(pinia);
/**
 * pinia
 * 拍平整个store体系,区别于vuex的树结构
 *
 * state
 * getters
 * actions
 *
 * vuex   flux思想 => redux
 * view => dispatch => action => commit => mutation => state => view
 *
 * pinia没有遵守flux思想, 相对简单多了
 *
 * {
 *  state: {}
 *  store: {}
 * }
 */

const testObj = test();

createApp(App)
  .use(testObj, {
    stopDelay: 3000,
  })
  .use(pinia)
  .mount("#app");
