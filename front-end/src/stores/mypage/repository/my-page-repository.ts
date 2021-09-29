import { mainAxios } from '../../../libs/axios';

class UserRepository {
  constructor(private readonly url: string) {}

  getUser(id: string) {
    return mainAxios.get(`${this.url}/user/${id}`);
  }
}

export default new UserRepository(process.env.REACT_APP_API_DOMAIN_URL!);
