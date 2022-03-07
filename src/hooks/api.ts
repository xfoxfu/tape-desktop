import { requestGet, requestPost } from "../tauri";
import db from "../storage";

const API_BASE = "http://apiv4.tapechat.net/";

export interface ApiResult<T = unknown> {
  code: number;
  message: string;
  content: T;
}

export const useApiGet = async <T = unknown>(
  url: string,
  params: Record<string, string | number>
): Promise<T> => {
  return await requestGet<T>(
    new URL(url, new URL(API_BASE)).toString(),
    params,
    db.data?.peerId ?? ""
  );
};

export const apiPost = async <T = unknown>(
  url: string,
  params: Record<string, string | number>
): Promise<T> => {
  return await requestPost<T>(
    new URL(url, new URL(API_BASE)).toString(),
    params,
    db.data?.peerId ?? ""
  );
};
