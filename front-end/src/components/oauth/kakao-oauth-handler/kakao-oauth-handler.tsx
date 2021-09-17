import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useAuth } from '../../../hooks';
import FullLoading from '../../loading/full-loading';

const KakaoOauthHandler = observer(() => {
  const auth = useAuth();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code == null) {
      console.log('실패');
      return;
    }
    auth.login(code);
  });
  return <FullLoading />;
});

export default KakaoOauthHandler;
