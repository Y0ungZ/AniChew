import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useAni, useAuth } from '../../../../hooks';
import { Review } from '../../../../stores/ani/model/review';
import { msg } from '../../../../util/message';
import { REQUIRE_LOGIN } from '../../../../common/string-template/string-template';

const ReviewLikeBtn = observer(({ review }: {review: Review}) => {
  const [isLove, setIsLove] = useState<boolean>(review.love);
  const [loveCnt, setLoveCnt] = useState(review.loveCnt);
  const ani = useAni();
  const auth = useAuth();

  const likeReview = () => {
    if (!auth.isLoggedIn) {
      msg('Error', REQUIRE_LOGIN);
      return;
    }
    if (isLove) {
      ani.cancelLikeReview(review.id, review.animeId)
        .then(() => {
          setIsLove((prev) => !prev);
          setLoveCnt((prev) => prev - 1);
        })
        .catch((error) => msg('Error', error));
    } else {
      ani.likeReview(review.id, review.animeId)
        .then(() => {
          setIsLove((prev) => !prev);
          setLoveCnt((prev) => prev + 1);
        })
        .catch((error) => msg('Error', error));
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
