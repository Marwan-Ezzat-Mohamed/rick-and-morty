import { StateCreator } from 'zustand';
import { Store } from '..';
import { Character } from '../../GraphQL/types';

export interface CharactersSlice {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  characters: Character[];
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
  characters: [],
  setCharacters: (characters: Character[], override = false) => {
    if (override) {
      set({ characters });
    }
    const prev = get().characters;
    set({ characters: [...prev, ...characters] });
  },
});
