import React from 'react';
import { Card } from 'antd';
import moment from 'moment';
import { CssKeyObject } from 'types/css-basic-type';
import { Ani } from 'stores/ani/model/ani';

const styles: CssKeyObject = {
  card: {
    width: '100%',
    borderRadius: '1em',
    marginBottom: '2em',
  },
};

const AnimeInfoCard = ({ info }: { info: Ani }) => (
  <Card title="기본 정보" bordered={false} style={styles.card}>
    <p>
      <strong>에피소드</strong>
      :
      {' '}
      {info.episodes}
      편
    </p>
    <p>
      <strong>등급</strong>
      :
      {' '}
      {info.rate}
    </p>
    <p>
      <strong>분량</strong>
      :
      {' '}
      {info.duration}

    </p>
    <p>
      <strong>방영</strong>
      :
      <br />
      {moment(info.airedStart).format('YYYY-MM-DD')}
      {info.airedEnd === new Date(0) &&
        ` ~ ${moment(info.airedEnd).format('YYYY-MM-DD')}`}
    </p>
  </Card>
);

export default AnimeInfoCard;
