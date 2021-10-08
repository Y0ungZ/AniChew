import React from 'react';
import { CssKeyObject } from 'types/css-basic-type';
import { NotFoundType } from 'types/common';

const styles: CssKeyObject = {
  container: {
    height: '90vh',
    lineHeight: '90vh',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'titleFont',
    fontSize: '2em',
    color: 'var(--main-color)',
  },
};

const NotFound = ({ type }: NotFoundType) => (
  <div style={styles.container}>
    <span style={styles.text}>
      {type}
      가 존재하지 않습니다!
    </span>
  </div>
);

export default NotFound;
