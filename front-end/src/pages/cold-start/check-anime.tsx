import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Row, Typography } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { CssKeyObject } from '../../models/css-basic-type';
import AnimeCardWithRate from './components/anime-card-with-rate/anime-card-with-rate';
import '../../assets/css/color.css';

const { Text } = Typography;

const styles: CssKeyObject = {
  header: {
    textAlign: 'center',
    backgroundColor: 'white',
    fontSize: '2rem',
    fontWeight: 'bold',
    padding: '2em 0em 4em 0em',
  },
  title: {
    fontFamily: 'logoFont',
    color: 'var(--main-color)',
  },
  animeContainer: {
    padding: '1em',
    backgroundColor: 'white',
  },
  footer: {
    width: '100%',
    textAlign: 'center',
  },
  btn: {
    position: 'fixed',
    bottom: '2em',
  },
};

const CheckAnime = () => {
  const history = useHistory();

  const finishColdStartSetup = () => {
    history.push('/');
  };

  return (
    <section>
      <Header style={styles.header}>
        <Text style={styles.title}>시청한 애니메이션을 평가해주실 수 있나요~!?</Text>
      </Header>
      <div style={styles.animeContainer}>
        <Row gutter={[16, 32]}>
          {[1, 15, 20, 21, 100, 101, 102, 103, 104].map((animeId) => (
            <Col span={6} key={animeId}>
              <AnimeCardWithRate animeId={animeId} />
            </Col>
          ))}
        </Row>
      </div>
      <footer style={styles.footer}>
        <Button onClick={finishColdStartSetup} style={styles.btn} size="large">
          완료
        </Button>
      </footer>
    </section>
  );
};

export default CheckAnime;
