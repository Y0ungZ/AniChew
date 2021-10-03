import React from 'react';
import { observer } from 'mobx-react';
import { Form, Input, Button } from 'antd';
import { CssKeyObject } from '../../../types/css-basic-type';
import { useReview } from '../../../hooks';
import { msg } from '../../../util/message';

const styles: CssKeyObject = {
  submitBtn: {
    float: 'right', marginTop: '1em',
  },
  cancelBtn: {
    float: 'right', marginTop: '1em', marginRight: '1em',
  },
};

const ReviewForm = observer(({ id }: {id: string}) => {
  const reviewStore = useReview();

  const submitReview = ({ review }: {review: string}) => {
    reviewStore.submitReview(id, review)
      .then()
      .catch((error) => msg('Error', error.message));
  };

  const cancelUpdate = () => {
    reviewStore.reviewFormMode = 'Read';
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
          placeholder={reviewStore.myReview ? '' : '100자 이내'}
          showCount
          maxLength={100}
          defaultValue={reviewStore.myReview ? reviewStore.myReview.content : ''}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={styles.submitBtn}>
          작성
        </Button>
        {reviewStore.reviewFormMode === 'Update' && (
        <Button onClick={cancelUpdate} style={styles.cancelBtn}>
          취소
        </Button>
        )}
      </Form.Item>
    </Form>
  );
});

export default ReviewForm;
