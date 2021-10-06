import { AxiosInstance } from 'axios';
import { mainAxios } from 'libs/axios';

class AniRepository {
  constructor(private readonly instance: AxiosInstance) {}

  getInfo(id: string) {
    return this.instance.get(`/anime/${id}`);
  }

  getCharacterInfo(id: string) {
    return this.instance.get(`/anime/${id}/charas`);
  }

  setScore(id: string, score: number) {
    return this.instance.post(`/anime/${id}/score`, {
      score: score * 2,
    });
  }

  removeScore(id: string) {
    return this.instance.delete(`/anime/${id}/score`);
  }

  like(id: string) {
    return this.instance.post(`/anime/${id}/favorite`);
  }

  cancelLike(id: string) {
    return this.instance.delete(`/anime/${id}/favorite`);
  }

  getPromotion() {
    return this.instance.get('/anime/promotion');
  }
}

export default new AniRepository(mainAxios);
