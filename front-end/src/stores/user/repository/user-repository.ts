import { AxiosInstance } from 'axios';
import { mainAxios } from 'config/axios';
import User from '../model/user';

class UserRepository {
  constructor(private readonly instance: AxiosInstance) {}

  me() {
    return this.instance.get('/user/me');
  }

  update(user: User) {
    return this.instance.put('/user', user);
  }

  updateAvatar(newAvatar: FormData) {
    return this.instance.post('/user/avatar', newAvatar);
  }

  deleteAvater() {
    return this.instance.delete('/user/avatar');
  }

  updateCover(newCover: FormData) {
    return this.instance.post('/user/cover', newCover);
  }

  deleteCover() {
    return this.instance.delete('/user/cover');
  }

  coverModify(user: User) {
    return this.instance.put('/user/cover', user);
  }
}

export default new UserRepository(mainAxios);
