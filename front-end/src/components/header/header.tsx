import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Drawer, Layout, Grid } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { CssKeyObject } from 'types/css-basic-type';
import LeftMenu from './menus/left-menu';
import RightMenu from './menus/right-menu';
import SearchHeader from './search-header';
import 'assets/css/color.css';

const { useBreakpoint } = Grid;

const { Header } = Layout;

const styles: CssKeyObject = {
  position: {
    position: 'fixed',
    zIndex: 20,
    width: '100%',
    minWidth: '360px',
  },
  header: {
    backgroundColor: 'white',
    paddingLeft: '2em',
    paddingRight: '2em',
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
  const [searchOpen, setSearchOpen] = useState(false);
  const screens = useBreakpoint();

  const toggleDrawer = () => {
    setDrawerOpen((open) => !open);
  };

  const toggleSearchHeader = () => {
    setSearchOpen((open) => !open);
  };

  return (
    <div style={styles.position}>
      <Header style={styles.header}>
        <Link to="/">
          <span style={styles.logo}>애니츄</span>
        </Link>
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
          <RightMenu toggleSearchHeader={toggleSearchHeader} />
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
      <SearchHeader open={searchOpen} />
    </div>
  );
};

export default MainHeader;
