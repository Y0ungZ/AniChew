import React, { ReactNode } from 'react';
import { Col, Row } from 'antd';
import { CssKeyObject } from '../../../types/css-basic-type';

type Props = {
  meta: ReactNode;
  info: ReactNode;
  series: ReactNode;
  reviewForm: ReactNode;
  syno: ReactNode;
  char: ReactNode;
  reviewList: ReactNode;
  rateChart: ReactNode;
};

const styles: CssKeyObject = {
  main: {
    margin: '2em auto',
    maxWidth: '60em',
    minWidth: '60em',
  },
  left: {
    padding: '1em',
    paddingRight: '5em',
  },
  right: {
    padding: '1em',
  },
};

const AniDetailTemplate = ({
  meta,
  info,
  series,
  reviewForm,
  syno,
  char,
  reviewList,
  rateChart,
}: Props) => (
  <div>
    <Row>
      <Col span={24}>{meta}</Col>
    </Row>
    <Row style={styles.main}>
      <Col span={9} style={styles.left}>
        <Row>
          <Col span={24}>{info}</Col>
        </Row>
        <Row>
          <Col span={24}>{series}</Col>
        </Row>
      </Col>
      <Col span={15} style={styles.right}>
        <Row>
          <Col span={24}>{reviewForm}</Col>
        </Row>
        <Row>
          <Col span={24}>{syno}</Col>
        </Row>
        <Row>
          <Col span={24}>{char}</Col>
        </Row>
        <Row>
          <Col span={24}>{reviewList}</Col>
        </Row>
        <Row>
          <Col span={24}>{rateChart}</Col>
        </Row>
      </Col>
    </Row>
  </div>
);

export default AniDetailTemplate;
