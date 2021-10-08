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
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const prevUrl = url.searchParams.get('state');

    if (code == null) {
      msg('Error', FAIL_LOGIN);
      history.push(`${prevUrl}`);
    } else {
      auth
        .login(code)
        .then((newUser) => {
          if (newUser) {
            history.push('/cold-start');
          } else {
            user.me().then(() => history.push(`${prevUrl}`));
          }
        })
        .catch((error) => msg('Error', error));
    }
  }, [auth, user, history]);
  return <FullLoading />;
};

export default KakaoOauthHandler;
