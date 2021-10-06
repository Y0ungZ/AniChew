import React from 'react';
import { observer } from 'mobx-react';
import { Card } from 'antd';
import { TextLikeBtn } from 'components';
import { CssKeyObject } from 'types/css-basic-type';
import { Store } from 'types/common';
import { isAnimation, isCharacter } from 'util/type-check';

const styles: CssKeyObject = {
  card: { width: 240, textAlign: 'center', borderRadius: '1em' },
  cardBody: { padding: '0.5em 1em' },
  cardImg: { borderRadius: '1em 1em 0 0' },
  likeBtn: { backgroundColor: 'inherit', border: 'none', fontSize: '1rem' },
};

function getImgSrc(store: Store, id: string) {
  if (isAnimation(store)) {
    return `${process.env.REACT_APP_IMAGE_BASE_URL}/anime_imgs/${id}.jpg`;
  }
  if (isCharacter(store)) {
    return `${process.env.REACT_APP_IMAGE_BASE_URL}/chara_imgs/${id}.jpg`;
  }
  return '/public/assets/kakao-logo.jpg';
}

const ThumbnailCard = observer(
  ({ id, store }: { id: string; store: Store }) => (
    <Card
      style={styles.card}
      bodyStyle={styles.cardBody}
      cover={
        <img style={styles.cardImg} alt="example" src={getImgSrc(store, id)} />
      }
    >
      <TextLikeBtn store={store} />
    </Card>
  ),
);

export default ThumbnailCard;
