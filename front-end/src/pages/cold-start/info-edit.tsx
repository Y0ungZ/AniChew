import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Select, Button, DatePicker } from 'antd';
import moment from 'moment';
import { useUser } from '../../hooks';
import User from '../../stores/user/model/user';
import { CssKeyObject } from '../../models/css-basic-type';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const styles: CssKeyObject = {
  form: {
    paddingTop: '20em',
    width: '100%',
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formItem: {
    width: '20em',
  },
};

const InfoEdit = () => {
  const history = useHistory();
  const user = useUser();

  const onFinish = (values: any) => {
    const { gender, birthday } = values;
    user.update(
      new User(
        user.user!.userId,
        user.user!.nickname,
        user.user!.email,
        user.user!.avatar,
        gender,
        moment(birthday).format('YYYY-MM-DD'),
      ),
    );

    history.push('/cold-start/check-anime');
  };

  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      style={styles.form}
    >
      <Form.Item
        label="성별"
        name="gender"
        hasFeedback
        rules={[{ required: true, message: '성별을 선택해주세요!' }]}
        style={styles.formItem}
      >
        <Select placeholder="성별을 선택해주세요.">
          <Option value="MALE">남성</Option>
          <Option value="FEMALE">여성</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="생년월일"
        name="birthday"
        hasFeedback
        rules={[{ required: true, message: '생년월일을 선택해주세요!' }]}
        style={styles.formItem}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item noStyle>
        <Button type="primary" htmlType="submit">
          다음
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InfoEdit;
