import ky, { Options } from "ky";
import { randomNonce, signParams } from "../tauri";
import db from "../storage";

const API_BASE = "http://apiv4.tapechat.net/";

const client = ky.create({
  prefixUrl: API_BASE,
  headers: {
    version: "1.7.1",
    os: "1",
    Accept: "*/*",
    "Accept-Language": "zh-Hans-CN;1",
    "Accept-Encoding": "gzip, deflate",
    "User-Agent": "Tape/1.7.1 (iPhone; iOS 15.2; Scale/3.00)",
  },
});

export interface ApiResult<T = unknown> {
  code: number;
  message: string;
  content: T;
}

export const useApiGet = async <T = unknown>(
  url: string,
  params: Record<string, string | number>,
  deps?: unknown[]
) => {
  const timestamp = (Math.ceil(Date.now() / 1000) * 1000).toString();
  params["app_id"] = "5749260381";
  params["nonce"] = await randomNonce();
  params["timestamp"] = timestamp;

  const sign = await signParams(
    Object.entries(params).map(([k, v]) => [k, v.toString()])
  );

  const opts: Options = {
    headers: {
      time: timestamp,
      sign,
      peerID: db.data?.peerId,
    },
  };
  const res = await client.get(url, opts);
  const body = (await res.json()) as ApiResult<T>;

  if (body.code !== 200) {
    throw new Error(body.message);
  }
  return body.content;
};
