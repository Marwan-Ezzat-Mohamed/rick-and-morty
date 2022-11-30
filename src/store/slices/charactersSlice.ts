import { StateCreator } from 'zustand';
import { Store } from '..';
import { Character } from '../../GraphQL/types';

export interface CharactersSlice {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  characters: Character[] | null;
  setCharacters: (characters: Character[], override?: boolean) => void;
}

export const createCharactersSlice: StateCreator<
  Store,
  [],
  [],
  CharactersSlice
> = (set, get) => ({
  searchQuery: '',
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  characters: null,
  setCharacters: (characters: Character[], override = false) => {
    if (override) {
      set({ characters });
    } else {
      const existingCharacters = get().characters || [];
      set({ characters: [...existingCharacters, ...characters] });
    }
  },
});
