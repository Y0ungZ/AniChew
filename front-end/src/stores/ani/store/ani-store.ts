import { makeAutoObservable, runInAction } from 'mobx';
import {
  FAIL_CANCEL_LIKE_ANI,
  FAIL_CANCEL_LIKE_REVIEW,
  FAIL_DELETE_ANI_SCORE,
  FAIL_DELETE_REVIEW,
  FAIL_GET_MY_REVIEW,
  FAIL_GIVE_ANI_SCORE,
  FAIL_LIKE_ANI,
  FAIL_LIKE_REVIEW,
  FAIL_UPDATE_REVIEW,
  FAIL_WRITE_REVIEW,
} from '../../../common/string-template/string-template';
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

  private _favorite = false;

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
        this._favorite = favorite;
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
      throw new Error(FAIL_WRITE_REVIEW);
    }
  }

  async updateReview(animeId: string, content: string, reviewId: string) {
    try {
      await aniRepository.updateReview(animeId, content, reviewId);
      this.getMyReview(animeId);
    } catch (error) {
      throw new Error(FAIL_UPDATE_REVIEW);
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
      throw new Error(FAIL_DELETE_REVIEW);
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
      throw new Error(FAIL_GET_MY_REVIEW);
    }
  }

  async setAniScore(animeId: string, score: number) {
    try {
      await aniRepository.setAniScore(animeId, score);
      runInAction(() => {
        this.reviewFormDisplayState = true;
      });
    } catch (error) {
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
      const res = await aniRepository.setFavoriteAni(animeId);
      console.log(res);
      runInAction(() => {
        this._favorite = true;
      });
    } catch (error) {
      console.log('error', error);
      throw new Error(FAIL_LIKE_ANI);
    }
  }

  async deleteFavoriteAnime(animeId: string) {
    try {
      const res = await aniRepository.deleteFavoriteAni(animeId);
      console.log(res);
      runInAction(() => {
        this._favorite = false;
      });
    } catch (error) {
      throw new Error(FAIL_CANCEL_LIKE_ANI);
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

  get favorite(): boolean {
    return this._favorite;
  }

  set favorite(value: boolean) {
    runInAction(() => {
      this._favorite = value;
    });
  }
}
