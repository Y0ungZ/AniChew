import React from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import { useAni } from '../../../../../hooks';
import { CssKeyObject } from '../../../../../types/css-basic-type';

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
  const ani = useAni();
  console.log('');
  const changeUpdateMode = () => {
    ani.reviewFormMode = 'Update';
  };

  const deleteReview = () => {
    ani.deleteReview(id, ani.myReview!.id);
  };

  return (
    <div style={styles.container}>
      <p>
        {ani.myReview?.content}
      </p>
      <div>
        <Button onClick={changeUpdateMode}>수정</Button>
        <Button onClick={deleteReview} type="primary" danger style={styles.deleteBtn}>삭제</Button>
      </div>
    </div>
  );
});

export default ReviewReadForm;
