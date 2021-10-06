import React from 'react';
import { Card, List } from 'antd';
import { Link } from 'react-router-dom';
import { CssKeyObject } from 'types/css-basic-type';
import { RelatedAni } from 'stores/ani/model/ani';

const styles: CssKeyObject = {
  card: {
    width: '100%',
    borderRadius: '1em',
    marginBottom: '2em',
  },
};

const AnimeSeriesCard = ({ series } : { series: RelatedAni[] }) => (
  <Card title="시리즈" bordered={false} style={styles.card}>
    <List
      dataSource={series}
      renderItem={(item) => (
        <List.Item>
          <Link to={`/anime/${item.id}`}>{item.koreanName}</Link>
        </List.Item>
      )}
    />
  </Card>
);

export default AnimeSeriesCard;
