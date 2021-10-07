import { runInAction, makeAutoObservable } from 'mobx';
import {
  FAIL_GET_PROMOTION_ANIME,
  FAIL_GET_RECOMMENDATIONS,
} from 'common/string-template/string-template';
import { Ani, Series } from 'stores/ani/model/ani';
import { AxiosResponse } from 'axios';
import { RecommendationType } from '../model/home';
import homeRepository from '../repository/home-repository';

export interface HomeStore {
  promotionData: Ani[] | null;
  content: { [key: string]: Series[] };
  getPromotion: () => Promise<void>;
}

export default class HomeStoreImpl implements HomeStore {
  promotionData = null;

  content: { [key: string]: Series[] } = {
    CF: [],
    MasterPiece: [],
    Like: [],
    New: [],
    Anichew: [],
  };

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

  async getRecommendations(type: RecommendationType) {
    try {
      let res: AxiosResponse | null = null;
      if (type === 'MasterPiece') {
        res = await homeRepository.getMasterPiece();
        runInAction(() => {
          this.content.MasterPiece = res?.data;
        });
      } else if (type === 'CF') {
        res = await homeRepository.byCF();
        runInAction(() => {
          this.content.CF = res?.data;
        });
      } else if (type === 'Like') {
        res = await homeRepository.byLikeBtn();
        runInAction(() => {
          this.content.Like = res?.data;
        });
      } else if (type === 'New') {
        res = await homeRepository.byNew();
        runInAction(() => {
          this.content.New = res?.data;
        });
      } else if (type === 'Anichew') {
        res = await homeRepository.byAnichew();
        runInAction(() => {
          this.content.Anichew = res?.data;
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_GET_RECOMMENDATIONS);
    }
  }
}
