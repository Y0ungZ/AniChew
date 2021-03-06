import React, { ReactNode } from 'react';
import { Col, Row, Grid } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';

const { useBreakpoint } = Grid;

type Props = {
  meta: ReactNode;
  info: ReactNode;
  series: ReactNode;
  goods: ReactNode;
  reviewForm: ReactNode;
  syno: ReactNode;
  char: ReactNode;
  reviewList: ReactNode;
  rateChart: ReactNode;
  similar: ReactNode
};

const styles: CssKeyObject = {
  container: {
    width: '95%',
    margin: '0 auto',
  },
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
  goods: {
    margin: '1em 0em',
  },
};

const AniDetailTemplate = ({
  meta,
  info,
  series,
  goods,
  reviewForm,
  syno,
  char,
  reviewList,
  rateChart,
  similar,
}: Props) => {
  const { xs } = useBreakpoint();
  if (xs) {
    return (
      <div style={styles.container}>
        <Row>
          <Col span={24}>{meta}</Col>
        </Row>
        <Row style={styles.goods}>
          <Col span={24}>{goods}</Col>
        </Row>
        <Row>
          <Col span={24}>{reviewForm}</Col>
        </Row>
        <Row>
          <Col span={24}>{info}</Col>
        </Row>
        <Row>
          <Col span={24}>{series}</Col>
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
        <Row>
          <Col span={24}>{similar}</Col>
        </Row>
      </div>
    );
  }
  return (
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
          <Row>
            <Col span={24}>{goods}</Col>
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
          <Row>
            <Col span={24}>{similar}</Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AniDetailTemplate;
