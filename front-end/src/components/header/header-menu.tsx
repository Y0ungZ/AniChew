import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useAuth, useSearch, useUser } from 'hooks';
import { LoginModal } from 'components';
import { config } from 'config/config';
import { CssKeyObject } from 'types/css-basic-type';
import { msg } from 'util/message';

const styles: CssKeyObject = {
  icon: {
    marginRight: '1em',
  },
  pointer: {
    cursor: 'pointer',
  },
};

const HeaderMenu = observer(() => {
  const history = useHistory();
  const auth = useAuth();
  const user = useUser();
  const search = useSearch();
  const [visible, setVisible] = useState(false);

  const toggleSearchHeader = () => {
    search.searchOpen = !search.searchOpen;
  };

  const logout = () => {
    auth
      .logout()
      .then(() => history.push('/'))
      .catch((error) => msg('Error', error.message));
  };

  const menu = (
    <Menu>
      <Menu.Item key="mypage">
        <Link to={`/user/${user.user?.userId}`}>마이페이지</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        로그아웃
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Button
        style={styles.icon}
        icon={<SearchOutlined />}
        type="link"
        onClick={toggleSearchHeader}
      />
      {auth.isLoggedIn ? (
        <Dropdown overlay={menu} trigger={['click']}>
          <Avatar
            style={styles.pointer}
            src={
              user.user?.avatar &&
              `${config.img}/user_imgs/${user.user.userId}/${user.user.avatar}`
            }
          >
            {user.user?.nickname[0]}
          </Avatar>
        </Dropdown>
      ) : (
        <Button type="link" onClick={() => setVisible(true)}>
          로그인
        </Button>
      )}
      <LoginModal visible={visible} setVisible={setVisible} />
    </>
  );
});

export default HeaderMenu;
