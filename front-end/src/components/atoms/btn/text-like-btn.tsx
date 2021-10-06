import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { CssKeyObject } from 'types/css-basic-type';
import { useAuth } from 'hooks';
import { msg } from 'util/message';
import { REQUIRE_LOGIN } from 'common/string-template/string-template';
import { Store } from 'types/common';

const styles: CssKeyObject = {
  card: { width: 240, textAlign: 'center', borderRadius: '1em' },
  cardBody: { padding: '0.5em 1em' },
  cardImg: { borderRadius: '1em 1em 0 0' },
  likeBtn: { backgroundColor: 'inherit', border: 'none', fontSize: '1rem' },
};

const TextLikeBtn = observer(({ store }: {store: Store}) => {
  const auth = useAuth();
  const handleLike = () => {
    if (!auth.isLoggedIn) {
      msg('Error', REQUIRE_LOGIN);
      return;
    }
    if (store.favorite) {
      store.cancelLike(store.info!.id)
        .then()
        .catch((error) => msg('Error', error.message));
    } else {
      store.like(store.info!.id)
        .then()
        .catch((error) => msg('Error', error.message));
    }
  };

  return (
    <Button
      onClick={handleLike}
      style={styles.likeBtn}
      icon={store.favorite ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
    >
      좋아요
    </Button>
  );
});

export default TextLikeBtn;
