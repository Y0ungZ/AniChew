import React from 'react';
import { Carousel } from 'antd';
import PromotionCarouselItem from './promotion-carousel-item';
import { CssKeyObject } from '../../../../types/css-basic-type';
import '../../../../assets/css/color.css';

const styles: CssKeyObject = {
  carousel: {
    height: '30em',
    textAlign: 'center',
    backgroundColor: 'var(--text-dark)',
    overflow: 'hidden',
  },
};

const datas = [
  {
    animeId: 1535,
    animeName: 'Death Note',
    animeGenres: ['미스테리', '초능력', '스릴러'],
    animeJapaneseName: 'デスノート',
    animeKoreanName: '데스 노트',
    animeStudios: ['Madhouse'],
    animeRating: 8.63,
    animeSynopsis:
      '평범한 고교생인 야가미 라이토. 그러던 어느 날 하늘에서 검은 노트가 라이토 앞에 떨어진다. 그 노트는 사신계에서 떨어진 죽음의 노트. 그 노트에 이름이 적힌 자는 반드시 죽게 되는 노트인 데스노트였다.',
  }, {
    animeId: 3786,
    animeName: 'Evangelion: 3.0+1.0 Thrice Upon a Time',
    animeGenres: ['액션', '드라마', 'SF'],
    animeJapaneseName: 'シン・エヴァンゲリオン劇場版:||',
    animeKoreanName: '신 에반게리온 극장판:∥',
    animeStudios: ['Khara'],
    animeRating: 8.72,
    animeSynopsis:
      'さらば、全てのエヴァンゲリオン。 안녕, 모든 에반게리온. 에반게리온 신극장판 시리즈의 4번째 작품이자 최종장. 전작의 개봉 이후 9년 만의 개봉. 25년 동안 달려온 에반게리온, 안녕!',
  },
];

const PromotionCarousel = () => (
  <div>
    <Carousel style={styles.carousel} autoplay autoplaySpeed={6000}>
      {datas.map((data) => (
        <PromotionCarouselItem key={data.animeId} data={data} />
      ))}
    </Carousel>
  </div>
);

export default PromotionCarousel;
