import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { BellFilled, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../../hooks';
import LoginModal from '../../modal/login-modal/login-modal';

type toggleSearchProps = {
  toggleSearchHeader: ()=>void;
}

const RightMenu = observer((props: toggleSearchProps) => {
  const login = useAuth();
  const [visible, setVisible] = useState(false);

  const toggleSearchHeader = () => {
    props.toggleSearchHeader();
  };

  const logout = () => {
    localStorage.removeItem('token');
    login.logout();
  };

  const menu = (
    <Menu>
      <Menu.Item key="mypage">
        마이페이지
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>로그아웃</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Button icon={<SearchOutlined />} type="link" onClick={toggleSearchHeader} />
      <Button icon={<BellFilled />} type="link" />
      {login.isLoggedIn ? (
        <Dropdown overlay={menu} trigger={['click']}>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      ) : (
        <Button type="link" onClick={() => setVisible(true)}>로그인</Button>
      )}
      <LoginModal visible={visible} setVisible={setVisible} />
    </>
  );
});

export default RightMenu;
