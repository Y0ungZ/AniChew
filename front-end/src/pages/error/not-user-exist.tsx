import React from 'react';
import { CssKeyObject } from '../../models/css-basic-type';
import '../../assets/css/color.css';

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

const NotUserExist = () => (
  <div style={styles.container}>
    <span style={styles.text}>
      존재하지 않는 유저입니다.
    </span>
  </div>
);

export default NotUserExist;
