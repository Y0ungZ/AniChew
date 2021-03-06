import React, { useState } from 'react';
import { Avatar, Button, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProfileModifyModal } from 'components';
import { CssKeyObject } from 'types/css-basic-type';
import MyPageType from 'stores/mypage/model/mypage';
import { config } from 'config/config';

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

const MyProfile = ({ info }: { info: MyPageType }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div style={styles.container}>
      <Avatar
        size={120}
        src={
          info.avatar && (
            <Image
              src={`${config.img}/user_imgs/${info.userid}/${info.avatar}`}
            />
          )
        }
      >
        {info.nickname[0]}
      </Avatar>
      {info.mine && (
        <Button
          style={styles.avatarEditBtn}
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => setVisible(true)}
        />
      )}
      <div style={styles.profile}>
        <span style={styles.nickname}>{info.nickname}</span>
      </div>
      <ProfileModifyModal visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default MyProfile;
