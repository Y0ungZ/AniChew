import React from 'react';
import { Button, Card } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { CssKeyObject } from '../../../../types/css-basic-type';
import { Review } from '../../../../stores/ani/model/review';

const styles: CssKeyObject = {
  card: {
    margin: '1em',
  },
  cardBody: {
    margin: '3em 1em',
  },
};

const headerBtn = <Button shape="circle" icon={<HeartOutlined />} />;

const ReviewItemCard = ({ review }: {review: Review}) => (
  <Card
    type="inner"
    title={`${review.nickname} ★4.5`}
    extra={headerBtn}
    style={styles.card}
    bodyStyle={styles.cardBody}
  >
    <p>{review.content}</p>
  </Card>
);

export default ReviewItemCard;
