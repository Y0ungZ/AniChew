import { UNKNOWN_REVIEW_TARGET } from '../../../common/string-template/string-template';
import { mainAxios } from '../../../libs/axios';
import { ReviewTarget } from '../model/review';

class ReviewRepository {
  constructor(private readonly url: string) {}

  write(target: ReviewTarget, id: string, content: string) {
    if (target === 'Animation') {
      return mainAxios.post(`${this.url}/anime/${id}/review`, {
        content,
      });
    }
    if (target === 'Character') {
      return mainAxios.post(`${this.url}/chara/${id}/review`, {
        content,
      });
    }
    throw new Error(UNKNOWN_REVIEW_TARGET);
  }

  update(target: ReviewTarget, targetId: string, content: string, id: string) {
    if (target === 'Animation') {
      return mainAxios.put(`${this.url}/anime/${targetId}/review`, {
        id,
        content,
      });
    }
    if (target === 'Character') {
      return mainAxios.put(`${this.url}/chara/${targetId}/review`, {
        id,
        content,
      });
    }
    throw new Error(UNKNOWN_REVIEW_TARGET);
  }

  delete(target: ReviewTarget, targetId: string, id: string) {
    if (target === 'Animation') {
      return mainAxios.delete(`${this.url}/anime/${targetId}/review/${id}`);
    }
    if (target === 'Character') {
      return mainAxios.delete(`${this.url}/chara/${targetId}/review/${id}`);
    }
    throw new Error(UNKNOWN_REVIEW_TARGET);
  }

  getAll(target: ReviewTarget, id: string) {
    if (target === 'Animation') {
      return mainAxios.get(`${this.url}/anime/${id}/reviews`);
    }
    if (target === 'Character') {
      return mainAxios.get(`${this.url}/chara/${id}/reviews`);
    }
    throw new Error(UNKNOWN_REVIEW_TARGET);
  }

  getMy(target: ReviewTarget, id: string) {
    if (target === 'Animation') {
      return mainAxios.get(`${this.url}/anime/${id}/review`);
    }
    if (target === 'Character') {
      return mainAxios.get(`${this.url}/chara/${id}/review`);
    }

    throw new Error(UNKNOWN_REVIEW_TARGET);
  }

  like(target: ReviewTarget, id: string, reviewId: string) {
    if (target === 'Animation') {
      return mainAxios.post(`${this.url}/anime/${id}/review/${reviewId}/love`);
    }
    if (target === 'Character') {
      return mainAxios.post(`${this.url}/chara/${id}/review/${reviewId}/love`);
    }
    throw new Error(UNKNOWN_REVIEW_TARGET);
  }

  cancelLike(target: ReviewTarget, id: string, reviewId: string) {
    if (target === 'Animation') {
      return mainAxios.delete(
        `${this.url}/anime/${id}/review/${reviewId}/love`,
      );
    }
    if (target === 'Character') {
      return mainAxios.delete(
        `${this.url}/chara/${id}/review/${reviewId}/love`,
      );
    }
    throw new Error(UNKNOWN_REVIEW_TARGET);
  }
}

export default new ReviewRepository(process.env.REACT_APP_API_DOMAIN_URL!);
