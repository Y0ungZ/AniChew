import { AxiosInstance } from 'axios';
import { mainAxios } from 'config/axios';

class SearchRepository {
  constructor(private readonly instance: AxiosInstance) {}

  searchAnime(keyword: string) {
    return this.instance.get(`/search/anime/${keyword}`);
  }

  searchChara(keyword: string) {
    return this.instance.get(`/search/chara/${keyword}`);
  }

  searchUser(keyword: string) {
    return this.instance.get(`/search/user/${keyword}`);
  }
}

export default new SearchRepository(mainAxios);
