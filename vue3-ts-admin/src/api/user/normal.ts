import http from "@/utils/http";
import { INormalListType, INormalListTypeAll } from "./types";
/**
 * @param pageSize page
 * @return list
 */
// 获取普通用户列表
export const reqNormalList = (page: number, pageSize: number, params: INormalListType = {}) => {
  const startTime =
    params.timeInterval &&
    params.timeInterval.length > 0 &&
    params.timeInterval[0];
  const endTime =
    params.timeInterval &&
    params.timeInterval.length > 0 &&
    params.timeInterval[1];
  return http.get<INormalListTypeAll>(
    `/admin/user/normal/list/${pageSize}/${page}`,
    {
      name: params.name,
      phone: params.phone,
      sex: params.sex,
      level: params.level,
      startTime,
      endTime,
    }
  );
};

// 添加用户
export const reqSaveUser = (data: any) => {
  return http.post<null>('/admin/user/normal/save', data)
}

/** 下载excel模版 */
export function downLoadExcelTemp() {
  return http.get<any>(
    `/admin/user/normal/downloadExcel`,
  )
}

// * 批量添加用户
export const ImportUserInfo = (params: FormData) => {
  return http.post<any>(`/admin/user/normal/import`, params)
}
