import { mainAxios } from 'libs/axios';

class HomeRepository {
  constructor(private readonly url: string) {}

  getPromotion() {
    return mainAxios.get(`${this.url}/anime/promotion`);
  }
}

export default new HomeRepository(process.env.REACT_APP_API_DOMAIN_URL!);
