import React, { useState } from 'react';
import { Button } from 'antd';
import { BellFilled, SearchOutlined } from '@ant-design/icons';
import LoginModal from '../../modal/login-modal/login-modal';

type toggleSearchProps = {
  toggleSearchHeader: ()=>void;
}

const RightMenu = (props:toggleSearchProps) => {
  const [visible, setVisible] = useState(false);

  const toggleSearchHeader = () => {
    props.toggleSearchHeader();
  };

  return (
    <>
      <Button icon={<SearchOutlined />} type="link" onClick={toggleSearchHeader} />
      <Button icon={<BellFilled />} type="link" />
      <Button type="link" onClick={() => setVisible(true)}>로그인</Button>
      <LoginModal visible={visible} setVisible={setVisible} />
    </>
  );
};

export default RightMenu;
