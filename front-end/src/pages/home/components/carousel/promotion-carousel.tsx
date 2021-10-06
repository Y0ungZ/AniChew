import React, { useState, useEffect } from 'react';
import { toJS } from 'mobx';
import { Carousel } from 'antd';
import PromotionCarouselItem from './promotion-carousel-item';
import { useAni } from '../../../../hooks';
import { CssKeyObject } from '../../../../types/css-basic-type';
import '../../../../assets/css/color.css';
import { Ani } from '../../../../stores/ani/model/ani';

const styles: CssKeyObject = {
  carousel: {
    height: '30em',
    textAlign: 'center',
    backgroundColor: 'var(--text-dark)',
    overflow: 'hidden',
  },
};

const PromotionCarousel = () => {
  const ani = useAni();
  const [datas, setDatas] = useState<Ani[]|null>([]);

  useEffect(() => {
    ani.getPromotion();
    setDatas(toJS(ani.promotionData));
  }, [ani]);

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
