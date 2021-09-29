import React from 'react';
import { useMyPage } from '../../../hooks';
import { CssKeyObject } from '../../../types/css-basic-type';
import '../../../assets/css/color.css';

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

const MyFavorite = () => {
  const user = useMyPage();
  return (
    <div style={styles.container}>
      <div style={styles.contents}>
        <p style={styles.info}>
          <span style={styles.nickname}>
            {user.user?.nickname}
          </span>
          님의 취향
        </p>
        <div>
          <p style={styles.title}>애니</p>
          <div style={styles.favoriteItem}>아직 좋아하는 컨텐츠가 없습니다.</div>
        </div>
        <div>
          <p style={styles.title}>캐릭터</p>
          <div style={styles.favoriteItem}>아직 좋아하는 컨텐츠가 없습니다.</div>
        </div>
        <div>
          <p style={styles.title}>성우</p>
          <div style={styles.favoriteItem}>아직 좋아하는 컨텐츠가 없습니다.</div>
        </div>
      </div>
    </div>
  );
};

export default MyFavorite;
