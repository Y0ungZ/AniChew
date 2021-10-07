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
  cardBody: { padding: '1em', height: '3.5em' },
  cardBodyTitle: {
    fontWeight: 'bold',
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },
  cardImg: {
    borderRadius: '1em 1em 0em 0em',
    height: '19em',
    objectFit: 'cover',
  },
  cardImgMobile: {
    borderRadius: '1em 1em 0em 0em',
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
    >
      <p style={styles.cardBodyTitle}>{data.koreanName}</p>
    </Card>
  );
};

export default ContentSliderItem;
