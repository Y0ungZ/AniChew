import React from 'react';
import { Typography } from 'antd';
import Slider, { Settings } from 'react-slick';
import ContentSliderItem from './content-slider-item';
import { AnimeList } from '../../../../types/anime-list-type';
import { CssKeyObject } from '../../../../types/css-basic-type';
import '../../../../assets/css/color.css';

const { Title } = Typography;

type ContentItemProps = {
  datas: AnimeList[],
  title: string
};

const styles: CssKeyObject = {
  position: {
    marginLeft: '2em',
    paddingTop: '2em',
    paddingBottom: '2em',
  },
  title: {
    fontFamily: 'titleFont',
    color: 'var(--text-dark)',
  },
};

const settings: Settings = {
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 577,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const ContentSlider = (props:ContentItemProps) => (

  <div style={styles.position}>
    <Title style={styles.title} level={3}>
      {props.title}
    </Title>
    <Slider {...settings}>
      {props.datas.map((data) => (
        <ContentSliderItem key={data.animeId} data={data} />
      ))}
    </Slider>
  </div>
);

export default ContentSlider;
