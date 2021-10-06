import { makeAutoObservable, runInAction } from 'mobx';
import {
  FAIL_PROFILE_AVATAR_UPDATE,
  FAIL_PROFILE_COVER_UPDATE,
  FAIL_GET_ME,
  FAIL_UPDATE_USER_INFO,
} from 'common/string-template/string-template';

import User from '../model/user';
import userRepository from '../repository/user-repository';

interface UserStore {
  user: User | null;
  me: () => Promise<void>;
  update: (user: User) => Promise<void>;
  updateAvatar: (newAvatar: FormData) => Promise<void>;
  updateCover: (newCover: FormData) => Promise<void>;
  coverModify: (user: User) => Promise<void>;
}

export default class UserStoreImpl implements UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async me() {
    try {
      const res = await userRepository.me();
      const { userId, nickname, email, avatar, cover, gender, birthday } =
        res.data;
      runInAction(() => {
        this.user = new User(
          userId,
          nickname,
          email,
          avatar,
          cover,
          gender,
          birthday,
        );
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_GET_ME);
    }
  }

  async update(user: User) {
    try {
      const res = await userRepository.update(user);
      const { userId, nickname, email, avatar, cover, gender, birthday } =
        res.data;
      runInAction(() => {
        this.user = new User(
          userId,
          nickname,
          email,
          avatar,
          cover,
          gender,
          birthday,
        );
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_UPDATE_USER_INFO);
    }
  }

  async updateAvatar(newAvatar: FormData) {
    try {
      const res = await userRepository.updateAvatar(newAvatar);
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_PROFILE_AVATAR_UPDATE);
    }
  }

  async updateCover(newCover: FormData) {
    try {
      const res = await userRepository.updateCover(newCover);
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_PROFILE_COVER_UPDATE);
    }
  }

  async coverModify(user: User) {
    try {
      const res = await userRepository.coverModify(user);
      const { userId, nickname, email, avatar, cover, gender, birthday } =
        res.data;
      runInAction(() => {
        this.user = new User(
          userId,
          nickname,
          email,
          avatar,
          cover,
          gender,
          birthday,
        );
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_PROFILE_COVER_UPDATE);
    }
  }
}
