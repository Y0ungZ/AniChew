import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react';
import Compressor from 'compressorjs';
import moment from 'moment';
import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  message,
  Modal,
  Select,
} from 'antd';
import { useUser } from 'hooks';
import { CssKeyObject } from 'types/css-basic-type';
import InputValidator from 'util/input-validator';
import User from 'stores/user/model/user';
import { msg } from 'util/message';
import { config } from 'config/config';
import { SUCCESS_PROFILE_AVATAR_DELETE } from 'common/string-template/string-template';

const { Option } = Select;

type ProfileModifyProps = {
  visible: boolean;
  setVisible: (isShow: boolean) => void;
};

const styles: CssKeyObject = {
  profileModifyModal: {
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
  form: {
    textAlign: 'center',
  },
  uploadBtn: {
    marginTop: '1em',
    marginLeft: '1em',
    color: 'var(--main-color)',
  },
  fileInput: {
    display: 'none',
  },
  inputWidth: {
    width: '15em',
  },
};

const dateFormat = 'YYYY-MM-DD';

const ProfileModifyModal = observer(
  ({ visible, setVisible }: ProfileModifyProps) => {
    const user = useUser();
    const inputRef = useRef<any>(null);
    const fileRef = useRef<any>();
    const [avatar, setAvatar] = useState(user.user?.avatar);

    const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
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

          user.updateAvatar(formData).then((res) => {
            setAvatar(res);
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

    const deleteBtnClick = () => {
      user.deleteAvatar().then((info) => {
        setAvatar(info.avatar);
      }).catch((error) => msg('Error', error.message));

      msg('Success', SUCCESS_PROFILE_AVATAR_DELETE);
      setVisible(false);
      window.location.href = `/user/${user.user?.userId}`;
    };

    const profileModify = (values: any) => {
      const { gender, birthday } = values;
      const nickname = inputRef.current.state.value;
      if (!InputValidator.checkNickname(nickname)) {
        message.error('닉네임은 1자 이상, 15자 이하로 설정해주세요.');
        return;
      }

      user.update(
        new User(
          user.user!.userId,
          nickname,
          user.user!.email,
          avatar!,
          user.user!.cover,
          gender,
          moment(birthday).format('YYYY-MM-DD'),
        ),
      );

      inputRef.current.state.value = user.user?.nickname;
      setVisible(false);
      window.location.href = `/user/${user.user?.userId}`;
    };
    return (
      <Modal
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        width={600}
        bodyStyle={styles.profileModifyModal}
        footer={null}
      >
        <p style={styles.title}>프로필 수정</p>
        <Form layout="vertical" style={styles.form} onFinish={profileModify}>
          <Avatar
            size={120}
            src={
              avatar && (
                <Image
                  src={`${config.img}/user_imgs/${user.user!.userId}/${avatar}`}
                />
              )
            }
          >
            {user.user?.nickname[0]}
          </Avatar>

          <Form.Item>
            <Button
              type="dashed"
              onClick={deleteBtnClick}
            >
              사진 삭제
            </Button>
            <Button
              type="dashed"
              onClick={uploadBtnClick}
              style={styles.uploadBtn}
            >
              사진 변경
            </Button>
            <input
              type="file"
              onChange={changeAvatar}
              ref={fileRef}
              style={styles.fileInput}
            />
          </Form.Item>

          <Form.Item>
            <Input style={styles.inputWidth} defaultValue={user.user?.nickname} ref={inputRef} />
          </Form.Item>

          <Form.Item
            name="gender"
            label="성별"
            hasFeedback
            initialValue={user.user?.gender}
            rules={[{ required: true, message: '성별을 선택해주세요!' }]}
          >
            <Select placeholder="성별을 선택해주세요.">
              <Option value="MALE">남성</Option>
              <Option value="FEMALE">여성</Option>
            </Select>
          </Form.Item>

          <Form.Item label="생년월일">
            <Form.Item
              name="birthday"
              noStyle
              hasFeedback
              initialValue={moment(user.user?.birthday, dateFormat)}
              rules={[{ required: true, message: '생년월일을 선택해주세요!' }]}
            >
              <DatePicker style={styles.inputWidth} />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              수정
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  },
);

export default ProfileModifyModal;
