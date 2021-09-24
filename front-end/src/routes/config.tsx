import React, { ComponentType, LazyExoticComponent, ReactNode, lazy } from 'react';
import FullLoading from '../components/loading/full-loading';

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
  // {
  //   path: '/',
  //   exact: true,
  //   private: false,
  //   component: lazy(() => import('../pages/home/home')),
  //   fallback: <FullLoading />,
  // },
  {
    path: '/oauth/kakao',
    exact: false,
    private: false,
    component: lazy(() => import('../components/oauth/kakao-oauth-handler/kakao-oauth-handler')),
    fallback: <FullLoading />,
  },
];
