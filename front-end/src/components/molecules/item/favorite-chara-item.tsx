import React from 'react';
import { useHistory } from 'react-router-dom';
import { config } from 'config/config';
import { FavoriteCharaType } from 'stores/mypage/model/mypage';
import { CssKeyObject } from 'types/css-basic-type';

type MyFavoriteCharaProps = {
  title: string;
  datas: FavoriteCharaType[] | undefined;
}

const styles: CssKeyObject = {
  section: {
    marginBottom: '2em',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
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
  img: {
    width: '5em',
  },
  content: {
    width: '7em',
    cursor: 'pointer',
  },
  name: {
    width: '7em',
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    margin: '0 auto',
  },
};
const FavoriteCharaItem = ({ title, datas }: MyFavoriteCharaProps) => {
  const history = useHistory();

  const goToCharaDetail = (id: number) => {
    history.push(`/character/${id}`);
  };

  return (
    <div style={styles.section}>
      <p style={styles.title}>{title}</p>
      {datas?.length ? (
        <div style={styles.container}>
          {datas.map((data) => (
            <div key={data.id} style={styles.content}>
              <img
                style={styles.img}
                src={`${config.img}/chara_imgs/${data.id}.jpg`}
                alt="favorite chara"
                onClick={() => goToCharaDetail(data.id)}
                onKeyDown={() => goToCharaDetail(data.id)}
              />
              <p style={styles.name}>
                {data.firstName}
                {' '}
                {data.lastName}
              </p>
            </div>
          ))}
        </div>
      ) :
        (<div style={styles.favoriteEmptyItem}>아직 좋아하는 컨텐츠가 없습니다.</div>)}
    </div>
  );
};

export default FavoriteCharaItem;
