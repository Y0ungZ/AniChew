import React, { useState } from 'react';
import { Button } from 'antd';
import { BellFilled, SearchOutlined } from '@ant-design/icons';
import LoginModal from '../../modal/login-modal/login-modal';

const RightMenu = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button icon={<SearchOutlined />} type="link" />
      <Button icon={<BellFilled />} type="link" />
      <Button type="link" onClick={() => setVisible(true)}>로그인</Button>
      <LoginModal visible={visible} setVisible={setVisible} />
    </>
  );
};

export default RightMenu;
