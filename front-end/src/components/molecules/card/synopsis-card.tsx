import React from 'react';
import { Card, List } from 'antd';
import { observer } from 'mobx-react';
import { CssKeyObject } from 'types/css-basic-type';
import { useAni } from 'hooks';

const styles: CssKeyObject = {
  card: {
    width: '100%',
    borderRadius: '1em',
    marginBottom: '2em',
  },
};

const SynopsisCard = observer(() => {
  const { info } = useAni();
  return (
    <Card title="줄거리" bordered={false} style={styles.card}>
      {info?.synopsis ? <p>{info.synopsis}</p> : <List />}
    </Card>
  );
});

export default SynopsisCard;
