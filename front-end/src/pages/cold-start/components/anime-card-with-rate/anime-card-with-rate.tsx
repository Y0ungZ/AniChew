import React, { useState } from 'react';
import { Card, Rate } from 'antd';
import { CssKeyObject } from '../../../../models/css-basic-type';
import { mainAxios } from '../../../../libs/axios';
import '../../../../assets/css/color.css';

const styles: CssKeyObject = {
  card: {
    width: '80%',
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
  animeId: number
}

const AnimeCardWithRate = ({ animeId }: AnimeCardWithRateProps) => {
  const [rate, setRate] = useState(0);

  const checkRate = (value: number) => {
    setRate(value);
    if (value === 0) {
      mainAxios.delete(`${process.env.REACT_APP_API_DOMAIN_URL}/anime/${animeId}/score`);
    } else {
      mainAxios.post(`${process.env.REACT_APP_API_DOMAIN_URL}/anime/${animeId}/score`, { score: value });
    }
  };

  return (
    <Card
      bordered={false}
      style={styles.card}
      bodyStyle={styles.cardBody}
      cover={<img alt="example" src={`${process.env.REACT_APP_IMAGE_BASE_URL}/anime_imgs/${animeId}.jpg`} style={styles.thumbnail} />}
    >
      <Rate onChange={checkRate} value={rate} />
    </Card>
  );
};

export default AnimeCardWithRate;
