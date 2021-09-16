import React from 'react';
import './app.css';
import { BrowserRouter } from 'react-router-dom';
import { routes } from './routes/config';
import Router from './routes/router';

export const user = {
  authenticated: false,
};

const App = () => (
  <BrowserRouter>
    <Router routes={routes} />
  </BrowserRouter>
);

export default App;
