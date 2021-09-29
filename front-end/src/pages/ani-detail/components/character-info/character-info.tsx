import React from 'react';
import { Avatar } from 'antd';
import Text from 'antd/lib/typography/Text';
import { CssKeyObject } from '../../../../types/css-basic-type';

type CharacterInfoProps = {
    name: string;
    seiyu: string;
    heartCnt: string;
}

const styles: CssKeyObject = {
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

const CharacterInfo = ({ name, seiyu, heartCnt }: CharacterInfoProps) => (
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

export default CharacterInfo;
