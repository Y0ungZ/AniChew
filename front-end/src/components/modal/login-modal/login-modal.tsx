import React, { FormEvent, useRef } from 'react';
import { Typography, Modal } from 'antd';
import { observer } from 'mobx-react';
import KakaoLoginBtn from '../../button/kakao-login-btn/kakao-login-btn';
import { CssKeyObject } from '../../../models/css-basic-type';
import { useAuth } from '../../../hooks';
import { mainAxios } from '../../../libs/axios';

const { Title, Paragraph } = Typography;

type LoginModalProps = {
  visible: boolean;
  setVisible: (isShow: boolean) => void;
};

const styles: CssKeyObject = {
  loginModal: {
    margin: '0 auto',
    maxWidth: '30em',
    height: '25em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  desc: {
    fontSize: '1rem',
    fontWeight: 550,
  },
  footer: { fontSize: '0.8rem', marginTop: '2.5em', color: '#b2b2b2' },
};

const LoginModal = observer(({ visible, setVisible }: LoginModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const auth = useAuth();
  const login = (e: FormEvent<HTMLFormElement>) => {
    // 1913408840
    e.preventDefault();
    const id = inputRef.current!.value;
    mainAxios.get(`/user/test/${id}`).then((res) => {
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem('token', res.data);
        mainAxios.defaults.headers.Authorization = res.data;
        setVisible(false);
        auth.isLoggedIn = true;
      }
    });
  };

  const authme = () => {
    mainAxios.get('/user/me').then((res) => {
      console.log(res);
    });
  };

  return (
    <Modal
      centered
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      width={600}
      bodyStyle={styles.loginModal}
      footer={null}
    >
      <Title style={styles.modalTitle}>시작하기</Title>
      <Paragraph style={styles.desc}>
        지금 로그인하고 맞춤 애니메이션 추천을 받아보세요! 매일 1,000개
        애니메이션이 새 탭에서 펼쳐집니다.
      </Paragraph>
      <KakaoLoginBtn />
      <Paragraph style={styles.footer}>
        로그인은 개인 정보 보호 정책 및 서비스 약관에 동의하는 것을 의미하며,
        서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.
      </Paragraph>
      <form onSubmit={login}>
        <input type="text" ref={inputRef} />
        <button type="submit">로그인</button>
      </form>
      <button type="button" onClick={authme}>auth me</button>
    </Modal>
  );
});

export default LoginModal;
