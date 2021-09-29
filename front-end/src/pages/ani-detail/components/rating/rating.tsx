import React, { useState } from 'react';
import { Button, message, Rate } from 'antd';
import { observer } from 'mobx-react';
import { CssKeyObject } from '../../../../models/css-basic-type';
import { mainAxios } from '../../../../libs/axios';
import { useAni, useAuth } from '../../../../hooks';

const error = () => {
  message.error('로그인 하셔야 평점을 매길 수 있습니다.');
};

const styles: CssKeyObject = {
  rate: { paddingLeft: '1em' },
  resetBtn: {
    color: 'whitesmoke',
    backgroundColor: 'inherit',
    fontSize: '1rem',
    border: 'none',
    padding: 0,
    paddingLeft: '1em',
  },
};

const Rating = observer(() => {
  const { aniInfo } = useAni();
  const { isLoggedIn } = useAuth();
  const [rate, setRate] = useState(2);

  const resetRate = () => {
    if (!isLoggedIn) {
      error();
      return;
    }
    setRate(0);
  };

  const checkRate = (value: number) => {
    if (!isLoggedIn) {
      error();
      return;
    }
    setRate(value);
    if (value === 0) {
      mainAxios.delete(`${process.env.REACT_APP_API_DOMAIN_URL}/anime/${aniInfo!.id}/score`);
    } else {
      mainAxios.post(`${process.env.REACT_APP_API_DOMAIN_URL}/anime/${aniInfo!.id}/score`, { score: value });
    }
  };

  return (
    <>
      <Rate
        allowHalf
        allowClear
        value={rate}
        onChange={checkRate}
        style={styles.rate}
      />
      <Button
        onClick={resetRate}
        style={styles.resetBtn}
      >
        &times;
      </Button>
    </>
  );
});

export default Rating;
