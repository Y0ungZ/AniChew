import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import {
  AniMetaSection,
  AnimeSeriesCard,
  AnimeInfoCard,
  SynopsisCard,
  CharacterListCard,
  ReviewSliderCard,
  RateChartCard,
  ReviewFormCard,
} from 'components';
import { useAni, useAuth, useReview } from 'hooks';
import NotFound from 'pages/error/not-found';
import AniDetailTemplate from 'pages/ani-detail/template';
import { msg } from 'util/message';
import GoodsCard from 'components/molecules/card/goods-card';

const AniDetail = observer(() => {
  const param = useParams<{ id: string }>();
  const auth = useAuth();
  const ani = useAni();
  const review = useReview();

  useEffect(() => {
    review.type = 'Animation';
    ani
      .getInfo(param.id)
      .then(() => {
        window.scroll(0, 0);
        if (ani.info!.myScore > 0) review.showForm = true;
      })
      .catch((error) => msg('Error', error.message));
  }, [ani, param.id, review]);

  useEffect(() => {
    ani
      .getCharacterInfo(param.id)
      .then()
      .catch((error) => msg('Error', error.message));
  }, [ani, param.id]);

  useEffect(() => {
    review
      .getAll(param.id)
      .then()
      .catch((error) => msg('Error', error.message));
  }, [review, param.id]);

  useEffect(() => {
    if (auth.isLoggedIn) {
      review
        .getMy(param.id)
        .then()
        .catch((error) => msg('Error', error.message));
    }
  }, [auth, review, param.id]);

  return (
    <section>
      {ani.info ? (
        <AniDetailTemplate
          meta={<AniMetaSection info={ani.info} store={ani} />}
          info={<AnimeInfoCard info={ani.info} />}
          series={<AnimeSeriesCard series={ani.info.relatedAnis} />}
          goods={<GoodsCard />}
          reviewForm={review.showForm && <ReviewFormCard id={ani.info.id} />}
          syno={<SynopsisCard />}
          char={<CharacterListCard />}
          reviewList={<ReviewSliderCard />}
          rateChart={<RateChartCard scores={ani.info.scoreList} />}
        />
      ) : (
        <NotFound type="애니메이션 정보" />
      )}
    </section>
  );
});

export default AniDetail;
