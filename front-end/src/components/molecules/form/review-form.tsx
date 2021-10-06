import React from 'react';
import { observer } from 'mobx-react';
import { Form, Input, Button } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';
import { useReview } from 'hooks';
import { msg } from 'util/message';

const styles: CssKeyObject = {
  submitBtn: {
    float: 'right', marginTop: '1em',
  },
  cancelBtn: {
    float: 'right', marginTop: '1em', marginRight: '1em',
  },
};

const ReviewForm = observer(({ id }: {id: string}) => {
  const review = useReview();

  const submitReview = ({ content }: {content: string}) => {
    review.submit(id, content)
      .then()
      .catch((error) => msg('Error', error.message));
  };

  const cancelUpdate = () => {
    review.formMode = 'Read';
  };

  return (
    <Form onFinish={submitReview}>
      <Form.Item
        name="content"
        rules={[
          {
            required: true,
            message: '리뷰를 작성해주세요.',
          },
        ]}
      >
        <Input.TextArea
          placeholder={review.myReview ? '' : '100자 이내'}
          showCount
          maxLength={100}
          defaultValue={review.myReview ? review.myReview.content : ''}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={styles.submitBtn}>
          작성
        </Button>
        {review.formMode === 'Update' && (
        <Button onClick={cancelUpdate} style={styles.cancelBtn}>
          취소
        </Button>
        )}
      </Form.Item>
    </Form>
  );
});

export default ReviewForm;
