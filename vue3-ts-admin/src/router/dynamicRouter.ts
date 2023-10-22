import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export const dynamicRouter: RouteRecordRaw[] = [
  // 基础数据模块
  {
    path: "/user",
    component: Layout,
    redirect: "/user/normal/list",
    name: "UserManage",
    meta: {
      title: "用户管理",
      icon: "Menu",
    },
    children: [
      {
        path: "/user/normal/list",
        name: "UserNormal",
        component: () => import("@/pages/user/normal/index.vue"),
        meta: {
          title: "普通用户管理",
          icon: "Grid",
        },
      },
      {
        path: "/user/normal/show/:id",
        component: () => import("@/pages/user/normal/show.vue"),
        meta: {
          title: "普通用户管理详情",
          isHide: true,
          noAuth: true,
          icon: "Grid",
        },
      },
      {
        path: "/user/creator/list",
        name: "UserCreator",
        component: () => import("@/pages/user/creator/index.vue"),
        meta: { title: "创作者管理", icon: "Grid" },
      },
      {
        path: "/user/creator/show/:id",
        component: () => import("@/pages/user/creator/show.vue"),
        meta: {
          title: "创作者详情",
          isHide: true,
          noAuth: true,
          icon: "Grid",
        },
      },
      {
        path: "/user/anchor/list",
        name: "UserAnchor",
        component: () => import("@/pages/user/anchor/index.vue"),
        meta: { title: "主播管理", icon: "Grid" },
      },
      {
        path: "/user/anchor/show/:id",
        component: () => import("@/pages/user/anchor/show.vue"),
        meta: {
          title: "主播详情",
          isHide: true,
          noAuth: true,
          icon: "Grid",
        },
      },
      {
        path: "/user/admin/list",
        name: "UserManager",
        component: () => import("@/pages/user/admin/index.vue"),
        meta: { title: "房管管理", icon: "Grid" },
      },
      {
        path: "/user/actor/list",
        name: "UserActor",
        component: () => import("@/pages/user/actor/index.vue"),
        meta: { title: "演员管理", icon: "Grid" },
      },
    ],
  },
];
