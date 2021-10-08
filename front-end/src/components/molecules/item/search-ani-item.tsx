import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ResultAni } from 'stores/search/model/search';
import { CssKeyObject } from 'types/css-basic-type';
import { config } from 'config/config';

type ResultItemProps = {
  data: ResultAni;
};

const styles: CssKeyObject = {
  item: {
    maxWidth: '60em',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '15em',
    cursor: 'pointer',
  },
  img: {
    width: '10em',
    height: '13em',
    borderRadius: '1em',
    marginLeft: '1em',
  },
  name: {
    fontFamily: 'titleFont',
    marginRight: '1em',
  },
  hover: {
    backgroundColor: 'var(--background-light)',
    transition: '0.5s',
    opacity: '0.8',
  },
};

const SearchAniItem = ({ data }: ResultItemProps) => {
  const history = useHistory();
  const [hover, setHover] = useState<boolean>(false);

  const toggleHover = () => {
    setHover((on) => !on);
  };

  const goToAniDetail = () => {
    history.push(`/anime/${data.id}`);
  };

  return (
    <div
      style={hover ? styles.hover : undefined}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div
        aria-hidden
        style={styles.item}
        onClick={goToAniDetail}
        onKeyDown={goToAniDetail}
      >
        <img
          style={styles.img}
          src={`${config.img}/anime_imgs/${data.image}.jpg`}
          alt="search result anime"
        />
        <span style={styles.name}>{data.name}</span>
      </div>
    </div>
  );
};

export default SearchAniItem;
