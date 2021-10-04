import React from 'react';
import { BackTop, Button } from 'antd';
import { UpOutlined } from '@ant-design/icons';

const BackTopBtn = () => (
  <BackTop>
    <Button
      type="primary"
      shape="circle"
      icon={<UpOutlined />}
      size="large"
    />
  </BackTop>
);

export default BackTopBtn;
