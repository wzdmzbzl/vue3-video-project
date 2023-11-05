// 获取普通用户列表参数类型
export interface INormalListType {
  page?: number
  pageSize?: number
  name?: string
  phone?: string
  sex?: string
  level?: string
  timeInterval?: Array<any>
  startTime?: string
  endTime?: string
  account?: number // 账户余额
  onlineStatus?: number // 在线状态
  avatar?: string // 头像地址
  createTime?: string // 创建时间
  id?: number // 用户id
  status?: boolean // 状态
  authStatus?: number  // 主播认证
}


export type INormalListTypeAll = {
  list: INormalListType[]
  total: number
}
