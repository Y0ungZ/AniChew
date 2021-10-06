import { createContext } from 'react';
import SearchStore from './store/search-store';

export const search = new SearchStore();
export const SearchContext = createContext(search);
export const SearchProvider = SearchContext.Provider;
