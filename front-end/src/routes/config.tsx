import React, { ComponentType, LazyExoticComponent, ReactNode, lazy } from 'react';
import { FullLoading } from '../components';

export type RouteType = {
  path: string;
  exact: boolean;
  fallback: NonNullable<ReactNode> | null;
  component?: LazyExoticComponent<ComponentType<any>>;
  routes?: RouteType[];
  redirect?: string;
  private?: boolean;
}

export const routes: RouteType[] = [
  {
    path: '/',
    exact: true,
    private: false,
    component: lazy(() => import('../pages/home/home')),
    fallback: <FullLoading />,
  },
  {
    path: '/oauth/kakao',
    exact: false,
    private: false,
    component: lazy(() => import('../components/oauth/kakao-oauth-handler/kakao-oauth-handler')),
    fallback: <FullLoading />,
  },
  {
    path: '/cold-start',
    exact: false,
    private: false,
    component: lazy(() => import('../pages/cold-start/cold-start')),
    fallback: <FullLoading />,
    routes: [
      { path: '/cold-start/info-edit',
        exact: false,
        private: false,
        component: lazy(() => import('../pages/cold-start/info-edit')),
        fallback: <FullLoading />,
      },
      { path: '/cold-start/check-anime',
        exact: false,
        private: false,
        component: lazy(() => import('../pages/cold-start/check-anime')),
        fallback: <FullLoading />,
      },
    ],
  },
  {
    path: '/user/:userId',
    exact: true,
    private: false,
    component: lazy(() => import('./my-page-route')),
    fallback: <FullLoading />,
  },
  {
    path: '/anime/:id',
    exact: false,
    private: false,
    component: lazy(() => import('../pages/ani-detail/ani-detail')),
    fallback: <FullLoading />,
  },
];
