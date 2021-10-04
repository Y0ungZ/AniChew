import React from 'react';
import { observer } from 'mobx-react';
import { Card, List } from 'antd';
import Slider, { Settings } from 'react-slick';
import ReviewItemCard from './review-item-card';
import { CssKeyObject } from '../../../types/css-basic-type';
import { useReview } from '../../../hooks';

const styles: CssKeyObject = {
  card: {
    width: '100%',
    borderRadius: '1em',
    marginBottom: '2em',
  },
  cardBody: {
    padding: '3em',
  },
};

const settings: Settings = {
  className: 'center',
  centerMode: true,
  infinite: false,
  centerPadding: '1em',
  slidesToShow: 1.2,
  speed: 500,
};

const ReviewSliderCard = observer(() => {
  const { reviews } = useReview();
  return (
    <Card
      title="리뷰 목록"
      bordered={false}
      style={styles.card}
      bodyStyle={styles.cardBody}
    >
      {Object.keys(reviews).length > 0 ? (
        <Slider {...settings}>
          { Object.keys(reviews).map((key) => <ReviewItemCard key={key} review={reviews[key]} />)}
        </Slider>
      ) : (
        <List />
      )}
    </Card>
  );
});

export default ReviewSliderCard;
