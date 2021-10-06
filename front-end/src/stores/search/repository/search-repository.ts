import { mainAxios } from '../../../libs/axios';

class SearchRepository {
  constructor(private readonly url: string) {}

  searchAnime(keyword: string) {
    return mainAxios.get(`/search/anime/${keyword}`);
  }

  searchChara(keyword: string) {
    return mainAxios.get(`/search/chara/${keyword}`);
  }

  searchUser(keyword: string) {
    return mainAxios.get(`/search/user/${keyword}`);
  }
}

export default new SearchRepository(process.env.REACT_APP_API_DOMAIN_URL!);
