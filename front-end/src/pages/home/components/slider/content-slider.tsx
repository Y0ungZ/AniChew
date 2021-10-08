import React, { useEffect } from 'react';
import { Typography, List } from 'antd';
import Slider, { Settings } from 'react-slick';
import { NextArrow, PrevArrow } from 'components';
import { CssKeyObject } from 'types/css-basic-type';
import 'assets/css/color.css';
import { observer } from 'mobx-react';
import { useHome } from 'hooks';
import { msg } from 'util/message';
import { RecommendationType } from 'stores/home/model/home';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import ContentSliderItem from './content-slider-item';

const { Title } = Typography;

const styles: CssKeyObject = {
  position: {
    maxWidth: '80em',
    margin: '0 auto',
    padding: '2em',
  },
  positionMobile: {
    margin: '0 auto',
    padding: '1.5em 1em',
  },
  title: {
    fontFamily: 'titleFont',
    color: 'var(--text-dark)',
    marginLeft: '1em',
  },
  titleMobile: {
    fontFamily: 'titleFont',
    color: 'var(--text-dark)',
    fontSize: '1rem',
    textAlign: 'center',
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

const ContentSlider = observer(
  ({ title, type }: { title: string; type: string }) => {
    const home = useHome();
    const { content } = useHome();
    const { xs } = useBreakpoint();
    useEffect(() => {
      home
        .getRecommendations(type as RecommendationType)
        .then()
        .catch((error) => msg('Error', error.message));
    }, [home, type]);

    return (
      <div style={xs ? styles.positionMobile : styles.position}>
        <Title style={xs ? styles.titleMobile : styles.title} level={3}>
          {title}
        </Title>
        {content[type].length > 0 ? (
          <Slider {...settings}>
            {content[type].map((data) => (
              <ContentSliderItem key={data.id} data={data} />
            ))}
          </Slider>
        ) : (
          <List />
        )}
      </div>
    );
  },
);

export default ContentSlider;
