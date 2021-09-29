import React from 'react';
import { Card } from 'antd';
import { observer } from 'mobx-react';
import { CssKeyObject } from '../../../../types/css-basic-type';
import { useAni } from '../../../../hooks';

const styles: CssKeyObject = {
  card: {
    width: '100%',
    borderRadius: '1em',
    marginBottom: '2em',
  },
};

const AnimeInfoCard = observer(() => {
  const { aniInfo } = useAni();
  return (
    <Card title="기본 정보" bordered={false} style={styles.card}>
      <p>
        <strong>에피소드</strong>
        :
        {' '}
        {aniInfo?.episodes}
        편
      </p>
      <p>
        <strong>등급</strong>
        :
        {' '}
        {aniInfo?.rate}
      </p>
    </Card>
  );
});

export default AnimeInfoCard;
