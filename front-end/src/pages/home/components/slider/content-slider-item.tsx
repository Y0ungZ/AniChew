import React from 'react';
import { Grid } from 'antd';
import { AnimeList } from '../../../../types/anime-list-type';
import { CssKeyObject } from '../../../../models/css-basic-type';

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
  },
  smallImage: {
    width: '9em',
    height: '11em',
  },
  title: {
    marginTop: '1em',
  },
};

const ContentSliderItem = (props: ContentItemProps) => {
  const screens = useBreakpoint();
  return (
    <div style={styles.container}>
      <img
        style={screens.lg ? styles.largeImage : styles.smallImage}
        src={`${process.env.REACT_APP_IMAGE_BASE_URL
        }anime_imgs/${props.data.animeId}.jpg`}
        alt="슬라이드 이미지"
      />
      <p style={styles.title}>
        {props.data.animeKoreanName}
      </p>
    </div>
  );
};

export default ContentSliderItem;
