import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Grid } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';
import { Series } from 'stores/ani/model/ani';
import { config } from 'config/config';

const { useBreakpoint } = Grid;

const styles: CssKeyObject = {
  container: {
    textAlign: 'center',
  },
  title: {
    marginTop: '1em',
  },
  card: {
    width: '14em',
    textAlign: 'center',
    borderRadius: '1em',
    cursor: 'pointer',
  },
  cardMobile: { width: '10.5em', textAlign: 'center', borderRadius: '1em' },
  cardHead: { borderRadius: '1em' },
  cardBody: { padding: '0' },
  cardImg: {
    borderRadius: '0em 0em 1em 1em',
    height: '19em',
    objectFit: 'cover',
  },
  cardImgMobile: {
    borderRadius: '0em 0em 1em 1em',
    height: '15em',
    objectFit: 'cover',
  },
};

const ContentSliderItem = ({ data }: { data: Series }) => {
  const { xs } = useBreakpoint();
  const history = useHistory();
  const goToAniDetailPage = () => {
    history.push(`/anime/${data.id}`);
  };
  return (
    <Card
      type="inner"
      title={<strong>{data.koreanName}</strong>}
      cover={
        <img
          style={xs ? styles.cardImgMobile : styles.cardImg}
          alt="example"
          src={`${config.img}/anime_imgs/${data.id}.jpg`}
        />
      }
      style={xs ? styles.cardMobile : styles.card}
      headStyle={styles.cardHead}
      bodyStyle={styles.cardBody}
      onClick={goToAniDetailPage}
    />
  );
};

export default ContentSliderItem;
