import React from 'react';
import { Button } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { AnimeList } from '../../../../types/anime-list-type';
import { CssKeyObject } from '../../../../models/css-basic-type';
import '../../../../assets/css/color.css';

type ContentItemProps = {
  data: AnimeList,
};

const styles: CssKeyObject = {
  title: {
    fontFamily: 'logoFont',
    color: 'var(--main-color)',
    fontSize: '2em',
    margin: '0',
  },
  synopsis: {
    color: 'white',
    width: '80vw',
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
  },
  detail: {
    color: 'var(--main-color)',
  },
};

const PromotionCarouselItem = (props :ContentItemProps) => (
  <div style={{
    background: `linear-gradient(
      rgba(20, 20, 20, 1) 0%,
      rgba(20, 20, 20, 0.3) 50%,
      rgba(20, 20, 20, 1) 100%
      ),
      url(${process.env.REACT_APP_IMAGE_BASE_URL
      }/anime_imgs/${props.data.animeId}.jpg) center/cover`,
    backgroundSize: 'cover',
    height: '30em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
  >
    <div>
      <span style={styles.title}>
        {props.data.animeKoreanName}
      </span>
      <p style={styles.synopsis}>
        {props.data.animeSynopsis}
      </p>
      <p style={styles.detail}>
        {props.data.animeGenres.map((genre) => (
          <span key={genre}>
            {genre}
            |
          </span>
        ))}
        <span>
          <StarFilled />
          {props.data.animeRating}
        </span>
      </p>
      <Button type="primary" ghost>자세히보기</Button>
    </div>
  </div>
);

export default PromotionCarouselItem;
