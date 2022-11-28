import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { createCharactersSlice } from './slices/charactersSlice';
export type Store = {};
export const useStore = create<Store>()(
  devtools((...a) => ({
    ...createCharactersSlice(...a),
  })),
);
