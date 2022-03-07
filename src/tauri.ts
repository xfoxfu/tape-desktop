import { invoke } from "@tauri-apps/api";

const wrapPromise = <T>(p: Promise<T>): Promise<T> => {
  return p.catch((e) => {
    if (e instanceof Error) {
      throw e;
    } else if (typeof e === "string") {
      throw new Error(e);
    } else {
      throw new Error(JSON.stringify(e));
    }
  });
};

export const openLiveWindow = (): Promise<void> => {
  return wrapPromise(invoke("open_live_window", {}));
};
export const closeLiveWindow = (): Promise<void> => {
  return wrapPromise(invoke("close_live_window", {}));
};
export const hasLiveWindow = (): Promise<boolean> => {
  return wrapPromise(invoke("has_live_window", {}));
};
export const md5 = (str: string): Promise<string> => {
  return wrapPromise(invoke("md5", { str }));
};
export const signParams = (args: [string, string][]): Promise<string> => {
  return wrapPromise(invoke("sign", { args }));
};
export const randomPeerId = (): Promise<string> => {
  return wrapPromise(invoke("random_peer_id", {}));
};
export const randomNonce = (): Promise<string> => {
  return wrapPromise(invoke("random_nonce", {}));
};
export const requestGet = <T = any>(
  url: string,
  params: Record<string, string | number>,
  peerId: string,
  token?: string
): Promise<T> => {
  return wrapPromise(invoke("request_get", { url, params, peerId, token }));
};
export const requestPost = <T = any>(
  url: string,
  params: Record<string, string | number>,
  peerId: string,
  token?: string
): Promise<T> => {
  return wrapPromise(invoke("request_post", { url, params, peerId, token }));
};
