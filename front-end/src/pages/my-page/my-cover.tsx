import React, { useState } from 'react';
import { Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { CssKeyObject } from 'types/css-basic-type';
import { CoverModifyModal } from 'components';
import MyPageType from 'stores/mypage/model/mypage';

const styles: CssKeyObject = {
  container: {
    height: '30em',
    backgroundColor: 'var(--background-light)',
  },
  editHeaderBtn: {
    position: 'absolute',
    top: '21em',
    right: '2em',
    opacity: '0.7',
    color: 'white',
    backgroundColor: 'transparent',
    backdropFilter: 'blur(5px)',
  },
  headerMargin: {
    backgroundColor: 'white',
    height: '10em',
    textAlign: 'center',
  },
};

const MyCover = ({ info }: { info: MyPageType }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div style={styles.container}>
      <div
        style={{
          background: `url(${process.env.REACT_APP_IMAGE_BASE_URL}/user_imgs/${info.userid}/${info.cover}) center/cover`,
          height: '20em',
        }}
      >
        {info.mine && (
          <Button
            style={styles.editHeaderBtn}
            icon={<EditFilled />}
            shape="round"
            onClick={() => setVisible(true)}
          />
        )}
      </div>
      <div style={styles.headerMargin} />
      <CoverModifyModal visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default MyCover;
