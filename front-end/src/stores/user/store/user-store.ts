import { makeAutoObservable } from 'mobx';
import User from '../model/user';
import userRepository from '../repository/user-repository';

type Error = {
  code: number;
};

type State = 'Pending' | 'Done';

export default class UserStore {
  user: User | null = null;

  error?: Error;

  meState: State = 'Done';

  updateState: State = 'Done';

  constructor() {
    makeAutoObservable(this);
  }

  async me() {
    this.meState = 'Pending';
    const res = await userRepository.me();
    const { userId, nickname, email, avatar, gender, birthday } = res.data;
    this.user = new User(userId, nickname, email, avatar, gender, birthday);
    this.meState = 'Done';
  }

  async update(user: User) {
    this.updateState = 'Pending';
    const res = await userRepository.update(user);
    if (res.status === 200) {
      const { userId, nickname, email, avatar, gender, birthday } = res.data;
      this.user = new User(userId, nickname, email, avatar, gender, birthday);
    } else {
      this.error = { code: res.status };
    }
    this.updateState = 'Done';
  }
}
