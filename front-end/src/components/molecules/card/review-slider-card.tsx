import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Slider, { Settings } from 'react-slick';
import { Button, Card, List, Modal } from 'antd';
import {
  ReviewItemCard,
  PrevArrow,
  NextArrow,
  ReviewAllListItem,
} from 'components';
import { CssKeyObject } from 'types/css-basic-type';
import { useReview } from 'hooks';

const styles: CssKeyObject = {
  card: {
    width: '100%',
    borderRadius: '1em',
    marginBottom: '2em',
  },
  cardBody: {
    padding: '1em',
  },
};

const settings: Settings = {
  className: 'center',
  centerMode: true,
  infinite: false,
  centerPadding: '1em',
  slidesToShow: 1.2,
  speed: 500,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
};

const ReviewSliderCard = observer(() => {
  const reviewStore = useReview();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card
        title="리뷰 목록"
        bordered={false}
        style={styles.card}
        bodyStyle={styles.cardBody}
        extra={
          <Button type="primary" onClick={showModal}>
            전체보기
          </Button>
        }
      >
        {reviewStore.reviews.length ? (
          <Slider {...settings}>
            {reviewStore.reviews.map((item) => (
              <ReviewItemCard key={item.reviewId} review={item} />
            ))}
          </Slider>
        ) : (
          <List />
        )}
      </Card>

      <Modal
        title="리뷰 전체보기"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        footer={null}
      >
        <List
          size="large"
          pagination={{
            pageSize: 10,
          }}
          dataSource={reviewStore.reviews}
          renderItem={(review) => <ReviewAllListItem review={review} />}
        />
      </Modal>
    </>
  );
});

export default ReviewSliderCard;
