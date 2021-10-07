import React, { useEffect } from 'react';
import './app.css';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { msg } from 'util/message';
import { mainAxios } from 'config/axios';
import axios from 'axios';
import { ALERT_LOGOUT } from 'common/string-template/string-template';
import { routes } from './routes/config';
import Router from './routes/router';
import MainHeader from './components/header/header';
import { useAuth, useUser } from './hooks';
import { CssKeyObject } from './types/css-basic-type';
import { BackTopBtn } from './components';

const styles: CssKeyObject = {
  marginSpace: {
    height: '4em',
  },
};

const App = () => {
  const auth = useAuth();
  const user = useUser();
  useEffect(() => {
    if (localStorage.getItem('user')) {
      auth.isLoggedIn = true;
      user
        .me()
        .then()
        .catch((error) => msg('Error', error.message));
    }
  });

  mainAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const {
        config,
        response: { status, data },
      } = error;

      if (status === 401) {
        auth
          .logout()
          .then(() => {
            msg('Info', ALERT_LOGOUT);
          })
          .catch((err) => msg('Error', err.message));
      } else if (status === 403 && data === 'access token refresh') {
        const originalRequest = config;
        return axios(originalRequest);
      }

      return Promise.reject(error);
    },
  );

  return (
    <Layout>
      <BrowserRouter>
        <MainHeader />
        <div style={styles.marginSpace} />
        <Router routes={routes} />
        <BackTopBtn />
      </BrowserRouter>
    </Layout>
  );
};

export default App;
