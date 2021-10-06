import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ResultChara } from 'stores/search/model/search';
import { CssKeyObject } from 'types/css-basic-type';

type ResultItemProps = {
    data: ResultChara
};

const styles: CssKeyObject = {
  item: {
    width: '15em',
    height: '15em',
    margin: '1em 1em',
    border: '1px solid var(--background-light)',
    boxShadow: '1px 1px 1px var(--text-light)',
    borderRadius: '2em',
  },
  img: {
    width: '7em',
    height: '7em',
    borderRadius: '50%',
    objectFit: 'cover',
    marginTop: '2em',
  },
  name: {
    fontFamily: 'titleFont',
    marginTop: '1em',
  },
  divider: {
    height: '0.05em',
    width: '3em',
    marginTop: '1em',
    backgroundColor: 'var(--main-color)',
  },
  hover: {
    width: '15em',
    height: '15em',
    margin: '1em 1em',
    border: '1px solid var(--background-light)',
    boxShadow: '1px 1px 1px var(--text-light)',
    borderRadius: '2em',
    opacity: '0.8',
    transition: '0.5s',
    backgroundColor: 'var(--background-light)',
  },
};

const SearchCharaItem = ({ data }: ResultItemProps) => {
  const history = useHistory();
  const [hover, setHover] = useState<boolean>(false);

  const toggleHover = () => {
    setHover((on) => !on);
  };

  const goToCharaDetail = () => {
    history.push(`/character/${data.id}`);
  };

  return (
    <div
      style={hover ? styles.hover : styles.item}
      aria-hidden
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      onClick={goToCharaDetail}
      onKeyDown={goToCharaDetail}
    >
      <img
        style={styles.img}
        src={`${process.env.REACT_APP_IMAGE_BASE_URL}/chara_imgs/${data.image}.jpg`}
        alt="search result chara"
      />
      <div style={styles.divider} />
      <p style={styles.name}>{data.name}</p>
    </div>

  );
};

export default SearchCharaItem;
