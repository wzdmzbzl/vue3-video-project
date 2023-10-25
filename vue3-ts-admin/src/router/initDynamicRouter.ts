import { RouteRecordRaw } from "vue-router";
import router from "./index";
import NProgress from "@/config/nprogress";
import { ElNotification } from "element-plus";
import { LOGIN_URL, ROUTER_WHITE_LIST } from "@/config/config";
import { useAuthStore } from "@/store/modules/auth";
// import { useUserStore } from '@/store/modules/user'
import { dynamicRoutes } from "./dynamicRoutes";
import { notFoundRouter, staticRoutes } from "./staticRouter";
import { RESEETSTORE } from "@/utils/reset";

// 路由拦截
router.beforeEach(async (to, from, next) => {
  NProgress.start();

  // const userStore = useUserStore()
  // 判断是否访问登录页, 有Token就在当前页面, 没有token 重置路由并放行到登录页
  // if(to.path === LOGIN_URL) {
  //   if(userStore.token) return next(from.fullPath)
  //   return next()
  // }
});

router.afterEach(() => {
  NProgress.done();
});
