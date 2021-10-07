import React, { useState } from 'react';
import { Card, Rate } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';
import 'assets/css/color.css';
import { useAni } from 'hooks';
import { msg } from 'util/message';
import { config } from 'config/config';
import { Series } from 'stores/ani/model/ani';

const styles: CssKeyObject = {
  card: {
    width: '15em',
    borderRadius: '1em',
    textAlign: 'center',
    backgroundColor: '#f0f2f5',
  },
  cardBody: {
    textAlign: 'center',
    backgroundColor: 'var(--main-color)',
    borderRadius: '0em 0em 1em 1em',
    padding: '1em',
  },
  thumbnail: {
    width: '100%',
    height: '20em',
  },
};

const AnimeCardWithRate = ({ aniMeta }: { aniMeta: Series }) => {
  const ani = useAni();
  const [rate, setRate] = useState(0);

  const checkRate = (value: number) => {
    setRate(value);
    if (value === 0) {
      ani
        .removeScore(aniMeta.id)
        .then()
        .catch((error) => msg('Error', error));
    } else {
      ani
        .setScore(aniMeta.id, value)
        .then()
        .catch((error) => msg('Error', error));
    }
  };

  return (
    <Card
      bordered={false}
      style={styles.card}
      bodyStyle={styles.cardBody}
      title={<strong>{aniMeta.koreanName}</strong>}
      cover={
        <img
          alt="example"
          src={`${config.img}/anime_imgs/${aniMeta.id}.jpg`}
          style={styles.thumbnail}
        />
      }
    >
      <Rate onChange={checkRate} value={rate} />
    </Card>
  );
};

export default AnimeCardWithRate;
