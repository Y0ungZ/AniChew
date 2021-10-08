import { AxiosInstance } from 'axios';
import { mainAxios } from 'config/axios';

class AuthRepository {
  constructor(private readonly instance: AxiosInstance) {}

  login(code: string) {
    return this.instance.get(`/oauth/login?code=${code}`);
  }

  refresh() {
    return this.instance.get('/oauth/token');
  }

  logout() {
    return this.instance.get('/oauth/logout');
  }

  clearToken() {
    return this.instance.delete('/oauth/token');
  }
}

export default new AuthRepository(mainAxios);
