import React from 'react';
import { useAuth } from 'hooks';
import { CssKeyObject } from 'types/css-basic-type';
import ContentSlider from './slider/content-slider';

const styles: CssKeyObject = {
  content: {
    backgroundColor: 'white',
  },
};

const Contents = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return (
      <div style={styles.content}>
        <ContentSlider title="지금 가장 핫한 애니" type="MasterPiece" />
        <ContentSlider
          title="애니츄를 만든 개발자들의 인생작...!!!"
          type="Anichew"
        />
        <ContentSlider title="최근에 이런 것을 좋아하셨네요!!?" type="Like" />
        <ContentSlider title="이런게 어울릴 것 같아요~!" type="CF" />
        <ContentSlider title="신작이에요!!" type="New" />
      </div>
    );
  }
  return (
    <div style={styles.content}>
      <ContentSlider title="지금 가장 핫한 애니" type="MasterPiece" />
      <ContentSlider
        title="애니츄를 만든 개발자들의 인생작...!!!"
        type="Anichew"
      />
      <ContentSlider title="이런게 어울릴 것 같아요~!" type="New" />
    </div>
  );
};

export default Contents;
