import React from 'react';
import { Input } from 'antd';
import { CssKeyObject } from '../../types/css-basic-type';
import '../../assets/css/color.css';
import { SEARCH_INPUT } from '../../common/string-template/string-template';

const { Search } = Input;

type searchOpen = {
    open: boolean;
};

const styles: CssKeyObject = {
  displayBlock: {
    display: 'block',
    textAlign: 'center',
  },
  displayNone: {
    display: 'none',
  },
  header: {
    backgroundImage: 'linear-gradient(white,var(--background-light))',
    height: '10em',
  },
  searchInput: {
    marginTop: '4em',
    width: '70%',
  },
};

const SearchHeader = ({ open }: searchOpen) => {
  const onSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div style={open ? styles.displayBlock : styles.displayNone}>
      {open && (
        <div style={styles.header}>
          <Search
            placeholder={SEARCH_INPUT}
            style={styles.searchInput}
            enterButton
            onSearch={onSearch}
            size="large"
          />
        </div>
      )}
    </div>
  );
};

export default SearchHeader;
