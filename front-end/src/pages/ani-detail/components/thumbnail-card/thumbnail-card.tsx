import React from 'react';
import { observer } from 'mobx-react';
import { Button, Card } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { CssKeyObject } from '../../../../types/css-basic-type';
import { useAni } from '../../../../hooks';

const styles: CssKeyObject = {
  card: { width: 240, textAlign: 'center', borderRadius: '1em' },
  cardBody: { padding: '0.5em 1em' },
  cardImg: { borderRadius: '1em 1em 0 0' },
  likeBtn: { backgroundColor: 'inherit', border: 'none', fontSize: '1rem' },
};

const ThumbnailCard = observer(({ id } : { id: string }) => {
  const ani = useAni();

  const handleLike = () => {
    if (ani.favorite) {
      ani.deleteFavoriteAnime(id);
    } else {
      ani.setFavoriteAnime(id);
    }
  };

  return (
    <Card
      style={styles.card}
      bodyStyle={styles.cardBody}
      cover={(
        <img
          style={styles.cardImg}
          alt="example"
          src={`${process.env.REACT_APP_IMAGE_BASE_URL}/anime_imgs/${id}.jpg`}
        />
      )}
    >
      <Button
        onClick={handleLike}
        style={styles.likeBtn}
        icon={ani.favorite ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
      >
        좋아요
      </Button>
    </Card>
  );
});

export default ThumbnailCard;
