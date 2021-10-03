import React from 'react';
import { auth, AuthProvider } from './auth';
import { user, UserProvider } from './user';
import { ani, AniProvider } from './ani';
import { review, ReviewProvider } from './review';

const nest = (
  children: React.ReactNode,
  component: React.ReactElement,
) => React.cloneElement(component, {}, children);

export type MultiProviderProps = React.PropsWithChildren<{
  providers: React.ReactElement[]
}>

const MultiProvider = ({ children, providers } : MultiProviderProps) => (
  <>
    {providers.reduceRight(nest, children)}
  </>
);

const GlobalProvider = ({ children } : {children: React.ReactNode }) => (
  <MultiProvider
    providers={[
      <AniProvider value={ani} />,
      <UserProvider value={user} />,
      <AuthProvider value={auth} />,
      <ReviewProvider value={review} />,
    ]}
  >
    {children}
  </MultiProvider>
);

export default GlobalProvider;
