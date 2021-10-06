import { FAIL_GET_PROMOTION_ANIME } from 'common/string-template/string-template';
import { runInAction, makeAutoObservable } from 'mobx';
import { Ani } from 'stores/ani/model/ani';
import homeRepository from '../repository/home-repository';

export interface HomeStore {
  promotionData: Ani[] | null;
  getPromotion: () => Promise<void>;
}

export default class HomeStoreImpl implements HomeStore {
  promotionData: Ani[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getPromotion() {
    try {
      const res = await homeRepository.getPromotion();
      runInAction(() => {
        this.promotionData = res.data;
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_GET_PROMOTION_ANIME);
    }
  }
}
