import { makeAutoObservable } from 'mobx';
import MyPageType from '../model/mypage';
import userRepository from '../repository/my-page-repository';

export default class MyPageStore {
  user: MyPageType | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getUser(id: string) {
    const res = await userRepository.getUser(id);
    if (res.status === 200) {
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

      return this.user;
    }
    throw new Error('회원정보 조회 실패!');
  }
}
