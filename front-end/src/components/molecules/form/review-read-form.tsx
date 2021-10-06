import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';
import { useReview } from 'hooks';
import { msg } from 'util/message';

const styles: CssKeyObject = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteBtn: {
    marginLeft: '0.5em',
  },
};

const ReviewReadForm = observer(({ id }: {id: string}) => {
  const review = useReview();
  const changeUpdateMode = () => {
    review.formMode = 'Update';
  };

  const deleteReview = () => {
    review.delete(id)
      .then()
      .catch((error) => msg('Error', error.message));
  };

  return (
    <div style={styles.container}>
      <p>
        {review.myReview?.content}
      </p>
      <div>
        <Button onClick={changeUpdateMode}>수정</Button>
        <Button onClick={deleteReview} type="primary" danger style={styles.deleteBtn}>삭제</Button>
      </div>
    </div>
  );
});

export default ReviewReadForm;
