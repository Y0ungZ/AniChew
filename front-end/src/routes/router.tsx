import React from 'react';
import { Switch } from 'react-router-dom';
import RouteWithSubRoutes from './route-with-sub-routes';
import { RouteType } from './config';

type RouterProps = {
  routes: RouteType[];
};

const Router = ({ routes }: RouterProps) => (
  <Switch>
    {routes &&
      routes.map((route: RouteType) => (
        <RouteWithSubRoutes key={route.path} {...route} />
      ))}
  </Switch>
);

export default Router;
