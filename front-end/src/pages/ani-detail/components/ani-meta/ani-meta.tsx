import React from 'react';
import { Typography } from 'antd';
import { CssKeyObject } from '../../../../types/css-basic-type';
import { Ani, AniRateDict, AniStatusDict } from '../../../../stores/ani/model/ani';

const { Title, Text } = Typography;
const styles: CssKeyObject = {
  metaData: {
    color: '#b2b2b2',
  },
  title: {
    marginTop: '0',
    color: 'whitesmoke',
  },
  jenre: {
    color: 'whitesmoke',
    fontSize: '1.2rem',
  },
  estimatedRating: {
    color: '#ff9999',
    fontSize: '1.2rem',
  },
  realRating: {
    color: '#b2b2b2',
    fontSize: '1.2rem',
    marginLeft: '1em',
  },
};

const AniMeta = ({ info } : { info: Ani }) => (
  <>
    <Text style={styles.metaData}>
      {info.type}
      {' '}
      |
      {' '}
      {AniRateDict[info.rate]}
      {' '}
      |
      {' '}
      {AniStatusDict[info.status]}
    </Text>
    <Title style={styles.title}>{info.koreanName}</Title>
    <Text style={styles.jenre}>액션 / 소년</Text>
    <section>
      <Text style={styles.estimatedRating}>예상 ☆ 4.2</Text>
      <Text style={styles.realRating}>평점 ☆ 4.1</Text>
    </section>
  </>
);

export default AniMeta;
