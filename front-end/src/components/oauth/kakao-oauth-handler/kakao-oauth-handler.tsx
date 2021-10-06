import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FAIL_LOGIN } from 'common/string-template/string-template';
import { useAuth, useUser } from 'hooks';
import { msg } from 'util/message';
import { FullLoading } from 'components';

const KakaoOauthHandler = () => {
  const user = useUser();
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code == null) {
      msg('Error', FAIL_LOGIN);
      history.push(history.location.pathname);
    } else {
      auth
        .login(code)
        .then((newUser) => {
          console.log(newUser);
          if (newUser) {
            history.push('/cold-start');
          } else {
            console.log(history.location.pathname);
            user.me().then(() => history.push('/'));
          }
        })
        .catch((error) => msg('Error', error));
    }
  }, [auth, user, history]);
  return <FullLoading />;
};

export default KakaoOauthHandler;
