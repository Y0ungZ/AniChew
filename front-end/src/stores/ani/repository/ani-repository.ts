import { mainAxios } from '../../../libs/axios';

class AniRepository {
  constructor(private readonly url: string) {}

  getAniDetailInfo(animeId: string) {
    return mainAxios.get(`${this.url}/anime/${animeId}`);
  }

  setAniScore(animeId: string, score: number) {
    return mainAxios.post(
      `${process.env.REACT_APP_API_DOMAIN_URL}/anime/${animeId}/score`,
      { score: score * 2 },
    );
  }

  deleteAniScore(animeId: string) {
    return mainAxios.delete(
      `${process.env.REACT_APP_API_DOMAIN_URL}/anime/${animeId}/score`,
    );
  }

  setFavoriteAni(animeId: string) {
    return mainAxios.post(`${this.url}/anime/${animeId}/favorite`);
  }

  deleteFavoriteAni(animeId: string) {
    return mainAxios.delete(`${this.url}/anime/${animeId}/favorite`);
  }
}

export default new AniRepository(process.env.REACT_APP_API_DOMAIN_URL!);
