import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

export const storage = new MMKV();

export function getItem<T>(key: string): T {
  const item = storage.getString(key);

  if (item) {
    return JSON.parse(item) as T;
  }
  return undefined as unknown as T;
}

export function setItem<T>(key: string, value: T): void {
  storage.set(key, JSON.stringify(value));
}

export function removeItem(key: string): void {
  storage.delete(key);
}

export const zustandStorage: StateStorage = {
  getItem,
  setItem,
  removeItem,
};
