import React, { useCallback, useState, useEffect } from 'react';
import { toJS } from 'mobx';
import { ResultAni } from 'stores/search/model/search';
import { FullLoading, SearchAniItem } from 'components';
import NotFound from '../error/not-found';

const SearchResultAni = ({ results }: { results: ResultAni[] | undefined }) => {
  const [result, setResult] = useState<ResultAni[]>([]);
  const [datas, setDatas] = useState<ResultAni[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scroll(0, 0);
    let resultData: ResultAni[] | undefined = toJS(results);
    if (resultData?.length) {
      setResult(resultData.slice(0, 20));
      resultData = resultData?.slice(20);
      setDatas(resultData);
      setLoading(false);
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

    if (scrollTop + clientHeight >= scrollHeight && !loading) {
      setLoading(true);
      setResult(result.concat(datas.slice(0, 20)));
      setDatas(datas.slice(20));
      setLoading(false);
    }
  }, [loading, result, datas]);

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll, true);
    return () => window.removeEventListener('scroll', infiniteScroll, true);
  }, [infiniteScroll]);

  return (
    <div>
      {result.length ? (
        result.map((data) => (
          <div key={data.id}>
            <SearchAniItem data={data} />
            {loading && <FullLoading />}
          </div>
        ))
      ) : (
        <NotFound type="검색결과" />
      )}
    </div>
  );
};

export default SearchResultAni;
