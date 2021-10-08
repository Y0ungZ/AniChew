import { createContext } from 'react';
import UserStore from './store/user-store';

export const user = new UserStore();
export const UserContext = createContext(user);
export const UserProvider = UserContext.Provider;
