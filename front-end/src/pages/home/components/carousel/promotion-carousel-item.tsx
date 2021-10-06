import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';
import 'assets/css/color.css';
import { Ani, AniGenreDict } from 'stores/ani/model/ani';

const styles: CssKeyObject = {
  title: {
    fontFamily: 'logoFont',
    color: 'var(--main-color)',
    fontSize: '2em',
    margin: '0',
  },
  synopsis: {
    color: 'white',
    width: '70vw',
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  detail: {
    marginTop: '2em',
    color: 'var(--main-color)',
  },
};

const PromotionCarouselItem = ({ data }: { data: Ani }) => {
  const history = useHistory();

  const goToAnimeDetail = () => {
    history.push(`/anime/${data.id}`);
  };

  return (
    <div
      style={{
        background: `linear-gradient(
        rgba(20, 20, 20, 0.8) 0%,
        rgba(20, 20, 20, 0.2) 50%,
        rgba(20, 20, 20, 0.8) 100%
        ),
        url(${process.env.REACT_APP_IMAGE_BASE_URL}/promo_imgs/${data.id}.jpg) center/cover`,
        backgroundSize: 'cover',
        height: '30em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <span style={styles.title}>{data.koreanName}</span>
        <p style={styles.synopsis}>{data.synopsis}</p>
        <p style={styles.detail}>
          {data.genres.map((genre) => (
            <span key={genre.id}>
              {AniGenreDict[genre.id]}
              |
            </span>
          ))}
          <span>{data.type}</span>
        </p>
        <Button type="primary" ghost onClick={goToAnimeDetail}>
          자세히보기
        </Button>
      </div>
    </div>
  );
};

export default PromotionCarouselItem;
