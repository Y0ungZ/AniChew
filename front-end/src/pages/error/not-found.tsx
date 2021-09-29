import React from 'react';
import { CssKeyObject } from '../../types/css-basic-type';

const styles: CssKeyObject = {
  container: {
    width: '100%',
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const NotFound = () => (
  <section style={styles.container}>
    <h1>애니메이션이 존재하지 않습니다!</h1>
  </section>
);

export default NotFound;
