import { makeAutoObservable, runInAction } from 'mobx';
import { Ani } from '../model/ani';
import { Review } from '../model/review';
import aniRepository from '../repository/ani-repository';

type Error = {
  code: number;
};

type State = 'Pending' | 'Done';

type ReviewFormMode = 'Write' | 'Read' | 'Update';

export default class AniStore {
  aniInfo: Ani | null = null;

  error?: Error;

  aniInfoState: State = 'Done';

  private _reviewFormMode: ReviewFormMode = 'Write';

  private _reviewFormDisplayState = false;

  private _myReview: Review | null = null;

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
        myScore,
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
          myScore,
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
        if (this.aniInfo.myScore > 0) this._reviewFormDisplayState = true;
      });
    } catch (error) {
      runInAction(() => {
        this.aniInfo = null;
      });
    }
    this.aniInfoState = 'Done';
  }

  async submitReview(animeId: string, content: string) {
    if (this._reviewFormMode === 'Write') {
      this.writeReview(animeId, content);
    } else if (this._reviewFormMode === 'Update') {
      this.updateReview(animeId, content, this._myReview!.id);
    }
  }

  async writeReview(animeId: string, content: string) {
    try {
      await aniRepository.writeReview(animeId, content);
      this.getMyReview(animeId);
    } catch (error) {
      throw new Error('You failed to write a review.');
    }
  }

  async updateReview(animeId: string, content: string, reviewId: string) {
    try {
      await aniRepository.updateReview(animeId, content, reviewId);
      this.getMyReview(animeId);
    } catch (error) {
      throw new Error('You failed to revise the review.');
    }
  }

  async deleteReview(animeId: string, id: string) {
    try {
      await aniRepository.deleteReview(animeId, id);
      runInAction(() => {
        this.reviewFormMode = 'Write';
        this.myReview = null;
      });
    } catch (error) {
      throw new Error('You failed to delete the review.');
    }
  }

  async getMyReview(animeId: string) {
    try {
      const res = await aniRepository.getMyReview(animeId);
      if (res.data === '') {
        runInAction(() => {
          this._myReview = null;
          this._reviewFormMode = 'Write';
        });
      } else {
        runInAction(() => {
          const {
            id,
            userId,
            content,
            createdDate,
            modifiedDate,
            mine,
            name,
            nickname,
          } = res.data;

          this._myReview = new Review(
            id,
            animeId,
            userId,
            content,
            createdDate,
            modifiedDate,
            mine,
            name,
            nickname,
          );
          this._reviewFormMode = 'Read';
          this._reviewFormDisplayState = true;
        });
      }
    } catch (error) {
      throw new Error('There is no my review');
    }
  }

  async setAniScore(animeId: string, score: number) {
    try {
      await aniRepository.setAniScore(animeId, score);
      runInAction(() => {
        this.reviewFormDisplayState = true;
      });
    } catch (error) {
      throw new Error('You failed to give a score.');
    }
  }

  async deleteAniScore(animeId: string) {
    try {
      await aniRepository.deleteAniScore(animeId);
    } catch (error) {
      throw new Error('You failed to delete a score.');
    }
  }

  get reviewFormMode() {
    return this._reviewFormMode;
  }

  set reviewFormMode(value: ReviewFormMode) {
    runInAction(() => {
      this._reviewFormMode = value;
    });
  }

  get reviewFormDisplayState() {
    return this._reviewFormDisplayState;
  }

  set reviewFormDisplayState(state: boolean) {
    runInAction(() => {
      this._reviewFormDisplayState = state;
    });
  }

  get myReview(): Review | null {
    return this._myReview;
  }

  set myReview(value: Review | null) {
    runInAction(() => {
      this._myReview = value;
    });
  }
}
