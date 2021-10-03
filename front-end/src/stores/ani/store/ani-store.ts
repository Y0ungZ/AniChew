import { makeAutoObservable, runInAction } from 'mobx';
import {
  FAIL_CANCEL_LIKE_ANI,
  FAIL_DELETE_ANI_SCORE,
  FAIL_GIVE_ANI_SCORE,
  FAIL_LIKE_ANI,
} from '../../../common/string-template/string-template';
import { Ani } from '../model/ani';
import aniRepository from '../repository/ani-repository';

type State = 'Pending' | 'Done';

export default class AniStore {
  aniInfo: Ani | null = null;

  error?: Error;

  aniInfoState: State = 'Done';

  favorite = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getAniDetailInfo(animeId: string) {
    this.aniInfoState = 'Pending';
    try {
      const res = await aniRepository.getAniDetailInfo(animeId);
      const {
        id,
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
        this.aniInfo = new Ani(
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
        this.aniInfo = null;
      });
    }
    this.aniInfoState = 'Done';
  }

  async setAniScore(animeId: string, score: number) {
    try {
      await aniRepository.setAniScore(animeId, score);
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_GIVE_ANI_SCORE);
    }
  }

  async deleteAniScore(animeId: string) {
    try {
      await aniRepository.deleteAniScore(animeId);
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_DELETE_ANI_SCORE);
    }
  }

  async setFavoriteAnime(animeId: string) {
    try {
      await aniRepository.setFavoriteAni(animeId);
      runInAction(() => {
        this.favorite = true;
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_LIKE_ANI);
    }
  }

  async deleteFavoriteAnime(animeId: string) {
    try {
      await aniRepository.deleteFavoriteAni(animeId);
      runInAction(() => {
        this.favorite = false;
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_CANCEL_LIKE_ANI);
    }
  }
}
