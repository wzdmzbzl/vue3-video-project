import { defineStore } from 'pinia'
import { getUserInfo, logout } from '@/api'
import type { UserState } from './model/userModel'
import type { UserInfo } from '@/api/login/types'
import { useAuthStore } from './auth'
import { RESEETSTORE } from '@/utils/reset'
export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    token: '',
    userInfo: null,
  }),
  actions: {
    // setToken
    setToken(token: string) {
      this.token = token
    },
    // setUserInfo
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    async GetInfoAction() {
      const { data } = await getUserInfo()
      const { avatar, buttons, name, roles, routes } = data
      const authStore = useAuthStore()
      // 存储用户信息
      this.setUserInfo({ avatar, name })
      // 存储用户权限信息
      authStore.setAuth({ buttons, roles, routes })
    },
    async Logout() {
      await logout()
      RESEETSTORE()
    },
  },
  // 设置为true，缓存state
  persist: true,
})