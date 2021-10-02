import React from 'react';
import { observer } from 'mobx-react';
import { Form, Input, Button } from 'antd';
import { CssKeyObject } from '../../../../../types/css-basic-type';
import { useAni } from '../../../../../hooks';
import { msg } from '../../../../../util/message';

const styles: CssKeyObject = {
  submitBtn: {
    float: 'right', marginTop: '1em',
  },
  cancelBtn: {
    float: 'right', marginTop: '1em', marginRight: '1em',
  },
};

const ReviewForm = observer(({ id }: {id: string}) => {
  const ani = useAni();

  const submitReview = ({ review }: {review: string}) => {
    console.log(review);
    ani.submitReview(id, review)
      .then()
      .catch((error) => msg('Error', error));
  };

  const cancelUpdate = () => {
    ani.reviewFormMode = 'Read';
  };

  return (
    <Form onFinish={submitReview}>
      <Form.Item
        name="review"
        rules={[
          {
            required: true,
            message: '리뷰를 작성해주세요.',
          },
        ]}
      >
        <Input.TextArea
          name="content"
          placeholder={ani.myReview ? '' : '100자 이내'}
          showCount
          maxLength={100}
          defaultValue={ani.myReview ? ani.myReview.content : ''}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={styles.submitBtn}>
          작성
        </Button>
        {ani.reviewFormMode === 'Update' && (
        <Button onClick={cancelUpdate} style={styles.cancelBtn}>
          취소
        </Button>
        )}
      </Form.Item>
    </Form>
  );
});

export default ReviewForm;
