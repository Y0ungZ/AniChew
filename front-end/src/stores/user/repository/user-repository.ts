import { mainAxios } from 'libs/axios';
import User from '../model/user';

class UserRepository {
  constructor(private readonly url: string) {}

  me() {
    return mainAxios.get(`${this.url}/user/me`);
  }

  update(user: User) {
    return mainAxios.put(`${this.url}/user`, user);
  }

  updateAvatar(newAvatar: FormData) {
    return mainAxios.post(`${this.url}/user/avatar`, newAvatar);
  }

  updateCover(newCover: FormData) {
    return mainAxios.post(`${this.url}/user/cover`, newCover);
  }

  coverModify(user: User) {
    return mainAxios.put(`${this.url}/user/cover`, user);
  }
}

export default new UserRepository(process.env.REACT_APP_API_DOMAIN_URL!);
