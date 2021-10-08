import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';
import { config } from 'config/config';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const styles: CssKeyObject = {
  card: {
    width: 150,
    textAlign: 'center',
    borderRadius: '1em',
    cursor: 'pointer',
  },
  cardMobile: { width: 110, textAlign: 'center', borderRadius: '1em' },
  cardHead: { borderRadius: '1em' },
  cardBody: { padding: '0', borderRadius: '1em' },
  cardImg: { borderRadius: '1em' },
};

const SimilarAnimeItemCard = ({ id, name }: { id: string; name: string }) => {
  const { xs } = useBreakpoint();
  const history = useHistory();

  return (
    <Card
      hoverable
      type="inner"
      title={<strong>{name}</strong>}
      cover={
        <img
          style={styles.cardImg}
          alt="example"
          src={`${config.img}/anime_imgs/${id}.jpg`}
        />
      }
      style={xs ? styles.cardMobile : styles.card}
      headStyle={styles.cardHead}
      bodyStyle={styles.cardBody}
      onClick={() => history.push(`/anime/${id}`)}
    />
  );
};

export default SimilarAnimeItemCard;
