import { mainAxios } from '../../../libs/axios';

class CharacterRepository {
  constructor(private readonly url: string) {}

  getInfo(id: string) {
    return mainAxios.get(`${this.url}/chara/${id}`);
  }

  likeCharacter(id: string) {
    return mainAxios.post(`${this.url}/chara/${id}/favorite`);
  }

  cancelLikeCharacter(id: string) {
    return mainAxios.delete(`${this.url}/chara/${id}/favorite`);
  }

  setScore(id: string, score: number) {
    return mainAxios.post(`${this.url}/anime/${id}/score`, {
      score: score * 2,
    });
  }

  removeScore(id: string) {
    return mainAxios.delete(`${this.url}/anime/${id}/score`);
  }
}

export default new CharacterRepository(process.env.REACT_APP_API_DOMAIN_URL!);
