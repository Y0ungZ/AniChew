import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Avatar, List, Image } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';
import { useAni } from 'hooks';
import { config } from 'config/config';

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

const CharacterInfo = ({ id, name }: { id: string; name: string }) => (
  <section style={styles.container}>
    <Avatar
      shape="square"
      size="large"
      src={<Image src={`${config.img}/chara_imgs/${id}.jpg`} />}
    />
    <div style={styles.metaData}>
      <Link to={`/character/${id}`}>{name}</Link>
    </div>
  </section>
);

const CharacterListCard = observer(() => {
  const { characterInfo } = useAni();
  return (
    <Card title="캐릭터" bordered={false} style={styles.card}>
      {characterInfo ? (
        <Row gutter={[16, 16]}>
          {characterInfo.map((info) => (
            <Col key={info.id} style={styles.character} span={12}>
              <CharacterInfo
                id={info.id}
                name={info.lastName + info.firstName}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <List />
      )}
    </Card>
  );
});

export default CharacterListCard;
