import { makeAutoObservable, runInAction } from 'mobx';
import {
  FAIL_CANCEL_LIKE_REVIEW,
  FAIL_DELETE_REVIEW,
  FAIL_GET_ALL_REVIEW,
  FAIL_GET_MY_REVIEW,
  FAIL_LIKE_REVIEW,
  FAIL_UPDATE_REVIEW,
  FAIL_WRITE_REVIEW,
} from '../../../common/string-template/string-template';
import { Review, ReviewFormMode, Reviews, ReviewTarget } from '../model/review';
import reviewRepository from '../repository/review-repository';

interface ReviewStore {
  formMode: ReviewFormMode;
  showForm: boolean;
  reviews: Reviews;
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

  reviews: Reviews = {};

  myReview: Review | null = null;

  type: ReviewTarget = 'Animation';

  constructor() {
    makeAutoObservable(this);
  }

  async submit(id: string, content: string) {
    if (this.formMode === 'Write') {
      this.write(id, content);
    } else if (this.formMode === 'Update') {
      this.update(id, content, this.myReview!.reviewId);
    }
  }

  async write(id: string, content: string) {
    try {
      const res = await reviewRepository.write(this.type, id, content);
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
      } = res.data;
      runInAction(() => {
        this.myReview = new Review(
          reviewId,
          id,
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
        this.formMode = 'Read';
        this.reviews[id] = this.myReview;
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_WRITE_REVIEW);
    }
  }

  async update(targetId: string, content: string, id: string) {
    try {
      await reviewRepository.update(this.type, targetId, content, id);
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
        );
        this.reviews[id] = this.myReview;
        this.formMode = 'Read';
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_UPDATE_REVIEW);
    }
  }

  async delete(targetId: string, id: string) {
    try {
      await reviewRepository.delete(this.type, targetId, id);
      runInAction(() => {
        this.formMode = 'Write';
        this.myReview = null;
        delete this.reviews[id];
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_DELETE_REVIEW);
    }
  }

  async getAll(animeId: string) {
    try {
      const res = await reviewRepository.getAll(this.type, animeId);
      if (res.data.length === 0) return;
      runInAction(() => {
        res.data.forEach((review: Review) => {
          this.reviews[review.reviewId] = review;
        });
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.reviews = {};
      });
      throw new Error(FAIL_GET_ALL_REVIEW);
    }
  }

  async getMy(animeId: string) {
    try {
      const res = await reviewRepository.getMy(this.type, animeId);
      if (res.data === '') {
        runInAction(() => {
          this.myReview = null;
          this.formMode = 'Write';
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
          this.formMode = 'Read';
          this.showForm = true;
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_GET_MY_REVIEW);
    }
  }

  async like(id: string, targetId: string) {
    try {
      await reviewRepository.like(this.type, id, targetId);
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_LIKE_REVIEW);
    }
  }

  async cancelLike(id: string, targetId: string) {
    try {
      await reviewRepository.cancelLike(this.type, id, targetId);
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_CANCEL_LIKE_REVIEW);
    }
  }
}
