import React, { useState, useEffect } from 'react';
import { Button, Rate } from 'antd';
import { CssKeyObject } from '../../../../types/css-basic-type';
import { useAni, useAuth } from '../../../../hooks';
import { msg } from '../../../../util/message';

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
      msg('Error', '로그인을 하셔야 이용할 수 있습니다.');
      return;
    }
    setRate(0);
    ani.reviewFormDisplayState = true;
  };

  const checkRate = (value: number) => {
    if (!isLoggedIn) {
      msg('Error', '로그인을 하셔야 이용할 수 있습니다.');
      return;
    }
    setRate(value);
    if (value === 0) {
      ani.deleteAniScore(id)
        .then()
        .catch((error) => msg('Error', error));
    } else {
      ani.setAniScore(id, value)
        .then()
        .catch((error) => msg('Error', error));
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
