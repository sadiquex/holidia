import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from '../storage';
import { ICartItem } from '../types';

interface ShoppingCartStoreInterface {
  item: ICartItem | null;
  addItem: (item: ICartItem) => void;
  removeItem: (id: string) => void;
  getTotalPrice: () => number;
  // clearCart: () => void;
  // getItem: (id: string) => ICartItem | null;
  // getItems: () => ICartItem[];
  //   getTotalItems: () => number;
  //   getTotalPriceById: (id: string) => number;
}

const useShoppingCartStore = create<ShoppingCartStoreInterface>()(
  persist(
    (set, get) => ({
      item: null,
      addItem: (newItem) => {
        set({
          item: newItem,
        });
      },
      removeItem: () => set({ item: null }),
      getItem: () => get().item,
      getTotalPrice: () => {
        const { item } = get();
        return item ? item.price_per_night * item.days : 0;
      },
    }),
    {
      name: 'holidia-store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useShoppingCartStore;
