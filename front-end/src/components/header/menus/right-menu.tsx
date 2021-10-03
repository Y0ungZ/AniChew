import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { BellFilled, SearchOutlined } from '@ant-design/icons';
import { useAuth, useUser } from '../../../hooks';
import LoginModal from '../../molecules/modal/login-modal';

type toggleSearchProps = {
  toggleSearchHeader: ()=>void;
}

const RightMenu = observer((props: toggleSearchProps) => {
  const history = useHistory();
  const login = useAuth();
  const user = useUser();
  const [visible, setVisible] = useState(false);

  const toggleSearchHeader = () => {
    props.toggleSearchHeader();
  };

  const logout = () => {
    localStorage.removeItem('token');
    login.logout();
    history.push('/');
  };

  const menu = (
    <Menu>
      <Menu.Item key="mypage">
        <Link to={`/user/${user.user?.userId}`}>
          마이페이지
        </Link>
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
          <Avatar
            src={(user.user?.avatar && (
              `${process.env.REACT_APP_IMAGE_BASE_URL}/user_imgs/${user.user.userId}/${user.user.avatar}`
            ))}
          >
            {user.user?.nickname[0]}
          </Avatar>
        </Dropdown>
      ) : (
        <Button type="link" onClick={() => setVisible(true)}>로그인</Button>
      )}
      <LoginModal visible={visible} setVisible={setVisible} />
    </>
  );
});

export default RightMenu;
