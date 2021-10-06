import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react';
import Compressor from 'compressorjs';
import { Avatar, Button, Image, Modal, Row } from 'antd';
import { useUser } from 'hooks';
import { CssKeyObject } from 'types/css-basic-type';
import User from 'stores/user/model/user';
import { msg } from 'util/message';
import { config } from 'config/config';
import { SUCCESS_PROFILE_COVER_DELETE } from 'common/string-template/string-template';

type CoverModifyProps = {
  visible: boolean;
  setVisible: (isShow: boolean) => void;
};

const styles: CssKeyObject = {
  coverModifyModal: {
    margin: '0 auto',
    maxWidth: '30em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '1.5em',
    fontFamily: 'logoFont',
    color: 'var(--main-color)',
  },
  uploadBtn: {
    color: 'var(--main-color)',
    marginTop: '1em',
  },
  fileInput: {
    display: 'none',
  },
  btnGroupMargin: {
    marginTop: '3em',
  },
  deleteBtn: {
    marginRight: '1em',
  },
};

const CoverModifyModal = observer(
  ({ visible, setVisible }: CoverModifyProps) => {
    const user = useUser();
    const fileRef = useRef<any>();
    const [cover, setCover] = useState(user.user?.cover);

    const changeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
      const existFile = e.target.files;

      if (!existFile) {
        return;
      }

      const file = existFile[0];
      const fileName: string = file.name;

      new Compressor(file, {
        quality: 0.6,
        success(result) {
          const formData = new FormData();
          const userId: string = user.user!.userId.toString();

          formData.append('file', result, fileName);
          formData.append('userId', userId);

          user.updateCover(formData).then((res) => {
            setCover(res);
          });
        },
        error(error) {
          msg('Error', error.message);
        },
      });
    };

    const uploadBtnClick = () => {
      fileRef.current.click();
    };

    const coverModify = () => {
      user.coverModify(
        new User(
          user.user!.userId,
          user.user!.nickname,
          user.user!.email,
          user.user!.avatar,
          cover!,
          user.user!.gender,
          user.user!.birthday,
        ),
      );

      setVisible(false);
      window.location.href = `/user/${user.user?.userId}`;
    };

    const coverDelete = () => {
      user.deleteCover().then((info) => {
        setCover(info.cover);
      }).catch((error) => msg('Error', error.message));

      msg('Success', SUCCESS_PROFILE_COVER_DELETE);
      setVisible(false);
      window.location.href = `/user/${user.user?.userId}`;
    };

    return (
      <Modal
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        width={600}
        bodyStyle={styles.coverModifyModal}
        footer={null}
      >
        <p style={styles.title}>커버 사진 수정</p>
        <Avatar
          shape="square"
          size={200}
          style={styles.coverPreview}
          src={
            cover && (
              <Image
                src={`${config.img}/user_imgs/${user.user?.userId}/${cover}`}
              />
            )
          }
        >
          {user.user?.nickname[0]}
        </Avatar>
        <Row>
          <Button
            type="dashed"
            size="large"
            onClick={uploadBtnClick}
            style={styles.uploadBtn}
          >
            사진 변경
          </Button>
        </Row>
        <Row style={styles.btnGroupMargin}>
          <Button style={styles.deleteBtn} onClick={coverDelete}>
            삭제
          </Button>
          <Button type="primary" onClick={coverModify}>
            수정
          </Button>
        </Row>
        <input
          type="file"
          onChange={changeCover}
          ref={fileRef}
          style={styles.fileInput}
        />
      </Modal>
    );
  },
);

export default CoverModifyModal;
