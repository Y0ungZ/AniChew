import { AxiosInstance } from 'axios';
import { UNKNOWN_REVIEW_TARGET } from 'common/string-template/string-template';
import { mainAxios } from 'config/axios';
import { ReviewTarget } from 'stores/review/model/review';

class ReviewRepository {
  constructor(private readonly instance: AxiosInstance) {}

  write(target: ReviewTarget, id: string, content: string) {
    if (target === 'Animation') {
      return this.instance.post(`/anime/${id}/review`, {
        content,
      });
    }
    if (target === 'Character') {
      return this.instance.post(`/chara/${id}/review`, {
        content,
      });
    }
    throw new Error(UNKNOWN_REVIEW_TARGET);
  }

  update(target: ReviewTarget, targetId: string, content: string) {
    if (target === 'Animation') {
      return this.instance.put(`/anime/${targetId}/review`, {
        content,
      });
    }
    if (target === 'Character') {
      return this.instance.put(`/chara/${targetId}/review`, {
        content,
      });
    }
    throw new Error(UNKNOWN_REVIEW_TARGET);
  }

  delete(target: ReviewTarget, targetId: string) {
    if (target === 'Animation') {
      return this.instance.delete(`/anime/${targetId}/review`);
    }
    if (target === 'Character') {
      return this.instance.delete(`/chara/${targetId}/review`);
    }
    throw new Error(UNKNOWN_REVIEW_TARGET);
  }

  getAll(target: ReviewTarget, id: string) {
    if (target === 'Animation') {
      return this.instance.get(`/anime/${id}/reviews`);
    }
    if (target === 'Character') {
      return this.instance.get(`/chara/${id}/reviews`);
    }
    throw new Error(UNKNOWN_REVIEW_TARGET);
  }

  getMy(target: ReviewTarget, id: string) {
    if (target === 'Animation') {
      return this.instance.get(`/anime/${id}/review`);
    }
    if (target === 'Character') {
      return this.instance.get(`/chara/${id}/review`);
    }

    throw new Error(UNKNOWN_REVIEW_TARGET);
  }

  like(target: ReviewTarget, id: string, targetId: string) {
    if (target === 'Animation') {
      return this.instance.post(`/anime/${targetId}/review/${id}/love`);
    }
    if (target === 'Character') {
      return this.instance.post(`/chara/${targetId}/review/${id}/love`);
    }
    throw new Error(UNKNOWN_REVIEW_TARGET);
  }

  cancelLike(target: ReviewTarget, id: string, targetId: string) {
    if (target === 'Animation') {
      return this.instance.delete(`/anime/${targetId}/review/${id}/love`);
    }
    if (target === 'Character') {
      return this.instance.delete(`/chara/${targetId}/review/${id}/love`);
    }
    throw new Error(UNKNOWN_REVIEW_TARGET);
  }
}

export default new ReviewRepository(mainAxios);
