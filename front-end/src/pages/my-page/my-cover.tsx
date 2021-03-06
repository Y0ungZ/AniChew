import React, { useState } from 'react';
import { Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { CssKeyObject } from 'types/css-basic-type';
import { CoverModifyModal } from 'components';
import MyPageType from 'stores/mypage/model/mypage';
import { config } from 'config/config';

const styles: CssKeyObject = {
  container: {
    height: '30em',
    backgroundColor: 'var(--background-light)',
  },
  editHeaderBtn: {
    position: 'absolute',
    top: '21em',
    right: '2em',
    opacity: '0.8',
    color: 'white',
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
          background: `url(${config.img}/user_imgs/${info.userid}/${info.cover}) center/cover`,
          height: '20em',
        }}
      >
        {info.mine && (
          <Button
            type="primary"
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
