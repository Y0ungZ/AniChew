import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Card } from 'antd';
import { CssKeyObject } from '../../../../types/css-basic-type';
import { useAni } from '../../../../hooks';
import { ReviewForm, ReviewReadForm } from '../form';

const styles: CssKeyObject = {
  card: {
    width: '100%',
    borderRadius: '1em',
    backgroundColor: 'white',
    marginBottom: '2em',
    padding: '1em 0em',

  },
  cardBody: {
    paddingBottom: '0',
  },
  submitBtn: {
    float: 'right', marginTop: '1em',
  },
};

const ReviewWriteFormCard = observer(({ id }: {id: string}) => {
  const ani = useAni();
  console.log(ani.aniInfo);
  useEffect(() => {
    ani.getMyReview(id)
      .then()
      .catch(() => alert('나의 리뷰 읽기 실패'));
  }, [ani, id]);

  return (
    <Card title="리뷰" style={styles.card} bodyStyle={styles.cardBody}>
      {ani.reviewFormMode === 'Write' || ani.reviewFormMode === 'Update' ? (
        <ReviewForm id={id} />
      ) : (
        <ReviewReadForm id={id} />
      )}
    </Card>
  );
});

export default ReviewWriteFormCard;
