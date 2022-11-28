import { StateCreator } from 'zustand';
import { Store } from '..';

export interface CharactersSlice {}

export const createCharactersSlice: StateCreator<
  Store,
  [],
  [],
  CharactersSlice
> = set => ({});
