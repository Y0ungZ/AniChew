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
        <ContentSlider title="명작 애니 강추!!!" type="MasterPiece" />
        <ContentSlider title="이런거 어때요?" type="Like" />
        <ContentSlider title="이런게 어울릴 것 같아요~!" type="CF" />
        <ContentSlider title="신작이에요!!" type="New" />
        <ContentSlider title="애니츄 탑골공원에 어서오세요!" type="Anichew" />
      </div>
    );
  }
  return (
    <div style={styles.content}>
      <ContentSlider title="명작 애니 강추!!!" type="MasterPiece" />
      <ContentSlider title="신작이에요!!!" type="New" />
      <ContentSlider title="애니츄 탑골공원에 어서오세요!" type="Anichew" />
    </div>
  );
};

export default Contents;
