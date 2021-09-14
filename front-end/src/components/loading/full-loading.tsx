import React from 'react';
import { Spin } from 'antd';
import { CssKeyObject } from '../../models/css-basic-type';

const styles: CssKeyObject = {
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.05)',
  },
};

const FullLoading = () => (
  <div style={styles.container}>
    <Spin size="large" />
  </div>
);

export default FullLoading;
