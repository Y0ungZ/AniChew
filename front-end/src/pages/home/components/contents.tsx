import React from 'react';
import { CssKeyObject } from 'types/css-basic-type';
import ContentSlider from './slider/content-slider';

const datas = [
  {
    animeId: 19,
    animeName: 'Monster',
    animeGenres: ['드라마', '공포', '미스테리', '스릴러'],
    animeJapaneseName: 'モンスター',
    animeKoreanName: '몬스터',
    animeStudios: ['Madhouse'],
    animeRating: 8.8,
  },
  {
    animeId: 1,
    animeName: 'Cowboy Bebop',
    animeGenres: ['액션', '모험', '코미디', '공상과학'],
    animeJapaneseName: 'カウボーイビバップ',
    animeKoreanName: '카우보이 비밥',
    animeStudios: ['Sunrise'],
    animeRating: 8.77,
  },
  {
    animeId: 164,
    animeName: 'Mononoke Hime',
    animeGenres: ['액션', '모험', '판타지'],
    animeJapaneseName: 'もののけ姫',
    animeKoreanName: '모노노케 히메',
    animeStudios: ['Studio Ghibli'],
    animeRating: 8.69,
  },
  {
    animeId: 10379,
    animeName: 'Natsume Yuujinchou San',
    animeGenres: ['드라마', '일상물', '초능력'],
    animeJapaneseName: '夏目友人帳 参',
    animeKoreanName: '나츠메 우인장',
    animeStudios: ["Brain's Base"],
    animeRating: 8.58,
  },
  {
    animeId: 437,
    animeName: 'Perfect Blue',
    animeGenres: ['예술', '드라마', '공포'],
    animeJapaneseName: 'パーフェクトブルー',
    animeKoreanName: '퍼펙트 블루',
    animeStudios: ['Madhouse'],
    animeRating: 8.51,
  },
  {
    animeId: 38826,
    animeName: 'Tenki no Ko',
    animeGenres: ['드라마', '판타지', '로맨스', '일상물'],
    animeJapaneseName: '天気の子',
    animeKoreanName: '날씨의 아이',
    animeStudios: ['CoMix Wave Films'],
    animeRating: 8.35,
  },
  {
    animeId: 42249,
    animeName: 'Tokyo Revengers',
    animeGenres: ['액션', '드라마', '초능력'],
    animeJapaneseName: '東京リベンジャーズ',
    animeKoreanName: '도쿄 리벤져스',
    animeStudios: ['LIDENFILMS'],
    animeRating: 8.34,
  },
];

const styles: CssKeyObject = {
  content: {
    backgroundColor: 'white',
  },
};

const Contents = () => (
  <div style={styles.content}>
    <ContentSlider title="지금 가장 핫한 애니" datas={datas} />
    <ContentSlider title="당신만을 위한 장르 추천" datas={datas} />
    <ContentSlider title="최애캐, 찾아보시죠!" datas={datas} />
    <ContentSlider title="이 스튜디오를 좋아하는 당신에게..." datas={datas} />
  </div>
);

export default Contents;
