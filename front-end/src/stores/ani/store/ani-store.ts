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

  reviewFormMode: ReviewFormMode = 'Write';

  reviewFormDisplayState = false;

  myReview: Review | null = null;

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
          myScore / 2,
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
        if (this.aniInfo.myScore > 0) this.reviewFormDisplayState = true;
        this.favorite = favorite;
      });
    } catch (error) {
      runInAction(() => {
        this.aniInfo = null;
      });
    }
    this.aniInfoState = 'Done';
  }

  async submitReview(animeId: string, content: string) {
    if (this.reviewFormMode === 'Write') {
      this.writeReview(animeId, content);
    } else if (this.reviewFormMode === 'Update') {
      this.updateReview(animeId, content, this.myReview!.id);
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
          this.myReview = null;
          this.reviewFormMode = 'Write';
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
            love,
            lovecnt,
          } = res.data;

          this.myReview = new Review(
            id,
            animeId,
            userId,
            content,
            createdDate,
            modifiedDate,
            mine,
            name,
            nickname,
            love,
            lovecnt,
          );
          this.reviewFormMode = 'Read';
          this.reviewFormDisplayState = true;
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
        this.favorite = true;
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
        this.favorite = false;
      });
    } catch (error) {
      throw new Error(FAIL_CANCEL_LIKE_ANI);
    }
  }

  async likeReview(reviewId: string, animeId: string) {
    try {
      await aniRepository.likeReview(reviewId, animeId);
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_LIKE_REVIEW);
    }
  }

  async cancelLikeReview(reviewId: string, animeId: string) {
    try {
      await aniRepository.cancelLikeReview(reviewId, animeId);
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_CANCEL_LIKE_REVIEW);
    }
  }
}
