import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Card } from 'antd';
import { CssKeyObject } from '../../../../types/css-basic-type';
import { useReview } from '../../../../hooks';
import { ReviewForm, ReviewReadForm } from '../form';
import { msg } from '../../../../util/message';

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
  const review = useReview();

  useEffect(() => {
    review.getMyReview(id)
      .then()
      .catch((error) => msg('Error', error.message));
  }, [id, review]);

  return (
    <Card title="리뷰" style={styles.card} bodyStyle={styles.cardBody}>
      {review.reviewFormMode === 'Write' || review.reviewFormMode === 'Update' ? (
        <ReviewForm id={id} />
      ) : (
        <ReviewReadForm id={id} />
      )}
    </Card>
  );
});

export default ReviewWriteFormCard;
