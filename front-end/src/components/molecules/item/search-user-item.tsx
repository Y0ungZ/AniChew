import React, { useState } from 'react';
import { Avatar } from 'antd';
import { useHistory } from 'react-router-dom';
import { ResultUser } from 'stores/search/model/search';
import { CssKeyObject } from 'types/css-basic-type';
import { config } from 'config/config';

type ResultItemProps = {
  data: ResultUser
};

const styles: CssKeyObject = {
  item: {
    display: 'flex',
    width: '22em',
    height: '10em',
    margin: '1em 1em',
    border: '1px solid var(--background-light)',
    boxShadow: '1px 1px 1px var(--text-light)',
    borderRadius: '2em',
  },
  avatar: {
    marginLeft: '1em',
    marginTop: '1em',
  },
  divider: {
    display: 'inline',
    height: '0.05em',
    width: '4em',
    marginTop: '1em',
    backgroundColor: 'var(--main-color)',
  },
  name: {
    fontFamily: 'titleFont',
    marginLeft: '1em',
    lineHeight: '10em',
  },
  hover: {
    backgroundColor: 'var(--background-light)',
    display: 'flex',
    width: '22em',
    height: '10em',
    margin: '1em 1em',
    border: '1px solid var(--background-light)',
    boxShadow: '1px 1px 1px var(--text-light)',
    borderRadius: '2em',
    opacity: '0.9',
    transition: '0.5s',
  },
};

const SearchUserItem = ({ data }: ResultItemProps) => {
  const history = useHistory();
  const [hover, setHover] = useState<boolean>(false);

  const toggleHover = () => {
    setHover((on) => !on);
  };

  const goToUserDetail = () => {
    history.push(`/user/${data.id}`);
  };

  return (
    <div
      style={hover ? styles.hover : styles.item}
      aria-hidden
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      onClick={goToUserDetail}
      onKeyDown={goToUserDetail}
    >
      <Avatar
        size={100}
        style={styles.avatar}
        src={(
          data.image && (
            <img
              src={`${config.img}/user_imgs/${data.id}/${data.image}`}
              alt="search result user"
            />
          )
        )}
      >
        {data.name[0]}
      </Avatar>
      <p style={styles.name}>{data.name}</p>
    </div>
  );
};

export default SearchUserItem;
