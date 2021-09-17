import { createContext } from 'react';
import AuthStore from './store/auth-store';

export const auth = new AuthStore();
export const AuthContext = createContext(auth);
export const AuthProvider = AuthContext.Provider;
