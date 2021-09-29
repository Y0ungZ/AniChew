import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth, useUser } from '../../../hooks';
import FullLoading from '../../loading/full-loading';

const KakaoOauthHandler = () => {
  const user = useUser();
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code == null) {
      console.log('다시 시도해주세용');
      history.push('/');
    } else {
      auth
        .login(code)
        .then(() => {
          user.me();
          history.push('/');
        })
        .catch((error) => {
          console.log(error);
          alert('다시 시도해주세용');
        });
    }
  }, [auth, user, history]);
  return <FullLoading />;
};

export default KakaoOauthHandler;
