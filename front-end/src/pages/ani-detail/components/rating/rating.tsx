import React, { useState, useEffect } from 'react';
import { Button, message, Rate } from 'antd';
import { CssKeyObject } from '../../../../types/css-basic-type';
import { useAni, useAuth } from '../../../../hooks';

const errorMsg = () => {
  message.error('로그인 하셔야 평점을 매길 수 있습니다.');
};

const styles: CssKeyObject = {
  resetBtn: {
    color: 'whitesmoke',
    backgroundColor: 'inherit',
    fontSize: '1rem',
    border: 'none',
    padding: 0,
    paddingLeft: '1em',
  },
};

const Rating = ({ id, myScore } : {id: string, myScore: number}) => {
  const [rate, setRate] = useState(myScore);
  const { isLoggedIn } = useAuth();
  const ani = useAni();

  useEffect(() => {
    setRate(myScore);
  }, [myScore]);

  const resetRate = () => {
    if (!isLoggedIn) {
      errorMsg();
      return;
    }
    setRate(0);
    ani.reviewFormDisplayState = true;
  };

  const checkRate = (value: number) => {
    if (!isLoggedIn) {
      errorMsg();
      return;
    }
    setRate(value);
    if (value === 0) {
      ani.deleteAniScore(id)
        .then()
        .catch((error) => alert(error));
    } else {
      ani.setAniScore(id, value)
        .then()
        .catch((error) => alert(error));
    }
  };

  return (
    <>
      <Rate
        allowHalf
        allowClear
        value={rate}
        onChange={checkRate}
      />
      <Button
        onClick={resetRate}
        style={styles.resetBtn}
      >
        &times;
      </Button>
    </>
  );
};

export default Rating;
