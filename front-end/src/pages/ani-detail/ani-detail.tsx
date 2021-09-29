import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useAni } from '../../hooks';
import HeaderSection from './components/header-section/header-section';
import NotFound from '../error/not-found';

const AniDetail = observer(() => {
  const param = useParams<{id: string}>();
  const ani = useAni();

  useEffect(() => {
    ani.getAniDetailInfo(param.id);
  }, [param.id, ani]);

  return (
    <section>
      {ani.aniInfo ? <HeaderSection /> : <NotFound />}
    </section>
  );
});

export default AniDetail;
