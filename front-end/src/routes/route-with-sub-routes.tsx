/* eslint-disable no-nested-ternary */
import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useAuth } from 'hooks';
import { RouteType } from './config';

const RouteWithSubRoutes = observer((route: RouteType) => {
  const auth = useAuth();
  const { isLoggedIn } = auth;
  return (
    <Suspense fallback={route.fallback}>
      <Route
        path={route.path}
        render={(props) => (route.redirect ? (
          <Redirect to={route.redirect} />
        ) : route.private ? (
          isLoggedIn ? (
            route.component && (
            <route.component {...props} routes={route.routes} />
            )
          ) : (
            <Redirect to="/" />
          )
        ) : (
          route.component && (
          <route.component {...props} routes={route.routes} />
          )
        ))}
      />
    </Suspense>
  );
});

export default RouteWithSubRoutes;
