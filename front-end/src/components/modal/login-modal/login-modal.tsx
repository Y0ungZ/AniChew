import React from 'react';
import { Typography, Modal } from 'antd';
import KakaoLoginBtn from '../../button/kakao-login-btn/kakao-login-btn';
import { CssKeyObject } from '../../../models/css-basic-type';

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
    fontWeight: 550,
  },
  footer: { fontSize: '0.2rem', marginTop: '6em' },
};

const LoginModal = ({ visible, setVisible }: LoginModalProps) => (
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
      지금 로그인하고 맞춤 애니메이션 추천을 받아보세요! 매일 1,000개 채널의
      콘텐츠가 새 탭에서 펼쳐집니다.
    </Paragraph>
    <KakaoLoginBtn />
    <Paragraph style={styles.footer}>
      로그인은 개인 정보 보호 정책 및 서비스 약관에 동의하는 것을 의미하며,
      서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.
    </Paragraph>
  </Modal>
);

export default LoginModal;
