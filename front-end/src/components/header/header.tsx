import React, { useState } from 'react';
import { Button, Drawer, Layout, Grid } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import LeftMenu from './menus/left-menu';
import RightMenu from './menus/right-menu';
import { CssKeyObject } from '../../models/css-basic-type';
import '../../assets/css/color.css';

const { useBreakpoint } = Grid;

const { Header } = Layout;

const styles: CssKeyObject = {
  position: {
    position: 'fixed',
    zIndex: 20,
    width: '100%',
    paddingLeft: '2em',
    paddingRight: '2em',
    backgroundColor: 'white',
    minWidth: '360px',
  },
  logo: {
    float: 'left',
    fontFamily: 'logoFont',
    color: 'var(--main-color)',
    fontSize: '1.5em',
  },
  leftMenu: {
    float: 'left',
    width: '30em',
    marginLeft: '2em',
  },
  rightMenu: {
    float: 'right',
  },
  drawerOpenBtn: {
    float: 'right',
    width: '2.5em',
    marginTop: '1em',
    marginLeft: '1em',
  },
};

const MainHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const screens = useBreakpoint();

  const toggleDrawer = () => {
    setDrawerOpen((open) => !open);
  };

  return (
    <Header style={styles.position}>
      <span style={styles.logo}>애니츄</span>
      {screens.md ? (
        <div style={styles.leftMenu}>
          <LeftMenu mode="horizontal" />
        </div>
      ) : (
        <Button
          type="primary"
          onClick={toggleDrawer}
          style={styles.drawerOpenBtn}
          icon={<MenuOutlined />}
        />
      )}
      <div style={styles.rightMenu}>
        <RightMenu />
      </div>
      <Drawer
        title="메뉴"
        placement="right"
        onClose={toggleDrawer}
        visible={drawerOpen}
      >
        <LeftMenu mode="vertical" />
      </Drawer>
    </Header>
  );
};

export default MainHeader;
