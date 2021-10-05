import { Button } from 'antd';
import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import { CssKeyObject } from '../../../types/css-basic-type';

const styles: CssKeyObject = {
  btn: {
    width: '2.5em',
    height: '2.5em',
    position: 'absolute',
    top: '2em',
    right: '0.3em',
    borderRadius: '0.5em',
    opacity: '0.9',
  },

};

const NextArrow = ({ className, onClick }:any) => (
  <div
    aria-hidden
    className={className}
    onClick={onClick}
    onKeyDown={onClick}
  >
    <Button
      type="primary"
      size="large"
      style={styles.btn}
      icon={<RightOutlined />}
    />
  </div>
);

export default NextArrow;
