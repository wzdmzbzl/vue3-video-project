import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import staticRouter from "./staticRouter"

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRouter as RouteRecordRaw[],
  // 刷新时,滚动条位置还原
  scrollBehavior :() => ({left: 0, top: 0})
})

export default router