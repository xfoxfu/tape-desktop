import { LowSync, LocalStorage } from "lowdb";
import { MarkerState } from "./components/marker";
import { randomPeerId } from "./tauri";

const STORAGE_NAME = "tape-desktop";

export interface Data {
  peerId: string;
  accessToken?: string;
  mark: Record<string, MarkerState>;
}

const storage = new LocalStorage<Data>(STORAGE_NAME);

export const db = new LowSync<Data>(storage);

export default db;

db.read();

if (!db.data?.peerId) {
  randomPeerId().then((peerId) => {
    db.data = { peerId, mark: {} };
    db.write();
  });
}
