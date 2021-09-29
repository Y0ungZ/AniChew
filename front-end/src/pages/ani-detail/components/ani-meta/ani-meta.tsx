import React from 'react';
import { Typography } from 'antd';
import { observer } from 'mobx-react';
import { CssKeyObject } from '../../../../models/css-basic-type';
import { useAni } from '../../../../hooks';
import { AniRateDict, AniStatusDict } from '../../../../stores/ani/model/ani';

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

const AniMeta = observer(() => {
  const { aniInfo } = useAni();
  return (
    <>
      <Text style={styles.metaData}>
        {aniInfo!.type}
        {' '}
        |
        {' '}
        {AniRateDict[aniInfo!.rate]}
        {' '}
        |
        {' '}
        {AniStatusDict[aniInfo!.status]}
      </Text>
      <Title style={styles.title}>{aniInfo!.koreanName}</Title>
      <Text style={styles.jenre}>액션 / 소년</Text>
      <section>
        <Text style={styles.estimatedRating}>예상 ☆ 4.2</Text>
        <Text style={styles.realRating}>평점 ☆ 4.1</Text>
      </section>
    </>
  );
});

export default AniMeta;
