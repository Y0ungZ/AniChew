import React from 'react';
import { CssKeyObject } from '../../models/css-basic-type';
import { Spin } from 'antd';

const FullLoading = () => {
  return (
    <div style={styles.container}>
      <Spin size="large" />
    </div>
  );
};

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

export default FullLoading;
