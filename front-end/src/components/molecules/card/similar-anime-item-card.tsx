import React from 'react';
import { Card } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';
import { config } from 'config/config';

const styles: CssKeyObject = {
  card: { width: 150, textAlign: 'center', borderRadius: '1em' },
  cardHead: { borderRadius: '1em' },
  cardBody: { padding: '0', borderRadius: '1em' },
  cardImg: { borderRadius: '1em' },
  likeBtn: { backgroundColor: 'inherit', border: 'none', fontSize: '1rem' },
};

const SimilarAnimeItemCard = ({ id, name }: { id: number, name: string }) => (
  <Card
    type="inner"
    title={<strong>{name}</strong>}
    cover={
      <img style={styles.cardImg} alt="example" src={`${config.img}/anime_imgs/${id}.jpg`} />
    }
    style={styles.card}
    headStyle={styles.cardHead}
    bodyStyle={styles.cardBody}
  />
);

export default SimilarAnimeItemCard;
