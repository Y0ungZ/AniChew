import { Button } from 'antd';
import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { CssKeyObject } from '../../../types/css-basic-type';

const styles: CssKeyObject = {
  btn: {
    width: '2.5em',
    height: '2.5em',
    overflow: 'hidden',
    position: 'absolute',
    top: '2em',
    left: '0.3em',
    color: 'white',
    borderRadius: '0.5em',
    backgroundColor: 'var(--text-dark)',
    opacity: '0.6',
  },

};

const PrevArrow = ({ className, onClick }:any) => (
  <div
    aria-hidden
    className={className}
    onClick={onClick}
    onKeyDown={onClick}
  >
    <Button
      size="large"
      style={styles.btn}
      icon={<LeftOutlined />}
    />
  </div>
);

export default PrevArrow;
