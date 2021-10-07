import { makeAutoObservable, runInAction } from 'mobx';
import {
  FAIL_LOGIN,
  FAIL_LOGOUT,
} from 'common/string-template/string-template';
import authRepository from '../repository/auth-repository';

interface AuthStore {
  isLoggedIn: boolean;
  login: (code: string) => Promise<void>;
  logout: () => Promise<void>;
}

export default class AuthStoreImpl implements AuthStore {
  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this);
  }

  async login(code: string) {
    try {
      const res = await authRepository.login(code);
      await authRepository.refresh();
      localStorage.setItem('user', 'user');
      runInAction(() => {
        this.isLoggedIn = true;
      });
      return res.data.newUser;
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_LOGIN);
    }
  }

  async logout() {
    try {
      await authRepository.logout();
      await authRepository.clearToken();
      localStorage.removeItem('user');
      runInAction(() => {
        this.isLoggedIn = false;
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_LOGOUT);
    }
  }
}
