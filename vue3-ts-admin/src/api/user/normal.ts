import http from "@/utils/http";
import { INormalListType, INormalListTypeAll } from "./types";
/**
 * @param pageSize page
 * @return list
 */

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
