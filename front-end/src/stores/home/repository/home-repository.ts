import { AxiosInstance } from 'axios';
import { mainAxios } from 'config/axios';

class HomeRepository {
  constructor(private readonly instance: AxiosInstance) {}

  getPromotion() {
    return this.instance.get('/anime/promotion');
  }
}

export default new HomeRepository(mainAxios);
