import React, { useCallback, useState, useEffect } from 'react';
import { toJS } from 'mobx';
import { ResultChara } from 'stores/search/model/search';
import { SearchCharaItem } from 'components';
import { CssKeyObject } from 'types/css-basic-type';
import NotFound from '../error/not-found';

const styles: CssKeyObject = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
};

const SearchResultChara = ({
  results,
}: {
  results: ResultChara[] | undefined;
}) => {
  const [result, setResult] = useState<ResultChara[]>([]);
  const [datas, setDatas] = useState<ResultChara[]>([]);

  useEffect(() => {
    window.scroll(0, 0);
    let resultData: ResultChara[] | undefined = toJS(results);
    if (resultData?.length) {
      setResult(resultData.slice(0, 20));
      resultData = resultData?.slice(20);
      setDatas(resultData);
    } else {
      setResult([]);
      setDatas([]);
    }
  }, [results]);

  const infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    );
    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop,
    );

    const { clientHeight } = document.documentElement;
    scrollHeight -= 100;

    if (scrollTop + clientHeight >= scrollHeight) {
      setResult(result.concat(datas.slice(0, 20)));
      setDatas(datas.slice(20));
    }
  }, [result, datas]);

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll, true);
    return () => window.removeEventListener('scroll', infiniteScroll, true);
  }, [infiniteScroll]);

  return (
    <div style={styles.container}>
      {result.length ? (
        result.map((data) => (
          <div key={data.id}>
            <SearchCharaItem data={data} />
          </div>
        ))
      ) : (
        <NotFound type="검색결과" />
      )}
    </div>
  );
};

export default SearchResultChara;
