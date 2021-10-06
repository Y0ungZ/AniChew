import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { Menu } from 'antd';
import { useSearch } from 'hooks';
import { CssKeyObject } from 'types/css-basic-type';
import { msg } from 'util/message';
import SearchResultAni from './search-result-ani';
import SearchResultChara from './search-result-chara';
import SearchResultUser from './search-result-user';

const styles: CssKeyObject = {
  container: {
    position: 'relative',
    backgroundColor: 'white',
    textAlign: 'center',
    minHeight: '90vh',
  },
  title: {
    fontFamily: 'logoFont',
    color: 'var(--main-color)',
    fontSize: '2em',
    marginTop: '6em',
  },
  keyword: {
    color: 'var(--text-dark)',
  },
  menu: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
};

const Search = observer(() => {
  const param = useParams<{ keyword: string }>();
  const search = useSearch();
  const [selectedMenuItem, setSelectedMenuItem] = useState(['anime']);

  const handleMenuItem = (e: any) => {
    setSelectedMenuItem([e.key]);
  };

  useEffect(() => {
    search.getSearchAnimeResult(param.keyword).catch((error) => {
      msg('Error', error.message);
    });
    search.getSearchCharaResult(param.keyword).catch((error) => {
      msg('Error', error.message);
    });
    search.getSearchUserResult(param.keyword).catch((error) => {
      msg('Error', error.message);
    });
  }, [param.keyword, search]);

  const componentSwitch = (key: string) => {
    switch (key) {
      case 'anime':
        return <SearchResultAni results={search.searchAniResult} />;
      case 'chara':
        return <SearchResultChara results={search.searchCharaResult} />;
      case 'user':
        return <SearchResultUser results={search.searchUserResult} />;
      default:
        return <></>;
    }
  };

  return (
    <div style={styles.container}>
      <p style={styles.title}>
        &quot;
        <span style={styles.keyword}>{param.keyword}</span>
        &quot; 검색결과
      </p>
      <Menu
        mode="horizontal"
        selectedKeys={selectedMenuItem}
        onClick={handleMenuItem}
        style={styles.menu}
      >
        <Menu.Item key="anime">애니</Menu.Item>
        <Menu.Item key="chara">캐릭터</Menu.Item>
        <Menu.Item key="user">유저</Menu.Item>
      </Menu>
      <div>{componentSwitch(selectedMenuItem[0])}</div>
    </div>
  );
});

export default Search;
