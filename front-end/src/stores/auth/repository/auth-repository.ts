import { mainAxios } from '../../../libs/axios';

class AuthRepository {
  constructor(private readonly url: string) {}

  login(authCode: string) {
    return mainAxios.get(`${this.url}/oauth/login?code=${authCode}`);
  }

  logout() {
    return mainAxios.get(`${this.url}/oauth/logout`);
  }
}

export default new AuthRepository(process.env.REACT_APP_API_DOMAIN_URL!);
