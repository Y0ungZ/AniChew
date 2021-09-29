import React, { useState } from 'react';
import { Card, Rate } from 'antd';
import { CssKeyObject } from '../../../../types/css-basic-type';
import { mainAxios } from '../../../../libs/axios';
import '../../../../assets/css/color.css';

const styles: CssKeyObject = {
  card: {
    width: '15em',
    borderRadius: '1em',
  },
  cardBody: {
    textAlign: 'center',
    backgroundColor: 'var(--main-color)',
  },
  thumbnail: {
    width: '100%',
    height: '20em',
  },
};

type AnimeCardWithRateProps = {
  id: number
}

const AnimeCardWithRate = ({ id }: AnimeCardWithRateProps) => {
  const [rate, setRate] = useState(0);

  const checkRate = (value: number) => {
    setRate(value);
    if (value === 0) {
      mainAxios.delete(`${process.env.REACT_APP_API_DOMAIN_URL}/anime/${id}/score`);
    } else {
      mainAxios.post(`${process.env.REACT_APP_API_DOMAIN_URL}/anime/${id}/score`, { score: value });
    }
  };

  return (
    <Card
      bordered={false}
      style={styles.card}
      bodyStyle={styles.cardBody}
      cover={<img alt="example" src={`${process.env.REACT_APP_IMAGE_BASE_URL}/anime_imgs/${id}.jpg`} style={styles.thumbnail} />}
    >
      <Rate onChange={checkRate} value={rate} />
    </Card>
  );
};

export default AnimeCardWithRate;
