import React from 'react';
import { Tag } from 'antd';
import { FavoriteSeiyuType } from '../../../stores/mypage/model/mypage';
import { CssKeyObject } from '../../../types/css-basic-type';

type MyFavoriteSeiyuProps = {
    title: string;
    datas: FavoriteSeiyuType[] | undefined;
}

const styles: CssKeyObject = {
  container: {
    marginLeft: '1em',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: '10em',
  },
  title: {
    fontFamily: 'titleFont',
    color: 'var(--main-color)',
    textAlign: 'left',
    marginLeft: '2em',
    fontSize: '1.2em',
  },
  favoriteEmptyItem: {
    height: '10em',
    lineHeight: '10em',
  },
  tag: {
    width: '10em',
    height: '2em',
    margin: '0.5em 1em',
  },
};

const FavoriteSeiyuItem = ({ title, datas }: MyFavoriteSeiyuProps) => (
  <div style={styles.section}>
    <p style={styles.title}>{title}</p>
    {datas?.length ? (
      <div style={styles.container}>
        {datas.map((data) => (
          <Tag style={styles.tag} color="gold" key={data.id}>{data.name}</Tag>
        ))}
      </div>
    ) : (<div style={styles.favoriteEmptyItem}>아직 좋아하는 컨텐츠가 없습니다.</div>)}
  </div>

);

export default FavoriteSeiyuItem;
