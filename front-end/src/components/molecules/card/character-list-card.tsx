import React from 'react';
import { Card, Col, Row, Avatar } from 'antd';
import Text from 'antd/lib/typography/Text';
import { CssKeyObject } from '../../../types/css-basic-type';

const styles: CssKeyObject = {
  card: {
    width: '100%',
    borderRadius: '1em',
    marginBottom: '2em',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  metaData: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '2em',
  },
};

const CharacterInfo = ({
  name,
  seiyu,
  heartCnt,
}: {
  name: string;
  seiyu: string;
  heartCnt: string;
}) => (
  <section style={styles.container}>
    <Avatar shape="square" size="large" />
    <div style={styles.metaData}>
      <Text strong>{name}</Text>
      <Text>{seiyu}</Text>
      <Text>
        {heartCnt}
        명
      </Text>
    </div>
  </section>
);

const CharacterListCard = () => (
  <Card title="캐릭터" bordered={false} style={styles.card}>
    <Row gutter={[16, 16]}>
      <Col style={styles.character} span={12}>
        <CharacterInfo
          name="나까무라 노자키"
          seiyu="타나카 마유미"
          heartCnt="6"
        />
      </Col>
      <Col style={styles.character} span={12}>
        <CharacterInfo
          name="나까무라 노자키"
          seiyu="타나카 마유미"
          heartCnt="6"
        />
      </Col>
    </Row>
    <Row gutter={[16, 16]}>
      <Col style={styles.character} span={12}>
        <CharacterInfo
          name="나까무라 노자키"
          seiyu="타나카 마유미"
          heartCnt="6"
        />
      </Col>
      <Col style={styles.character} span={12}>
        <CharacterInfo
          name="나까무라 노자키"
          seiyu="타나카 마유미"
          heartCnt="6"
        />
      </Col>
    </Row>
    <Row gutter={[16, 16]}>
      <Col style={styles.character} span={12}>
        <CharacterInfo
          name="나까무라 노자키"
          seiyu="타나카 마유미"
          heartCnt="6"
        />
      </Col>
      <Col style={styles.character} span={12}>
        <CharacterInfo
          name="나까무라 노자키"
          seiyu="타나카 마유미"
          heartCnt="6"
        />
      </Col>
    </Row>
    <Row gutter={[16, 16]}>
      <Col style={styles.character} span={12}>
        <CharacterInfo
          name="나까무라 노자키"
          seiyu="타나카 마유미"
          heartCnt="6"
        />
      </Col>
      <Col style={styles.character} span={12}>
        <CharacterInfo
          name="나까무라 노자키"
          seiyu="타나카 마유미"
          heartCnt="6"
        />
      </Col>
    </Row>
  </Card>
);

export default CharacterListCard;
