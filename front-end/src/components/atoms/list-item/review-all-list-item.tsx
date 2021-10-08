import React from 'react';
import moment from 'moment';
import { Avatar, List } from 'antd';
import { Review } from 'stores/review/model/review';
import { config } from 'config/config';
import { ReviewLikeBtn } from 'components';

const RevieAllListItem = ({ review }: { review: Review }) => (
  <List.Item
    key={review.reviewId}
    actions={[
      <ReviewLikeBtn review={review} />,
    ]}
  >
    <List.Item.Meta
      avatar={
        <Avatar
          src={`${config.img}/user_imgs/${review.userId}/${review.userAvatar}`}
        >
          {review.nickname[0]}
        </Avatar>
        }
      title={<a href={`/user/${review.userId}`}>{review.nickname}</a>}
      description={moment(review.createdDate).format('YYYY-MM-DD HH:MM')}
    />
    {review.content}
  </List.Item>
);

export default RevieAllListItem;
