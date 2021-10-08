import React from 'react';
import { List } from 'antd';
import { useHistory } from 'react-router-dom';
import { FavoriteAnimeType } from 'stores/mypage/model/mypage';
import { CssKeyObject } from 'types/css-basic-type';
import { config } from 'config/config';

type MyFavoriteAnimeProps = {
  title: string;
  datas: FavoriteAnimeType[] | undefined;
};

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
    fontSize: '1.5em',
  },
  img: {
    width: '10em',
    height: '13em',
    borderRadius: '1em',
  },
  content: {
    width: '12em',
    cursor: 'pointer',
    margin: '1em 1em',
  },
  name: {
    width: '10em',
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

  const goToAniDetail = (id: number) => {
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
              <p style={styles.name}>{data.koreanName}</p>
            </div>
          ))}
        </div>
      ) : (
        <List />
      )}
    </div>
  );
};

export default FavoriteAnimeItem;
