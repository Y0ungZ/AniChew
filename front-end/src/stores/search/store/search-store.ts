import { makeAutoObservable, runInAction } from 'mobx';
import {
  FAIL_SEARCH_USER,
  FAIL_SEARCH_CHARA,
  FAIL_SEARCH_ANI,
} from 'common/string-template/string-template';
import { ResultUser, ResultChara, ResultAni } from '../model/search';
import searchRepository from '../repository/search-repository';

interface SearchStore {
  searchOpen: boolean;
  searchAniResult: ResultAni[] | undefined;
  searchCharaResult: ResultChara[] | undefined;
  searchUserResult: ResultUser[] | undefined;
  getSearchAnimeResult: (keyword: string) => Promise<void>;
  getSearchCharaResult: (keyword: string) => Promise<void>;
  getSearchUserResult: (keyword: string) => Promise<void>;
}

export default class SearchStoreImpl implements SearchStore {
  searchOpen = false;

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
