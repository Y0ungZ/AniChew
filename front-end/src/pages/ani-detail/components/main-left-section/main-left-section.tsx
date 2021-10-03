import React from 'react';
import { Ani } from '../../../../stores/ani/model/ani';
import { CssKeyObject } from '../../../../types/css-basic-type';
import AnimeInfoCard from '../cards/anime-info-card';
import AnimeSeriesCard from '../cards/anime-series-card';

const styles: CssKeyObject = {
  container: {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    padding: '1em',
  },
};

const MainLeftSection = ({ info } : { info: Ani }) => (
  <section style={styles.container}>
    <AnimeInfoCard info={info} />
    <AnimeSeriesCard series={info.relatedAnis} />
  </section>
);

export default MainLeftSection;
