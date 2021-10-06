import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';
import { useAni, useHome } from 'hooks';
import { Ani } from 'stores/ani/model/ani';
import PromotionCarouselItem from './promotion-carousel-item';
import 'assets/css/color.css';

const styles: CssKeyObject = {
  carousel: {
    height: '30em',
    textAlign: 'center',
    backgroundColor: 'var(--text-dark)',
    overflow: 'hidden',
  },
};

const PromotionCarousel = () => {
  const home = useHome();
  const [datas, setDatas] = useState<Ani[]|null>([]);

  useEffect(() => {
    home.getPromotion().then(() => {
      setDatas(home.promotionData);
    });
  }, [home]);

  return (
    <div>
      <Carousel style={styles.carousel} autoplay autoplaySpeed={6000}>
        {datas &&
          datas.map((data) => (
            <PromotionCarouselItem key={data.id} data={data} />
          ))}
      </Carousel>
    </div>
  );
};

export default PromotionCarousel;
