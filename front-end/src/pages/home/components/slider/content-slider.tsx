import React from 'react';
import { Typography } from 'antd';
import Slider, { Settings } from 'react-slick';
import { NextArrow, PrevArrow } from 'components';
import { CssKeyObject } from 'types/css-basic-type';
import { RelatedAni } from 'stores/ani/model/ani';
import ContentSliderItem from './content-slider-item';
import 'assets/css/color.css';

const { Title } = Typography;

const styles: CssKeyObject = {
  position: {
    maxWidth: '80em',
    margin: '0 auto',
    paddingTop: '2em',
    paddingBottom: '2em',
  },
  title: {
    fontFamily: 'titleFont',
    color: 'var(--text-dark)',
    marginLeft: '1em',
  },
};

const settings: Settings = {
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 0,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
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

const ContentSlider = ({
  title,
  datas,
}: {
  title: string;
  datas: RelatedAni[];
}) => (
  <div style={styles.position}>
    <Title style={styles.title} level={3}>
      {title}
    </Title>
    <Slider {...settings}>
      {datas.map((data) => (
        <ContentSliderItem key={data.id} data={data} />
      ))}
    </Slider>
  </div>
);

export default ContentSlider;
