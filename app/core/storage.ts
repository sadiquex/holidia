// import { MMKV } from 'react-native-mmkv';
// import { StateStorage } from 'zustand/middleware';

// export const storage = new MMKV();

// export function getItem<T>(key: string): T {
//   const item = storage.getString(key);

//   if (item) {
//     return JSON.parse(item) as T;
//   }
//   return undefined as unknown as T;
// }

// export function setItem<T>(key: string, value: T): void {
//   storage.set(key, JSON.stringify(value));
// }

// export function removeItem(key: string): void {
//   storage.delete(key);
// }

// export const zustandStorage: StateStorage = {
//   getItem,
//   setItem,
//   removeItem,
// };

// !!!!!!! - Switched because MMKV doesn't work on expo go (because it's a native module)
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

import { StateStorage } from 'zustand/middleware';

// export const zustandStorage: StateStorage = {
//   getItem: async (key) => {
//     const value = await AsyncStorage.getItem(key);
//     return value ?? null;
//   },
//   setItem: async (key, value) => {
//     await AsyncStorage.setItem(key, value);
//   },
//   removeItem: async (key) => {
//     await AsyncStorage.removeItem(key);
//   },
// };

// !!!!!= without storage (because i had too much issues with it)
export const zustandStorage: StateStorage = {
  getItem: async (_key) => {
    return null;
  },
  setItem: async (_key, _value) => {
    // no-op
  },
  removeItem: async (_key) => {
    // no-op
  },
};
