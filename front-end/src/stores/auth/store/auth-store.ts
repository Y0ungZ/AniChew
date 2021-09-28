import { makeAutoObservable, runInAction } from 'mobx';
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
    } else {
      throw new Error('로그인 실패');
    }
  }

  async logout() {
    const res = await authRepository.logout();
    if (res.status === 200) {
      runInAction(() => {
        this.isLoggedIn = false;
      });
    } else {
      throw new Error('로그아웃 실패');
    }
  }
}
