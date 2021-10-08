import React from 'react';
import { Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
import { CssKeyObject } from 'types/css-basic-type';
import { Review } from 'stores/review/model/review';
import { ReviewLikeBtn } from 'components';
import { config } from 'config/config';

const styles: CssKeyObject = {
  card: {
    margin: '1em',
  },
  nickname: {
    marginLeft: '1em',
  },
  cardBody: {
    margin: '3em 1em',
  },
};

const ReviewItemCard = ({ review }: { review: Review }) => (
  <Card
    type="inner"
    title={
      <>
        <Avatar
          src={`${config.img}/user_imgs/${review.userId}/${review.userAvatar}`}
        >
          {review.nickname[0]}
        </Avatar>

        <Link to={`/user/${review.userId}`} style={styles.nickname}>
          {review.nickname}
        </Link>
      </>
    }
    extra={<ReviewLikeBtn review={review} />}
    style={styles.card}
    bodyStyle={styles.cardBody}
  >
    <p>{review.content}</p>
  </Card>
);

export default ReviewItemCard;
