import React from 'react';
import { auth, AuthProvider } from './auth';
import { user, UserProvider } from './user';

const ProviderStores = ({ children } : {children: React.ReactNode }) => (
  <UserProvider value={user}>
    <AuthProvider value={auth}>{children}</AuthProvider>
  </UserProvider>
);

export default ProviderStores;
