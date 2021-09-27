import { useContext } from 'react';
import { UserContext } from '../stores/user';
import { AuthContext } from '../stores/auth';

export const useAuth = () => useContext(AuthContext);
export const useUser = () => useContext(UserContext);
