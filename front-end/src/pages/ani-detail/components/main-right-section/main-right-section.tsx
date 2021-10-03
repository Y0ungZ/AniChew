import React from 'react';
import { observer } from 'mobx-react';
import { useReview } from '../../../../hooks';
import { Ani } from '../../../../stores/ani/model/ani';
import { CssKeyObject } from '../../../../types/css-basic-type';
import CharacterCard from '../cards/character-card';
import RateChartCard from '../cards/rate-chart-card';
import ReviewWriteFormCard from '../cards/review-form-card';
import SynopsisCard from '../cards/synopsis-card';
import ReviewSliderCard from '../cards/review-slider-card';

const stlyes: CssKeyObject = {
  container: {
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    padding: '1em',
  },
};

const MainRightSection = observer(({ info } : { info: Ani }) => {
  const { reviewFormDisplayState } = useReview();
  return (
    <section style={stlyes.container}>
      {reviewFormDisplayState && <ReviewWriteFormCard id={info.id} />}
      <SynopsisCard />
      <CharacterCard />
      <ReviewSliderCard />
      <RateChartCard scores={info.scoreList} />
    </section>
  );
});

export default MainRightSection;
