import React from 'react';
import { Button } from 'antd';
import Text from 'antd/lib/typography/Text';
import kakaoLogo from 'assets/img/kakao-logo.jpg';
import { CssKeyObject } from 'types/css-basic-type';
import { config } from 'config/config';

const styles: CssKeyObject = {
  btn: {
    backgroundColor: '#fae300',
    display: 'flex',
    alignItems: 'center',
  },
  loginTitle: {
    marginLeft: '0.2em',
    fontWeight: 'bold',
  },
};

const KakaoLoginBtn = () => {
  const handleKakaoLogin = () => {
    window.location.href = `${config.kakaoAuth}`;
  };

  return (
    <Button
      onClick={handleKakaoLogin}
      shape="round"
      size="large"
      style={styles.btn}
    >
      <img src={kakaoLogo} alt="kakao-logo" width="27px" height="27px" />
      <Text style={styles.loginTitle}>Kakao</Text>
    </Button>
  );
};

export default KakaoLoginBtn;
