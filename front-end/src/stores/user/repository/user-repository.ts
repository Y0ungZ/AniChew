import { mainAxios } from '../../../libs/axios';
import User from '../model/user';

class UserRepository {
  constructor(private readonly url: string) {}

  me() {
    return mainAxios.get(`${this.url}/user/me`);
  }

  update(user: User) {
    return mainAxios.put(`${this.url}/user`, user);
  }
}

export default new UserRepository(process.env.REACT_APP_API_DOMAIN_URL!);
