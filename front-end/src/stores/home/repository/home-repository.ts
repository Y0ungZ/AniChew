import { AxiosInstance } from 'axios';
import { mainAxios } from 'config/axios';

class HomeRepository {
  constructor(private readonly instance: AxiosInstance) {}

  getPromotion() {
    return this.instance.get('/anime/promotion');
  }

  getMasterPiece() {
    return this.instance.get('/recommend/masterpiece');
  }

  byLikeBtn() {
    return this.instance.get('/recommend/favorite');
  }

  byCF() {
    return this.instance.get('/recommend/user');
  }

  byNew() {
    return this.instance.get('/recommend/new');
  }

  byAnichew() {
    return this.instance.get('/recommend/anichew');
  }
}

export default new HomeRepository(mainAxios);
