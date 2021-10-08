import React, { ReactNode } from 'react';
import { Col, Row } from 'antd';

type Props = {
  meta: ReactNode;
};

const CharacterDetailTemplate = ({ meta }: Props) => (
  <div>
    <Row>
      <Col span={24}>{meta}</Col>
    </Row>
  </div>
);

export default CharacterDetailTemplate;
