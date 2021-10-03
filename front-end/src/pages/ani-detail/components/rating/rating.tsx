import React, { useState, useEffect } from 'react';
import { Button, Rate } from 'antd';
import { CssKeyObject } from '../../../../types/css-basic-type';
import { useAni, useAuth, useReview } from '../../../../hooks';
import { msg } from '../../../../util/message';
import { REQUIRE_LOGIN } from '../../../../common/string-template/string-template';

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
  const review = useReview();

  useEffect(() => {
    setRate(myScore);
  }, [myScore]);

  const resetRate = () => {
    if (!isLoggedIn) {
      msg('Error', REQUIRE_LOGIN);
      return;
    }
    setRate(0);
    review.reviewFormDisplayState = true;
  };

  const checkRate = (value: number) => {
    if (!isLoggedIn) {
      msg('Error', REQUIRE_LOGIN);
      return;
    }
    setRate(value);
    if (value === 0) {
      ani.deleteAniScore(id)
        .then()
        .catch((error) => msg('Error', error.message));
    } else {
      ani.setAniScore(id, value)
        .then(() => { review.reviewFormDisplayState = true; })
        .catch((error) => msg('Error', error.message));
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
