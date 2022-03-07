import { invoke } from "@tauri-apps/api";

export const openLiveWindow = (): Promise<void> => {
  return invoke("open_live_window", {});
};
export const closeLiveWindow = (): Promise<void> => {
  return invoke("close_live_window", {});
};
export const hasLiveWindow = (): Promise<boolean> => {
  return invoke("has_live_window", {});
};
export const md5 = (str: string): Promise<string> => {
  return invoke("md5", { str });
};
export const signParams = (args: [string, string][]): Promise<string> => {
  return invoke("sign", { args });
};
export const randomPeerId = (): Promise<string> => {
  return invoke("random_peer_id", {});
};
export const randomNonce = (): Promise<string> => {
  return invoke("random_nonce", {});
};
