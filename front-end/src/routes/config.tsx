import { ComponentType, LazyExoticComponent, ReactNode } from 'react';

export type RouteType = {
  path: string;
  exact: boolean;
  fallback: NonNullable<ReactNode> | null;
  component?: LazyExoticComponent<ComponentType<any>>;
  routes?: RouteType[];
  redirect?: string;
  private?: boolean;
}

export const routes: RouteType[] = [];
