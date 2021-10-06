import React from 'react';
import { useHistory } from 'react-router-dom';
import { FavoriteAnimeType } from 'stores/mypage/model/mypage';
import { CssKeyObject } from 'types/css-basic-type';
import { config } from 'config/config';

type MyFavoriteAnimeProps = {
  title: string;
  datas: FavoriteAnimeType[] | undefined;
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
    width: '7em',
    height: '9em',
  },
  content: {
    width: '10em',
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

const FavoriteAnimeItem = ({ title, datas }: MyFavoriteAnimeProps) => {
  const history = useHistory();

  const goToAniDetail = (id:number) => {
    history.push(`/anime/${id}`);
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
                src={`${config.img}/anime_imgs/${data.id}.jpg`}
                alt="favorite anime"
                onClick={() => goToAniDetail(data.id)}
                onKeyDown={() => goToAniDetail(data.id)}
              />
              <p style={styles.name}>
                {data.koreanName}
              </p>
            </div>
          ))}
        </div>
      ) : (<div style={styles.favoriteEmptyItem}>아직 좋아하는 컨텐츠가 없습니다.</div>)}
    </div>
  );
};

export default FavoriteAnimeItem;
