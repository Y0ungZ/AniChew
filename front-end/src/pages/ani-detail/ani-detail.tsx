import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useAni, useAuth, useReview } from '../../hooks';
import AniDetailTemplate from './template';
import AniMetaSection from '../../components/organisms/ani-meta-section/ani-meta-section';
import {
  AnimeSeriesCard,
  AnimeInfoCard,
  SynopsisCard,
  CharacterListCard,
  ReviewSliderCard,
  RateChartCard,
  ReviewFormCard,
} from '../../components';
import NotFound from '../error/not-found';
import { msg } from '../../util/message';

const AniDetail = observer(() => {
  const param = useParams<{ id: string }>();
  const auth = useAuth();
  const ani = useAni();
  const review = useReview();

  useEffect(() => {
    ani
      .getInfo(param.id)
      .then(() => window.scroll(0, 0))
      .catch((error) => msg('Error', error.message));
  }, [ani, param.id]);

  useEffect(() => {
    review
      .getAllReviews(param.id)
      .then()
      .catch((error) => msg('Error', error.message));
  }, [review, param.id]);

  useEffect(() => {
    if (auth.isLoggedIn) {
      review
        .getMyReview(param.id)
        .then()
        .catch((error) => msg('Error', error.message));
    }
  }, [auth, review, param.id]);

  return (
    <section>
      {ani.info ? (
        <>
          <AniDetailTemplate
            meta={<AniMetaSection info={ani.info} store={ani} />}
            info={<AnimeInfoCard info={ani.info} />}
            series={<AnimeSeriesCard series={ani.info.relatedAnis} />}
            reviewForm={
              review.reviewFormDisplayState && (
                <ReviewFormCard id={ani.info.id} />
              )
            }
            syno={<SynopsisCard />}
            char={<CharacterListCard />}
            reviewList={<ReviewSliderCard />}
            rateChart={<RateChartCard scores={ani.info.scoreList} />}
          />
        </>
      ) : <NotFound type="애니메이션 정보" />}

    </section>
  );
});

export default AniDetail;
