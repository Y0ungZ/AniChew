import React, { useEffect, useState } from 'react';
import { Button, Drawer, Layout, Grid } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import LeftMenu from './menus/left-menu';
import RightMenu from './menus/right-menu';
import { CssKeyObject } from '../../models/css-basic-type';
import '../../assets/css/color.css';

const { useBreakpoint } = Grid;

const { Header } = Layout;

const styles: CssKeyObject = {
  staticPosition: {
    position: 'static',
    zIndex: 20,
    width: '100%',
    paddingLeft: '2em',
    paddingRight: '2em',
    backgroundColor: 'white',
    minWidth: '360px',
  },
  fixedPosition: {
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
  const [headerPosition, setHeaderPosition] = useState('static');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const screens = useBreakpoint();

  useEffect(() => {
    const scrollEvent = () => {
      if (window.scrollY >= 50) {
        setHeaderPosition('fixed');
      } else {
        setHeaderPosition('static');
      }
    };
    window.addEventListener('scroll', scrollEvent);
    return () => window.removeEventListener('scroll', scrollEvent);
  });

  const toggleDrawer = () => {
    setDrawerOpen((open) => !open);
  };

  return (
    <Header style={headerPosition === 'static' ? styles.staticPosition : styles.fixedPosition}>
      <span style={styles.logo}>
        애니츄
      </span>
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
