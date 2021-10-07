import React from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';
import { SEARCH_INPUT } from 'common/string-template/string-template';
import 'assets/css/color.css';
import { observer } from 'mobx-react';
import { useSearch } from 'hooks';

const { Search } = Input;

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

const SearchHeader = observer(() => {
  const history = useHistory();
  const search = useSearch();

  const onSearch = (keyword: string) => {
    search.searchOpen = !search.searchOpen;
    history.push(`/search/${keyword}`);
  };

  return (
    <div style={search.searchOpen ? styles.displayBlock : styles.displayNone}>
      {search.searchOpen && (
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
});

export default SearchHeader;
