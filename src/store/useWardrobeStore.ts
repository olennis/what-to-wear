import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Clothing } from '../types';

interface WardrobeState {
  clothes: Clothing[];
  addClothing: (clothing: Clothing) => void;
  removeClothing: (id: string) => void;
  updateClothing: (id: string, clothing: Partial<Clothing>) => void;
  getByCategory: (category: Clothing['category']) => Clothing[];
}

export const useWardrobeStore = create<WardrobeState>()(
  persist(
    (set, get) => ({
      clothes: [],

      addClothing: (clothing) => {
        set((state) => ({
          clothes: [...state.clothes, clothing],
        }));
      },

      removeClothing: (id) => {
        set((state) => ({
          clothes: state.clothes.filter((c) => c.id !== id),
        }));
      },

      updateClothing: (id, updates) => {
        set((state) => ({
          clothes: state.clothes.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));
      },

      getByCategory: (category) => {
        return get().clothes.filter((c) => c.category === category);
      },
    }),
    {
      name: 'wardrobe-storage',
    }
  )
);
