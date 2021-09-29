import React from 'react';
import { Card } from 'antd';
import { CssKeyObject } from '../../../../types/css-basic-type';

const styles: CssKeyObject = {
  card: {
    width: '100%',
    borderRadius: '1em',
  },
};

const GoodsInfoCard = () => (
  <Card title="굿즈 정보" bordered={false} style={styles.card}>
    <p>스케치북</p>
    <p>피규어</p>
  </Card>
);

export default GoodsInfoCard;
