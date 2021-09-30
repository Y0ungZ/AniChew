import React from 'react';
import { Card } from 'antd';
import Slider, { Settings } from 'react-slick';
import { CssKeyObject } from '../../../../types/css-basic-type';
import ReviewItemCard from './review-item-card';
import { Review } from '../../../../stores/ani/model/ani';

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

const ReviewSliderCard = ({ reviews }: { reviews: Review[] }) => (
  <Card
    title="리뷰 목록"
    bordered={false}
    style={styles.card}
    bodyStyle={styles.cardBody}
  >
    <Slider {...settings}>
      { reviews.map((review) => <ReviewItemCard key={review.id} review={review} />) }
    </Slider>
  </Card>
);

export default ReviewSliderCard;
