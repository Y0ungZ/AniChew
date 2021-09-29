import React, { useState } from 'react';
import { Button, Card } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { CssKeyObject } from '../../../../types/css-basic-type';
import { Ani } from '../../../../stores/ani/model/ani';

const styles: CssKeyObject = {
  card: { width: 240, textAlign: 'center', borderRadius: '1em' },
  cardBody: { padding: '0.5em 1em' },
  cardImg: { borderRadius: '1em 1em 0 0' },
  likeBtn: { backgroundColor: 'inherit', border: 'none', fontSize: '1rem' },
};

const ThumbnailCard = ({ info } : { info: Ani }) => {
  const [likeState, setLikeState] = useState(false);
  const handleLike = () => {
    setLikeState(!likeState);
  };

  return (
    <Card
      style={styles.card}
      bodyStyle={styles.cardBody}
      cover={(
        <img
          style={styles.cardImg}
          alt="example"
          src={`${process.env.REACT_APP_IMAGE_BASE_URL}/anime_imgs/${info.id}.jpg`}
        />
      )}
    >
      <Button
        onClick={handleLike}
        style={styles.likeBtn}
        icon={likeState ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
      >
        좋아요
      </Button>
    </Card>
  );
};

export default ThumbnailCard;
