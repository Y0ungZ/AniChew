import React from 'react';
import { auth, AuthProvider } from './auth';

const ProviderStores = ({ children } : {children: React.ReactNode }) => (
  <AuthProvider value={auth}>{children}</AuthProvider>
);

export default ProviderStores;
