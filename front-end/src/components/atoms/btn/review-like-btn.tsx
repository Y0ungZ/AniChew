import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { msg } from '../../../util/message';
import { REQUIRE_LOGIN } from '../../../common/string-template/string-template';
import { Review } from '../../../stores/review/model/review';
import { useAuth, useReview } from '../../../hooks';

const ReviewLikeBtn = observer(({ review }: {review: Review}) => {
  const [isLove, setIsLove] = useState<boolean>(review.love);
  const [loveCnt, setLoveCnt] = useState(review.loveCnt);
  const auth = useAuth();
  const reviewStore = useReview();

  const likeReview = () => {
    if (!auth.isLoggedIn) {
      msg('Error', REQUIRE_LOGIN);
      return;
    }
    if (isLove) {
      reviewStore.cancelLikeReview(review.id, review.animeId)
        .then(() => {
          setIsLove((prev) => !prev);
          setLoveCnt((prev) => prev - 1);
        })
        .catch((error) => msg('Error', error.message));
    } else {
      reviewStore.likeReview(review.id, review.animeId)
        .then(() => {
          setIsLove((prev) => !prev);
          setLoveCnt((prev) => prev + 1);
        })
        .catch((error) => msg('Error', error.message));
    }
  };

  return (
    <Button
      onClick={likeReview}
      icon={isLove ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
    >
      <span>{loveCnt}</span>
    </Button>
  );
});

export default ReviewLikeBtn;
