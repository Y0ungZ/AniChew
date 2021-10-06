import { makeAutoObservable, runInAction } from 'mobx';
import {
  FAIL_LOGIN,
  FAIL_LOGOUT,
} from 'common/string-template/string-template';
import { mainAxios } from 'config/axios';
import authRepository from '../repository/auth-repository';

export default class AuthStore {
  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this);
  }

  async login(authCode: string) {
    const res = await authRepository.login(authCode);
    if (res.status === 200) {
      runInAction(() => {
        this.isLoggedIn = true;
      });
      mainAxios.defaults.headers.common.Authorization = res.data.token;
      localStorage.setItem('token', res.data.token);
    } else {
      throw new Error(FAIL_LOGIN);
    }
  }

  async logout() {
    const res = await authRepository.logout();
    if (res.status === 200) {
      runInAction(() => {
        this.isLoggedIn = false;
      });
    } else {
      throw new Error(FAIL_LOGOUT);
    }
  }
}
