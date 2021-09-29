import React from 'react';
import { Card, Col, Row } from 'antd';
import { CssKeyObject } from '../../../../types/css-basic-type';
import CharacterInfo from '../character-info/character-info';

const styles: CssKeyObject = {
  card: {
    width: '100%',
    borderRadius: '1em',
    marginBottom: '2em',
  },
  character: {
  },
};

const CharacterCard = () => {
  console.log('char');
  return (
    <Card title="캐릭터" bordered={false} style={styles.card}>
      <Row gutter={[16, 16]}>
        <Col style={styles.character} span={12}>
          <CharacterInfo name="나까무라 노자키" seiyu="타나카 마유미" heartCnt="6" />
        </Col>
        <Col style={styles.character} span={12}>
          <CharacterInfo name="나까무라 노자키" seiyu="타나카 마유미" heartCnt="6" />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col style={styles.character} span={12}>
          <CharacterInfo name="나까무라 노자키" seiyu="타나카 마유미" heartCnt="6" />

        </Col>
        <Col style={styles.character} span={12}>
          <CharacterInfo name="나까무라 노자키" seiyu="타나카 마유미" heartCnt="6" />

        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col style={styles.character} span={12}>
          <CharacterInfo name="나까무라 노자키" seiyu="타나카 마유미" heartCnt="6" />

        </Col>
        <Col style={styles.character} span={12}>
          <CharacterInfo name="나까무라 노자키" seiyu="타나카 마유미" heartCnt="6" />

        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col style={styles.character} span={12}>
          <CharacterInfo name="나까무라 노자키" seiyu="타나카 마유미" heartCnt="6" />
        </Col>
        <Col style={styles.character} span={12}>
          <CharacterInfo name="나까무라 노자키" seiyu="타나카 마유미" heartCnt="6" />
        </Col>
      </Row>
    </Card>
  );
};

export default CharacterCard;
