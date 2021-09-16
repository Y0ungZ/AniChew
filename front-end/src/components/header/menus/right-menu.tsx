import React from 'react';
import { Button } from 'antd';
import { BellFilled, SearchOutlined } from '@ant-design/icons';

const RightMenu = () => (
  <>
    <Button icon={<SearchOutlined />} type="link" />
    <Button icon={<BellFilled />} type="link" />
    <Button type="link">로그인</Button>
  </>
);

export default RightMenu;
