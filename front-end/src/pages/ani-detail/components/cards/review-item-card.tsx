import React from 'react';
import { Card } from 'antd';
import { CssKeyObject } from '../../../../types/css-basic-type';
import { Review } from '../../../../stores/ani/model/review';
import ReviewLikeBtn from '../button/review-like-btn';

const styles: CssKeyObject = {
  card: {
    margin: '1em',
  },
  cardBody: {
    margin: '3em 1em',
  },
};

const ReviewItemCard = ({ review }: {review: Review}) => (
  <Card
    type="inner"
    title={`${review.nickname}`}
    extra={<ReviewLikeBtn review={review} />}
    style={styles.card}
    bodyStyle={styles.cardBody}
  >
    <p>{review.content}</p>
  </Card>
);

export default ReviewItemCard;
