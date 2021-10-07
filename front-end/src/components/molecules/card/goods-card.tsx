import React from 'react';
import { CssKeyObject } from 'types/css-basic-type';
import { useAni } from 'hooks';
import { Button } from 'antd';
import { mainAxios } from 'config/axios';

const styles: CssKeyObject = {
  card: {
    width: '100%',
    textAlign: 'center',
  },
  subscribedBtn: {
    backgroundColor: 'whitesmoke',
    color: 'grey',
  },
  subscribeBtn: {
    backgroundColor: '#cc0000',
    color: 'whitesmoke',
  },
};

const GoodsCard = () => {
  const ani = useAni();
  const subscribeGoods = () => {
    if (ani.goodsSubscribe) {
      mainAxios.post(`/anime/${ani.info!.id}/alarm`).then(() => {
        ani.goodsSubscribe = !ani.goodsSubscribe;
      });
    } else {
      mainAxios.delete(`/anime/${ani.info!.id}/alarm`).then(() => {
        ani.goodsSubscribe = !ani.goodsSubscribe;
      });
    }
  };

  return (
    <div style={styles.card}>
      {ani.goodsSubscribe ? (
        <Button
          style={styles.subscribeBtn}
          size="large"
          onClick={subscribeGoods}
        >
          굿즈 신상품 알림 신청
        </Button>
      ) : (
        <Button
          style={styles.subscribedBtn}
          size="large"
          onClick={subscribeGoods}
        >
          굿즈 알림 구독중
        </Button>
      )}
    </div>
  );
};

export default GoodsCard;
