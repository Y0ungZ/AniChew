import React from 'react';
import { CssKeyObject } from '../../../../models/css-basic-type';
import AnimeInfoCard from '../cards/anime-info-card';
import GoodsInfoCard from '../cards/goods-info-card';

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

const MainLeftSection = () => (
  <section style={styles.container}>
    <AnimeInfoCard />
    <GoodsInfoCard />
  </section>
);

export default MainLeftSection;
