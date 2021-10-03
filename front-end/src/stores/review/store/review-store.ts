import { makeAutoObservable, runInAction } from 'mobx';
import {
  FAIL_CANCEL_LIKE_REVIEW,
  FAIL_DELETE_REVIEW,
  FAIL_GET_MY_REVIEW,
  FAIL_LIKE_REVIEW,
  FAIL_UPDATE_REVIEW,
  FAIL_WRITE_REVIEW,
} from '../../../common/string-template/string-template';
import { Review } from '../model/review';
import aniRepository from '../repository/review-repository';

type ReviewFormMode = 'Write' | 'Read' | 'Update';
type Reviews = {
  [key: string]: Review;
};

export default class ReviewStore {
  reviewFormMode: ReviewFormMode = 'Write';

  reviewFormDisplayState = false;

  reviews: Reviews = {};

  myReview: Review | null = null;

  constructor() {
    makeAutoObservable(this);
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
      const res = await aniRepository.writeReview(animeId, content);
      const {
        id,
        userId,
        createdDate,
        modifiedDate,
        mine,
        name,
        nickname,
        love,
        loveCnt,
      } = res.data;
      runInAction(() => {
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
          loveCnt,
        );
        this.reviewFormMode = 'Read';
        this.reviews[id] = this.myReview;
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_WRITE_REVIEW);
    }
  }

  async updateReview(animeId: string, content: string, reviewId: string) {
    try {
      await aniRepository.updateReview(animeId, content, reviewId);
      runInAction(() => {
        this.myReview = new Review(
          this.myReview!.id,
          this.myReview!.animeId,
          this.myReview!.userId,
          content,
          this.myReview!.createdDate,
          this.myReview!.modifiedDate,
          this.myReview!.mine,
          this.myReview!.name,
          this.myReview!.nickname,
          this.myReview!.love,
          this.myReview!.loveCnt,
        );
        this.reviews[reviewId] = this.myReview;
        this.reviewFormMode = 'Read';
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_UPDATE_REVIEW);
    }
  }

  async deleteReview(animeId: string, id: string) {
    try {
      await aniRepository.deleteReview(animeId, id);
      runInAction(() => {
        this.reviewFormMode = 'Write';
        this.myReview = null;
        delete this.reviews[id];
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_DELETE_REVIEW);
    }
  }

  async getAllReviews(animeId: string) {
    try {
      const res = await aniRepository.getAllReviews(animeId);
      if (res.data.length === 0) return;
      runInAction(() => {
        res.data.forEach((review: Review) => {
          this.reviews[review.id] = review;
        });
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_GET_MY_REVIEW);
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
      console.log(error);
      throw new Error(FAIL_GET_MY_REVIEW);
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
