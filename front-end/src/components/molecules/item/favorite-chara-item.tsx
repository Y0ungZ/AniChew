import React from 'react';
import { useHistory } from 'react-router-dom';
import { List } from 'antd';
import { config } from 'config/config';
import { FavoriteCharaType } from 'stores/mypage/model/mypage';
import { CssKeyObject } from 'types/css-basic-type';

type MyFavoriteCharaProps = {
  title: string;
  datas: FavoriteCharaType[] | undefined;
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
    width: '7em',
    height: '10em',
    borderRadius: '1em',
  },
  content: {
    width: '9em',
    cursor: 'pointer',
    margin: '1em 1em',
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
      ) : (
        <List />
      )}
    </div>
  );
};

export default FavoriteCharaItem;
