import { mainAxios } from '../../../libs/axios';

class AniRepository {
  constructor(private readonly url: string) {}

  getAniDetailInfo(animeId: string) {
    return mainAxios.get(`${this.url}/anime/${animeId}`);
  }
}

export default new AniRepository(process.env.REACT_APP_API_DOMAIN_URL!);
