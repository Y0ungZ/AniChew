import { makeAutoObservable, runInAction } from 'mobx';
import {
  FAIL_CANCEL_LIKE_ANI,
  FAIL_DELETE_ANI_SCORE,
  FAIL_GIVE_ANI_SCORE,
  FAIL_LIKE_ANI,
} from '../../../common/string-template/string-template';
import { Ani } from '../model/ani';
import aniRepository from '../repository/ani-repository';

export interface AniStore {
  info: Ani | null;
  favorite: boolean;
  getInfo: (id: string) => void;
  setScore: (id: string, score: number) => void;
  removeScore: (id: string) => void;
  like: (id: string) => void;
  cancelLike: (id: string) => void;
  ani: () => void;
}

export default class AniStoreImpl implements AniStore {
  info: Ani | null = null;

  favorite = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getInfo(id: string) {
    try {
      const res = await aniRepository.getInfo(id);
      const {
        name,
        koreanName,
        japaneseName,
        type,
        avgScore,
        scores,
        episodes,
        airedStart,
        airedEnd,
        duration,
        status,
        rate,
        genres,
        relatedAnimes,
        series,
        favorite,
        myScore,
      } = res.data;

      const scoreList = scores.map((score: number, i: number) => ({
        type: `${i + 1}점`,
        value: score,
      }));

      runInAction(() => {
        this.info = new Ani(
          id,
          name,
          koreanName,
          japaneseName,
          type,
          avgScore,
          myScore / 2,
          scoreList,
          episodes,
          new Date(airedStart),
          new Date(airedEnd),
          duration,
          status,
          rate,
          genres,
          relatedAnimes,
          series,
          favorite,
        );
        this.favorite = favorite;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.info = null;
      });
    }
  }

  async setScore(id: string, score: number) {
    try {
      await aniRepository.setScore(id, score);
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_GIVE_ANI_SCORE);
    }
  }

  async removeScore(id: string) {
    try {
      await aniRepository.removeScore(id);
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_DELETE_ANI_SCORE);
    }
  }

  async like(id: string) {
    try {
      await aniRepository.like(id);
      runInAction(() => {
        this.favorite = true;
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_LIKE_ANI);
    }
  }

  async cancelLike(id: string) {
    try {
      await aniRepository.cancelLike(id);
      runInAction(() => {
        this.favorite = false;
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_CANCEL_LIKE_ANI);
    }
  }

  // for runtime type check
  ani() {
    return 'ani';
  }
}
