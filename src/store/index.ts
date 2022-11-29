import create from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  createCharactersSlice,
  CharactersSlice,
} from './slices/charactersSlice';
export type Store = CharactersSlice;
export const useStore = create<Store>()(
  devtools((...a) => ({
    ...createCharactersSlice(...a),
  })),
);
