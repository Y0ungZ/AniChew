import React from 'react';
import { Card, List } from 'antd';
import { observer } from 'mobx-react';
import Slider, { Settings } from 'react-slick';
import { CssKeyObject } from 'types/css-basic-type';
import { useAni } from 'hooks';
import { NextArrow, PrevArrow } from 'components';
import SimilarAnimeItemCard from './similar-anime-item-card';

const styles: CssKeyObject = {
  card: {
    width: '100%',
    borderRadius: '1em',
    marginBottom: '2em',
  },
};

const settings: Settings = {
  className: 'center',
  centerMode: false,
  infinite: false,
  centerPadding: '1em',
  slidesToShow: 2.5,
  speed: 500,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
};

const SimilarAnimeCard = observer(() => {
  const { similarAnimes } = useAni();
  return (
    <Card title="비슷한 작품" bordered={false} style={styles.card}>
      {similarAnimes ?
        <Slider {...settings}>
          {similarAnimes.map((anime) => (
            <SimilarAnimeItemCard key={anime.id} id={anime.id} name={anime.koreanName} />
          ))}
        </Slider>
        : <List />}
    </Card>
  );
});

export default SimilarAnimeCard;
