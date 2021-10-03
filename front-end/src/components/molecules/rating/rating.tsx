import React, { useState, useEffect } from 'react';
import { Button, Rate } from 'antd';
import { CssKeyObject } from '../../../types/css-basic-type';
import { useAuth, useReview } from '../../../hooks';
import { msg } from '../../../util/message';
import { REQUIRE_LOGIN } from '../../../common/string-template/string-template';
import { Info, Store } from '../../../types/common';

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

const checkisLoggedIn = (isLoggedIn: boolean, callback: any) => {
  if (!isLoggedIn) {
    msg('Error', REQUIRE_LOGIN);
    return;
  }
  callback();
};

const Rating = ({ store, info } : {store: Store, info: Info}) => {
  const [rate, setRate] = useState(info.myScore);
  const { isLoggedIn } = useAuth();
  const review = useReview();

  useEffect(() => {
    setRate(info.myScore);
  }, [info.myScore]);

  const resetRate = () => {
    checkisLoggedIn(isLoggedIn, () => {
      setRate(0);
      review.reviewFormDisplayState = true;
    });
  };

  const checkRate = (value: number) => {
    if (!isLoggedIn) {
      msg('Error', REQUIRE_LOGIN);
      return;
    }
    setRate(value);
    if (value === 0) {
      store.removeScore(info.id)
        .then()
        .catch((error) => msg('Error', error.message));
    } else {
      store.setScore(info.id, value)
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
