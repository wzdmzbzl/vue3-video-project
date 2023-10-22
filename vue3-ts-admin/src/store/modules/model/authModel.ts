
// 用户权限
export interface AuthState {
  routeName: string
  roles: string[]
  authButtonList: string[]
  authMenuList: Menu.MenuOptions[]
  authRouterList: string[]
}