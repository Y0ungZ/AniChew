import React from 'react';
import { observer } from 'mobx-react';
import { Card } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';
import { useReview } from 'hooks';
import { ReviewForm, ReviewReadForm } from 'components';

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

const ReviewFormCard = observer(({ id }: {id: string}) => {
  const review = useReview();

  return (
    <Card title="리뷰" style={styles.card} bodyStyle={styles.cardBody}>
      {review.formMode === 'Write' || review.formMode === 'Update' ? (
        <ReviewForm id={id} />
      ) : (
        <ReviewReadForm id={id} />
      )}
    </Card>
  );
});

export default ReviewFormCard;
