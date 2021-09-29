import React from 'react';
import { Button, Divider } from 'antd';
import ThumbnailCard from '../thumbnail-card/thumbnail-card';
import AniMeta from '../ani-meta/ani-meta';
import Rating from '../rating/rating';
import { CssKeyObject } from '../../../../types/css-basic-type';

const styles: CssKeyObject = {
  container: {
    backgroundColor: '#181818', padding: '2em',
  },
  content: {
    display: 'flex', margin: '0 auto', maxWidth: '60em', minWidth: '60em',
  },
  thumbnailContainer: {
    width: '40%',
  },
  animeInfoContainer: {
    width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
  },
  divider: {
    backgroundColor: 'whitesmoke', margin: '2em 0',
  },
};

const HeaderSection = () => (
  <section style={styles.container}>
    <div style={styles.content}>
      <div style={styles.thumbnailContainer}>
        <ThumbnailCard />
      </div>
      <div style={styles.animeInfoContainer}>
        <div>
          <AniMeta />
        </div>
        <Divider style={styles.divider} />
        <div>
          <Button>+ 보고싶어요</Button>
          <Rating />
        </div>
      </div>
    </div>
  </section>
);
export default HeaderSection;
