import { mainAxios } from 'libs/axios';

class AniRepository {
  constructor(private readonly url: string) {}

  getInfo(id: string) {
    return mainAxios.get(`${this.url}/anime/${id}`);
  }

  getCharacterInfo(id: string) {
    return mainAxios.get(`${this.url}/anime/${id}/charas`);
  }

  setScore(id: string, score: number) {
    return mainAxios.post(`${this.url}/anime/${id}/score`, {
      score: score * 2,
    });
  }

  removeScore(id: string) {
    return mainAxios.delete(`${this.url}/anime/${id}/score`);
  }

  like(id: string) {
    return mainAxios.post(`${this.url}/anime/${id}/favorite`);
  }

  cancelLike(id: string) {
    return mainAxios.delete(`${this.url}/anime/${id}/favorite`);
  }

  getPromotion() {
    return mainAxios.get(`${this.url}/anime/promotion`);
  }
}

export default new AniRepository(process.env.REACT_APP_API_DOMAIN_URL!);
