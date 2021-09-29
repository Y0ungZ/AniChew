import React from 'react';
import { auth, AuthProvider } from './auth';
import { user, UserProvider } from './user';
import { ani, AniProvider } from './ani';

const ProviderStores = ({ children } : {children: React.ReactNode }) => (
  <AniProvider value={ani}>
    <UserProvider value={user}>
      <AuthProvider value={auth}>{children}</AuthProvider>
    </UserProvider>
  </AniProvider>
);

export default ProviderStores;
