import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Row, Typography } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { mainAxios } from 'libs/axios';
import { CssKeyObject } from 'types/css-basic-type';
import AnimeCardWithRate from './components/anime-card-with-rate/anime-card-with-rate';
import 'assets/css/color.css';

const { Text } = Typography;

const styles: CssKeyObject = {
  container: {
    maxWidth: '65em',
    minWidth: '65em',
    margin: '0 auto',
    backgroundColor: 'white',
  },
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

type AniType = {
  id: string;
  title: string;
}

const CheckAnime = () => {
  const history = useHistory();
  const [recommendAniList, setRecommendAniList] = useState<AniType[]>();

  const finishColdStartSetup = () => {
    history.push('/');
  };

  useEffect(() => {
    mainAxios.get(`${process.env.REACT_APP_API_DOMAIN_URL}/recommend/start`) //
      .then((res) => {
        setRecommendAniList(res.data.slice(0, 20));
      });
  }, []);

  return (
    <section style={styles.container}>
      <Header style={styles.header}>
        <Text style={styles.title}>시청한 애니메이션을 평가해주실 수 있나요~!?</Text>
      </Header>
      <div style={styles.animeContainer}>
        <Row gutter={[16, 32]}>
          {recommendAniList && recommendAniList.map(({ id }) => (
            <Col span={6} key={id}>
              <AnimeCardWithRate id={id} />
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
