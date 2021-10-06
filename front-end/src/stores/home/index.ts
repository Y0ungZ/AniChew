import { createContext } from 'react';
import HomeStore from './store/home-store';

export const home = new HomeStore();
export const HomeContext = createContext(home);
export const HomeProvider = HomeContext.Provider;
