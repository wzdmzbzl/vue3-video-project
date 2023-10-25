import type { UserInfo } from '@/api/login/types'
import { Nullable } from 'element-plus/es/components/cascader-panel/src/node'
export interface LoginParams {
  username: string
  password: string
}

export interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
}
