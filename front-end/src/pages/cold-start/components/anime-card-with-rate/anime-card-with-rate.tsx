import React, { useState } from 'react';
import { Card, Rate } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';
import 'assets/css/color.css';
import { useAni } from 'hooks';
import { msg } from 'util/message';
import { config } from 'config/config';

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

const AnimeCardWithRate = ({ id }: {id: string}) => {
  const ani = useAni();
  const [rate, setRate] = useState(0);

  const checkRate = (value: number) => {
    setRate(value);
    if (value === 0) {
      ani.removeScore(id)
        .then()
        .catch((error) => msg('Error', error));
    } else {
      ani.setScore(id, value)
        .then()
        .catch((error) => msg('Error', error));
    }
  };

  return (
    <Card
      bordered={false}
      style={styles.card}
      bodyStyle={styles.cardBody}
      cover={
        <img
          alt="example"
          src={`${config.img}/anime_imgs/${id}.jpg`}
          style={styles.thumbnail}
        />
      }
    >
      <Rate onChange={checkRate} value={rate} />
    </Card>
  );
};

export default AnimeCardWithRate;
