import React, { useEffect, useState } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useMyPage } from '../hooks';
import NotUserExist from '../pages/error/not-user-exist';
import MyPage from '../pages/my-page/my-page';
import MyPageType from '../stores/mypage/model/mypage';

type MatchObject = {
    [userId: string]: any;
}

const MyPageRoute = observer((route:RouteComponentProps) => {
  const user = useMyPage();
  const matchParams: MatchObject = route.match.params;
  const [userInfo, setUserInfo] = useState<MyPageType>();

  useEffect(() => {
    user.getUser(matchParams.userId).then((info) => {
      setUserInfo(info);
    });
  }, [matchParams.userId, user]);

  return (
    <Route
      render={() => (userInfo ? (
        <MyPage />
      ) : (<NotUserExist />))}
    />
  );
});

export default MyPageRoute;
