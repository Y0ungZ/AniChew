import React from 'react';
import { CssKeyObject } from 'types/css-basic-type';
import ContentSlider from './slider/content-slider';

const datas = [
  {
    id: 19,
    name: 'dummy',
    koreanName: '몬스터',
  },
  {
    id: 1,
    name: 'dummy',
    koreanName: '카우보이 비밥',
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
