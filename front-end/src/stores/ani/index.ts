import { createContext } from 'react';
import AniStore from './store/ani-store';

export const ani = new AniStore();
export const AniContext = createContext(ani);
export const AniProvider = AniContext.Provider;
