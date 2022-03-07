import { LowSync, LocalStorage } from "lowdb";
import { randomPeerId } from "./tauri";

const STORAGE_NAME = "tape-desktop";

export interface Data {
  peerId: string;
  accessToken?: string;
}

const storage = new LocalStorage<Data>(STORAGE_NAME);

export const db = new LowSync<Data>(storage);

export default db;

db.read();

if (!db.data?.peerId) {
  randomPeerId().then((peerId) => {
    db.data = { peerId };
    db.write();
  });
}
