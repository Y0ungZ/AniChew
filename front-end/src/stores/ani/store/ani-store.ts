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
    const res = await aniRepository.getAniDetailInfo(animeId);
    if (res.status === 200) {
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

      runInAction(() => {
        this.aniInfo = new Ani(
          id,
          name,
          koreanName,
          japaneseName,
          type,
          avgScore,
          scores,
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
    } else {
      runInAction(() => {
        this.aniInfo = null;
        this.error = { code: res.status };
      });
    }
    this.aniInfoState = 'Done';
  }
}
