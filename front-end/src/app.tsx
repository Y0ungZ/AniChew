import React from 'react';
import './app.css';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { routes } from './routes/config';
import Router from './routes/router';
import MainHeader from './components/header/header';
import { CssKeyObject } from './models/css-basic-type';

export const user = {
  authenticated: false,
};

const styles: CssKeyObject = {
  routerContainer: {
    marginTop: '4em',
  },
};

const App = () => (
  <Layout>
    <MainHeader />
    <div style={styles.routerContainer}>
      <BrowserRouter>
        <Router routes={routes} />
      </BrowserRouter>
    </div>
  </Layout>
);

export default App;
