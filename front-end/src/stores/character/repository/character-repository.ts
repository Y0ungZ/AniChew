import { AxiosInstance } from 'axios';
import { mainAxios } from 'config/axios';

class CharacterRepository {
  constructor(private readonly instance: AxiosInstance) {}

  getInfo(id: string) {
    return this.instance.get(`/chara/${id}`);
  }

  likeCharacter(id: string) {
    return this.instance.post(`/chara/${id}/favorite`);
  }

  cancelLikeCharacter(id: string) {
    return this.instance.delete(`/chara/${id}/favorite`);
  }

  setScore(id: string, score: number) {
    return this.instance.post(`/anime/${id}/score`, {
      score: score * 2,
    });
  }

  removeScore(id: string) {
    return this.instance.delete(`/anime/${id}/score`);
  }
}

export default new CharacterRepository(mainAxios);
