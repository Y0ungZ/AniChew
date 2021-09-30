import React from 'react';
import { Ani } from '../../../../stores/ani/model/ani';
import { CssKeyObject } from '../../../../types/css-basic-type';
import CharacterCard from '../cards/character-card';
import RateChartCard from '../cards/rate-chart-card';
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

const MainRightSection = ({ info } : { info: Ani }) => (
  <section style={stlyes.container}>
    <SynopsisCard />
    <CharacterCard />
    <ReviewSliderCard reviews={info.reviews} />
    <RateChartCard scores={info.scoreList} />
  </section>
);

export default MainRightSection;
