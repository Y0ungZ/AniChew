import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from 'antd';
import { AnimeList } from '../../../../types/anime-list-type';
import { CssKeyObject } from '../../../../types/css-basic-type';

const { useBreakpoint } = Grid;

type ContentItemProps = {
    data: AnimeList,
};

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

const ContentSliderItem = (props: ContentItemProps) => {
  const screens = useBreakpoint();
  const history = useHistory();
  const goToAniDetailPage = () => {
    history.push(`/anime/${props.data.animeId}`);
  };
  return (
    <div style={styles.container}>
      <img
        style={screens.lg ? styles.largeImage : styles.smallImage}
        src={`${process.env.REACT_APP_IMAGE_BASE_URL
        }/anime_imgs/${props.data.animeId}.jpg`}
        alt="슬라이드 이미지"
        onClick={goToAniDetailPage}
        onKeyDown={goToAniDetailPage}
      />
      <p style={styles.title}>
        {props.data.animeKoreanName}
      </p>
    </div>
  );
};

export default ContentSliderItem;
