import { mainAxios } from 'libs/axios';

class AuthRepository {
  constructor(private readonly url: string) {}

  login(code: string) {
    return mainAxios.get(`${this.url}/oauth/login?code=${code}`);
  }

  logout() {
    return mainAxios.get(`${this.url}/oauth/logout`);
  }
}

export default new AuthRepository(process.env.REACT_APP_API_DOMAIN_URL!);
