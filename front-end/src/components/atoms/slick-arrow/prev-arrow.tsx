import React from 'react';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { CssKeyObject } from 'types/css-basic-type';

const styles: CssKeyObject = {
  btn: {
    width: '2.5em',
    height: '2.5em',
    position: 'absolute',
    top: '2em',
    left: '0.3em',
    borderRadius: '0.5em',
    opacity: '0.9',
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
      type="primary"
      size="large"
      style={styles.btn}
      icon={<LeftOutlined />}
    />
  </div>
);

export default PrevArrow;
