import { makeAutoObservable, runInAction } from 'mobx';
import { Ani } from '../model/ani';
import aniRepository from '../repository/ani-repository';

type Error = {
  code: number;
};

type State = 'Pending' | 'Done';

export default class AniStore {
  aniInfo: Ani | null = null;

  error?: Error;

  aniInfoState: State = 'Done';

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
        reviews,
        relatedAnimes,
        series,
        favorite,
      } = res.data;

      const scoreList = scores.map((score: number, i: number) => ({
        type: `${i}점`,
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
          scoreList,
          episodes,
          new Date(airedStart),
          new Date(airedEnd),
          duration,
          status,
          rate,
          genres,
          reviews,
          relatedAnimes,
          series,
          favorite,
        );
      });
    } catch (error) {
      runInAction(() => {
        this.aniInfo = null;
      });
    }
    this.aniInfoState = 'Done';
  }
}
