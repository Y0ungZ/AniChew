import { mainAxios } from '../../../libs/axios';

class ReviewRepository {
  constructor(private readonly url: string) {}

  writeReview(animeId: string, content: string) {
    return mainAxios.post(`${this.url}/anime/${animeId}/review`, {
      content,
    });
  }

  updateReview(animeId: string, content: string, id: string) {
    return mainAxios.put(`${this.url}/anime/${animeId}/review`, {
      id,
      content,
    });
  }

  deleteReview(animeId: string, id: string) {
    return mainAxios.delete(`${this.url}/anime/${animeId}/review/${id}`);
  }

  getAllReviews(animeId: string) {
    return mainAxios.get(`${this.url}/anime/${animeId}/reviews`);
  }

  getMyReview(animeId: string) {
    return mainAxios.get(`${this.url}/anime/${animeId}/review`);
  }

  likeReview(reviewId: string, animeId: string) {
    return mainAxios.post(
      `${this.url}/anime/${animeId}/review/${reviewId}/love`,
    );
  }

  cancelLikeReview(reviewId: string, animeId: string) {
    return mainAxios.delete(
      `${this.url}/anime/${animeId}/review/${reviewId}/love`,
    );
  }
}

export default new ReviewRepository(process.env.REACT_APP_API_DOMAIN_URL!);
