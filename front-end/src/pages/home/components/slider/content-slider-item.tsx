import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';
import { RelatedAni } from 'stores/ani/model/ani';
import { config } from 'config/config';

const { useBreakpoint } = Grid;

const styles: CssKeyObject = {
  container: {
    textAlign: 'center',
  },
  largeImage: {
    width: '13em',
    height: '15em',
    cursor: 'pointer',
  },
  smallImage: {
    width: '9em',
    height: '11em',
    cursor: 'pointer',
  },
  title: {
    marginTop: '1em',
  },
};

const ContentSliderItem = ({ data }: { data: RelatedAni }) => {
  const screens = useBreakpoint();
  const history = useHistory();
  const goToAniDetailPage = () => {
    history.push(`/anime/${data.id}`);
  };
  return (
    <div style={styles.container}>
      <img
        style={screens.lg ? styles.largeImage : styles.smallImage}
        src={`${config.img}/anime_imgs/${data.id}.jpg`}
        alt="슬라이드 이미지"
        onClick={goToAniDetailPage}
        onKeyDown={goToAniDetailPage}
      />
      <p style={styles.title}>{data.koreanName}</p>
    </div>
  );
};

export default ContentSliderItem;
