import React from 'react';
import { Menu } from 'antd';

type MenuModeProps = {
  mode: 'horizontal' | 'vertical' | 'inline';
};

const LeftMenu = ({ mode }:MenuModeProps) => (
  <Menu
    theme="light"
    mode={mode}
    defaultSelectedKeys={['home']}
  >
    <Menu.Item key="home">홈</Menu.Item>
    <Menu.Item key="works">작품들</Menu.Item>
    <Menu.Item key="chara">캐릭터</Menu.Item>
    <Menu.Item key="trend">트렌딩</Menu.Item>
  </Menu>
);

export default LeftMenu;
