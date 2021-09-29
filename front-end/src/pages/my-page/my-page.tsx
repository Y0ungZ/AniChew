import React from 'react';
import MyFavorite from './components/my-favorite';
import MyCover from './components/my-cover';
import MyProfile from './components/my-profile';

const MyPage = () => (
  <div>
    <MyCover />
    <MyProfile />
    <MyFavorite />
  </div>
);

export default MyPage;
