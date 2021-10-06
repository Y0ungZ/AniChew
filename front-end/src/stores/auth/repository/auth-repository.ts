import { AxiosInstance } from 'axios';
import { mainAxios } from 'config/axios';

class AuthRepository {
  constructor(private readonly instance: AxiosInstance) {}

  login(code: string) {
    return this.instance.get(`/oauth/login?code=${code}`);
  }

  logout() {
    return this.instance.get('/oauth/logout');
  }
}

export default new AuthRepository(mainAxios);
