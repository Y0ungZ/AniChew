import { makeAutoObservable, runInAction } from 'mobx';
import {
  FAIL_CANCEL_LIKE_REVIEW,
  FAIL_DELETE_REVIEW,
  FAIL_GET_ALL_REVIEW,
  FAIL_GET_MY_REVIEW,
  FAIL_LIKE_REVIEW,
  FAIL_UPDATE_REVIEW,
  FAIL_WRITE_REVIEW,
} from 'common/string-template/string-template';
import { Review, ReviewFormMode, ReviewTarget } from '../model/review';
import reviewRepository from '../repository/review-repository';

interface ReviewStore {
  formMode: ReviewFormMode;
  showForm: boolean;
  reviews: Review[];
  myReview: Review | null;
  submit(target: ReviewTarget, id: string, content: string): Promise<void>;
  write(target: ReviewTarget, id: string, content: string): Promise<void>;
  update(
    target: ReviewTarget,
    id: string,
    content: string,
    reviewId: string,
  ): Promise<void>;
  delete(target: ReviewTarget, id: string, content: string): Promise<void>;
  getAll(target: ReviewTarget, id: string): Promise<void>;
  getMy(target: ReviewTarget, id: string): Promise<void>;
  like(target: ReviewTarget, reviewId: string, id: string): Promise<void>;
  cancelLike(target: ReviewTarget, reviewId: string, id: string): Promise<void>;
}

export default class ReviewStoreImpl implements ReviewStore {
  formMode: ReviewFormMode = 'Write';

  showForm = false;

  reviews: Review[] = [];

  myReview: Review | null = null;

  type: ReviewTarget = 'Animation';

  constructor() {
    makeAutoObservable(this);
  }

  async submit(targetId: string, content: string) {
    if (this.formMode === 'Write') {
      this.write(targetId, content);
    } else if (this.formMode === 'Update') {
      this.update(targetId, content, this.myReview!.reviewId);
    }
  }

  async write(targetId: string, content: string) {
    try {
      const res = await reviewRepository.write(this.type, targetId, content);
      const {
        reviewId,
        userId,
        createdDate,
        modifiedDate,
        mine,
        name,
        nickname,
        love,
        loveCnt,
        userAvatar,
      } = res.data;
      runInAction(() => {
        this.myReview = new Review(
          reviewId,
          targetId,
          userId,
          content,
          createdDate,
          modifiedDate,
          mine,
          name,
          nickname,
          love,
          loveCnt,
          userAvatar,
        );
        this.formMode = 'Read';
        this.reviews.push(this.myReview);
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_WRITE_REVIEW);
    }
  }

  async update(targetId: string, content: string, reviewId: string) {
    try {
      await reviewRepository.update(this.type, targetId, content);
      runInAction(() => {
        this.myReview = new Review(
          this.myReview!.reviewId,
          this.myReview!.targetId,
          this.myReview!.userId,
          content,
          this.myReview!.createdDate,
          this.myReview!.modifiedDate,
          this.myReview!.mine,
          this.myReview!.name,
          this.myReview!.nickname,
          this.myReview!.love,
          this.myReview!.loveCnt,
          this.myReview!.userAvatar,
        );
        const idx = this.reviews.findIndex(
          (review: Review) => review.reviewId === reviewId,
        );

        this.reviews[idx] = this.myReview;
        this.formMode = 'Read';
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_UPDATE_REVIEW);
    }
  }

  async delete(targetId: string) {
    try {
      await reviewRepository.delete(this.type, targetId);
      runInAction(() => {
        this.formMode = 'Write';
        const idx = this.reviews.findIndex(
          (review: Review) => review.reviewId === this.myReview?.reviewId,
        );

        this.reviews.splice(idx, 1);
        this.myReview = null;
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_DELETE_REVIEW);
    }
  }

  async getAll(targetId: string) {
    try {
      const res = await reviewRepository.getAll(this.type, targetId);
      this.reviews = [];
      if (res.data.length === 0) return;

      runInAction(() => {
        res.data.forEach((review: Review) => {
          this.reviews.push(review);
        });

        this.reviews.sort((a, b) => {
          if (a.loveCnt === b.loveCnt) {
            return (
              new Date(a.createdDate).getTime() -
              new Date(b.createdDate).getTime()
            );
          }
          return b.loveCnt - a.loveCnt;
        });
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.reviews = [];
      });
      throw new Error(FAIL_GET_ALL_REVIEW);
    }
  }

  async getMy(targetId: string) {
    try {
      const res = await reviewRepository.getMy(this.type, targetId);
      if (res.data === '') {
        runInAction(() => {
          this.myReview = null;
          this.formMode = 'Write';
        });
      } else {
        runInAction(() => {
          const {
            reviewId,
            userId,
            content,
            createdDate,
            modifiedDate,
            mine,
            name,
            nickname,
            love,
            loveCnt,
            userAvatar,
          } = res.data;

          this.myReview = new Review(
            reviewId,
            targetId,
            userId,
            content,
            createdDate,
            modifiedDate,
            mine,
            name,
            nickname,
            love,
            loveCnt,
            userAvatar,
          );
          this.formMode = 'Read';
          this.showForm = true;
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_GET_MY_REVIEW);
    }
  }

  async like(reviewId: string, targetId: string) {
    try {
      await reviewRepository.like(this.type, reviewId, targetId);
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_LIKE_REVIEW);
    }
  }

  async cancelLike(reviewId: string, targetId: string) {
    try {
      await reviewRepository.cancelLike(this.type, reviewId, targetId);
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_CANCEL_LIKE_REVIEW);
    }
  }
}
