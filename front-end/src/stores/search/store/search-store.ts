import { makeAutoObservable, runInAction } from 'mobx';
import {
  FAIL_SEARCH_USER,
  FAIL_SEARCH_CHARA,
  FAIL_SEARCH_ANI,
} from '../../../common/string-template/string-template';
import { ResultUser, ResultChara, ResultAni } from '../model/search';

import searchRepository from '../repository/search-repository';

export default class SearchStore {
  searchAniResult: ResultAni[] | undefined = undefined;

  searchCharaResult: ResultChara[] | undefined = undefined;

  searchUserResult: ResultUser[] | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  async getSearchAnimeResult(keyword: string) {
    try {
      const res = await searchRepository.searchAnime(keyword);
      runInAction(() => {
        this.searchAniResult = res.data;
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_SEARCH_ANI);
    }
  }

  async getSearchCharaResult(keyword: string) {
    try {
      const res = await searchRepository.searchChara(keyword);
      runInAction(() => {
        this.searchCharaResult = res.data;
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_SEARCH_CHARA);
    }
  }

  async getSearchUserResult(keyword: string) {
    try {
      const res = await searchRepository.searchUser(keyword);
      runInAction(() => {
        this.searchUserResult = res.data;
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_SEARCH_USER);
    }
  }
}
