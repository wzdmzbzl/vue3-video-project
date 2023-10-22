/**
 * @description 路由参数配置简介
 * path ==> 菜单路径
 * name ==> 菜单别名
 * redirect ==> 重定向地址
 * component ==> 视图文件路径
 * meta ==> 菜单信息
 * meta.icon ==> 菜单图标
 * meta.title ==> 菜单标题
 * meta.activeMenu ==> 当前路由为详情页时, 需要高亮的菜单
 * meta.isLink ==> 是否外链
 * meta.isHide ==> 是否隐藏
 * meta.isFull ==> 是否全屏
 * meta.isAffix ==> 是否固定在tabs nav
 * meta.isKeepAlive ==> 是否缓存
 */

import { RouteRecordRaw } from "vue-router";
import { HOME_URL, LOGIN_URL } from "@/config/config";

const Layout = () => import("@/layout/index.vue");

export const staticRouter: RouteRecordRaw[] = [
  {
    path: LOGIN_URL,
    name: "login",
    meta: {
      isHide: true,
    },
    component: () => import("@/pages/login/index.vue"),
  },
  {
    path: "/404",
    name: "404",
    meta: {
      isHide: true,
    },
    component: () => import("@/pages/error/error-404.vue"),
  },
  {
    path: "/",
    name: "LAYOUT",
    component: Layout,
    redirect: HOME_URL,
    meta: {
      title: "工作台",
      icon: "DataBoard",
    },
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("@/pages/home/index.vue"),
        meta: {
          title: "首页",
          icon: "HomeFilled",
          affix: true,
        },
      },
      {
        path: "/index/statics",
        name: "Statics",
        component: () => import("@/pages/home/statics/index.vue"),
        meta: {
          title: "统计",
          icon: "DataAnalysis",
          affix: true,
        },
      },
    ],
  },
  // 此路由防止控制台出现No match found for location with path的警告
  {
    path: "/:catchAll(.*)",
    meta: {
      isHide: true,
    },
    component: () => import("@/pages/error/error-404.vue"), //这个是我自己的路径
  },
];

/**
 * @description 路由未找到
 */
export const notFoundRouter = {
  path: "/:pathMatch(.*)*",
  name: "notFound",
  redirect: "404",
};
