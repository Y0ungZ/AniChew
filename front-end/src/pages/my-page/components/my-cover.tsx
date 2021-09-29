import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { useMyPage } from '../../../hooks';
import { CssKeyObject } from '../../../types/css-basic-type';
import CoverModifyModal from './modal/cover-modify-modal';
import '../../../assets/css/color.css';

const styles: CssKeyObject = {
  container: {
    height: '30em',
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

const MyCover = observer(() => {
  const user = useMyPage();
  const [visible, setVisible] = useState(false);
  return (
    <div style={styles.container}>
      <div style={{
        background: `url(${process.env.REACT_APP_IMAGE_BASE_URL}/user_imgs/${user.user?.userid}/${user.user?.cover}) center/cover`,
        height: '20em',
      }}
      >
        {user.user?.mine && (
          <Button style={styles.editHeaderBtn} icon={<EditFilled />} shape="round" onClick={() => setVisible(true)} />
        )}
      </div>
      <div style={styles.headerMargin} />
      <CoverModifyModal visible={visible} setVisible={setVisible} />
    </div>
  );
});

export default MyCover;
