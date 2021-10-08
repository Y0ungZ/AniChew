import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';
import SearchHeader from './search-header';
import HeaderMenu from './header-menu';
import 'assets/css/color.css';

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
  menu: {
    float: 'right',
  },
};

const MainHeader = () => (
  <div style={styles.position}>
    <Header style={styles.header}>
      <Link to="/">
        <span style={styles.logo}>애니츄</span>
      </Link>
      <div style={styles.menu}>
        <HeaderMenu />
      </div>
    </Header>
    <SearchHeader />
  </div>
);

export default MainHeader;
