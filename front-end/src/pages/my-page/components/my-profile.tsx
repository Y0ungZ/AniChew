import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Avatar, Button, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMyPage } from '../../../hooks';
import ProfileModifyModal from './modal/profile-modify-modal';
import { CssKeyObject } from '../../../models/css-basic-type';

const styles: CssKeyObject = {
  container: {
    textAlign: 'center',
    position: 'absolute',
    top: '20em',
    left: '50%',
    transform: 'translate(-50%,0)',
  },
  avatarEditBtn: {
    position: 'absolute',
    top: '6em',
    left: '65%',
    opacity: '0.7',
  },
  profile: {
    marginTop: '1em',
  },
  nickname: {
    fontFamily: 'titleFont',
    fontSize: '1.5em',
  },
};

const MyProfile = observer(() => {
  const user = useMyPage();
  const [visible, setVisible] = useState(false);
  return (
    <div style={styles.container}>
      <Avatar
        size={120}
        src={(
          user.user?.avatar && (
            <Image src={`${process.env.REACT_APP_IMAGE_BASE_URL
            }/user_imgs/${user.user.userid}/${user.user.avatar}`}
            />
          )
        )}
      >
        {user.user?.nickname[0]}
      </Avatar>
      {user.user?.mine && (
        <Button
          style={styles.avatarEditBtn}
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => setVisible(true)}
        />
      )}
      <div style={styles.profile}>
        <span style={styles.nickname}>
          {user.user?.nickname}
        </span>
      </div>
      <ProfileModifyModal visible={visible} setVisible={setVisible} />
    </div>
  );
});

export default MyProfile;
