import { makeAutoObservable } from 'mobx';
import authRepository from '../repository/auth-repository';

type ResponseGenerator = {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
};

export default class AuthStore {
  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this);
  }

  *login(authCode: string) {
    const response: ResponseGenerator = yield authRepository.signin(authCode);
    console.log(response);
    if (response.status === 200) {
      this.isLoggedIn = true;
    }
  }
}
