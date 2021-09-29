import React from 'react';
import { Card } from 'antd';
import { CssKeyObject } from '../../../../models/css-basic-type';

const styles: CssKeyObject = {
  card: {
    width: '100%',
    borderRadius: '1em',
    marginBottom: '2em',
  },
};

const SynopsisCard = () => {
  console.log('syno');
  return (
    <Card title="줄거리" bordered={false} style={styles.card}>
      <p>
        그날, 인류는 떠올렸다.
        놈들에게 지배당해왔던 공포를...
        새장 속에서 갇혀만 살았었던 굴욕을...
      </p>
    </Card>
  );
};

export default SynopsisCard;
