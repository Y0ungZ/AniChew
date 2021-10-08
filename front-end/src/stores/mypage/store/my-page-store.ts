import { makeAutoObservable, runInAction } from 'mobx';
import { FAIL_GET_USER_INFO } from 'common/string-template/string-template';
import MyPageType from '../model/mypage';
import userRepository from '../repository/my-page-repository';

export default class MyPageStore {
  user: MyPageType | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  async getUser(id: string) {
    try {
      const res = await userRepository.getUser(id);
      const {
        userid,
        nickname,
        email,
        avatar,
        cover,
        mine,
        favoriteAnimes,
        favoriteCharas,
        FavoriteSeiyus,
      } = res.data;

      runInAction(() => {
        this.user = new MyPageType(
          userid,
          nickname,
          email,
          avatar,
          cover,
          mine,
          favoriteAnimes,
          favoriteCharas,
          FavoriteSeiyus,
        );
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_GET_USER_INFO);
    }
  }
}
