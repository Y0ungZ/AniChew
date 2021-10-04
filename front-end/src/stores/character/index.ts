import { createContext } from 'react';
import CharacterStore from './store/character-store';

export const character = new CharacterStore();
export const CharacterContext = createContext(character);
export const CharacterProvider = CharacterContext.Provider;
