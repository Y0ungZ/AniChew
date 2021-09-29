import React from 'react';
import { CssKeyObject } from '../../../../models/css-basic-type';
import MainLeftSection from '../main-left-section/main-left-section';
import MainRightSection from '../main-right-section/main-right-section';

const styles: CssKeyObject = {
  container: {
    marginTop: '1em',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
    maxWidth: '60em',
    minWidth: '60em',
  },
};

const MainSection = () => (
  <section style={styles.container}>
    <section style={styles.content}>
      <MainLeftSection />
      <MainRightSection />
    </section>
  </section>
);

export default MainSection;
