import React from 'react';
import { FavoriteAnimeItem, FavoriteCharaItem } from '../../components';
import { CssKeyObject } from '../../types/css-basic-type';
import MyPageType from '../../stores/mypage/model/mypage';

const styles: CssKeyObject = {
  container: {
    position: 'relative',
    backgroundColor: 'white',
    textAlign: 'center',
  },
  contents: {
    margin: '0 auto',
    maxWidth: '60em',
  },
  info: {
    fontSize: '1.5em',
    marginBottom: '3em',
  },
  nickname: {
    fontFamily: 'titleFont',
    color: 'var(--main-color)',
    textAlign: 'left',
  },
  title: {
    fontFamily: 'titleFont',
    color: 'var(--main-color)',
    textAlign: 'left',
    marginLeft: '2em',
    fontSize: '1.2em',
  },
  favoriteItem: {
    height: '10em',
    lineHeight: '10em',
  },
};

const MyFavorite = ({ info }:{info:MyPageType}) => (
  <div style={styles.container}>
    <div style={styles.contents}>
      <p style={styles.info}>
        <span style={styles.nickname}>
          {info.nickname}
        </span>
        님의 취향
      </p>
      <FavoriteAnimeItem title="애니" datas={info.favoriteAnimes} />
      <FavoriteCharaItem title="캐릭터" datas={info.favoriteCharas} />
    </div>
  </div>
);

export default MyFavorite;
