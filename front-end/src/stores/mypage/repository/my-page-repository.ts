import { AxiosInstance } from 'axios';
import { mainAxios } from '../../../libs/axios';

class UserRepository {
  constructor(private readonly instance: AxiosInstance) {}

  getUser(id: string) {
    return this.instance.get(`/user/${id}`);
  }
}

export default new UserRepository(mainAxios);
