import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import MyFavorite from './my-favorite';
import MyCover from './my-cover';
import MyProfile from './my-profile';
import { useMyPage } from '../../hooks';
import NotFound from '../error/not-found';

const MyPage = observer(() => {
  const param = useParams<{ id: string }>();
  const myPage = useMyPage();

  useEffect(() => {
    myPage.getUser(param.id);
  }, [param.id, myPage]);

  return (
    <div>
      {myPage.user ? (
        <>
          <MyCover info={myPage.user} />
          <MyProfile info={myPage.user} />
          <MyFavorite info={myPage.user} />
        </>
      ) : (
        <NotFound type="유저 정보" />
      )}
    </div>
  );
});

export default MyPage;
