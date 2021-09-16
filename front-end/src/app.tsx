import React from 'react';
import './app.css';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { routes } from './routes/config';
import Router from './routes/router';
import MainHeader from './components/header/header';

export const user = {
  authenticated: false,
};

const App = () => (
  <Layout>
    <BrowserRouter>
      <MainHeader />
      <Router routes={routes} />
    </BrowserRouter>
  </Layout>
);

export default App;
