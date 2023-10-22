// 用户权限
import { defineStore } from "pinia"
import { AuthState } from "./model/authModel"
import { AuthInfo } from "../../api/login/types"
import { MenuEmits } from "element-plus"

export const useAuthStore = defineStore({
  // id: 必须的, 在所有的Store中唯一
  id: 'app-auth',
  state: (): AuthState => ({
    // 当前页面的router name, 用来做按钮权限筛选
    routeName: '',
    // 后端返回的用户角色列表
    roles: [],
    // 后端返回的按钮权限列表
    authButtonList: [],
    // 后算返回的路由列表
    authRouterList: [],
    // 处理之后侧边栏菜单列表
    authMenuList: []
  }),

  actions: {
    // setRouteName
    setRouteName(name: string) {
      this.routeName = name
    },
    resetAuth() {
      this.authRouterList = []
    },
    // 设置用户权限信息
    setAuth(authInfo: AuthInfo) {
      this.roles = authInfo.roles
      this.authButtonList = authInfo.buttons
      this.authRouterList = authInfo.routes
    },
    setAuthMenuList(list: Menu.MenuOptions[]) {
      this.authMenuList = list
    }
  }
})