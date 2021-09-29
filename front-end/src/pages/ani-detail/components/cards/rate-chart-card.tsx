import React from 'react';
import { Card } from 'antd';
import { Column } from '@ant-design/charts';
import { CssKeyObject } from '../../../../types/css-basic-type';

const styles: CssKeyObject = {
  card: {
    width: '100%',
    borderRadius: '1em',
    marginBottom: '2em',
  },
};

const RateChartCard = () => {
  const data = [
    {
      type: '1점',
      value: 15,
    },
    {
      type: '2점',
      value: 30,
    },
    {
      type: '3점',
      value: 88,
    },
    {
      type: '4점',
      value: 200,
    },
    {
      type: '5점',
      value: 300,
    },
  ];
  const paletteSemanticRed = '#F4664A';
  const brandColor = '#5B8FF9';
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    seriesField: '',
    color: function color(_ref: any) {
      const { type } = _ref;
      if (type === '1점' || type === '2점') {
        return paletteSemanticRed;
      }
      return brandColor;
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return (
    <Card title="평점 그래프" bordered={false} style={styles.card}>
      <Column {...config} />
    </Card>
  );
};

export default RateChartCard;
