import React from 'react';
import { Typography, Grid } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';
import { ReviewFormCard, ReviewSliderCard, ThumbnailCard } from 'components';
import { Store } from 'types/common';
import { Character } from 'stores/character/model/character';

const { useBreakpoint } = Grid;

const styles: CssKeyObject = {
  container: {
    backgroundColor: '#181818',
    padding: '2em',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    maxWidth: '70em',
    minWidth: '70em',
    height: '87.9vh',
  },
  contentMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  thumbnailContainer: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  thumbnailContainerMobile: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '3em',
  },
  charName: { fontFamily: 'titleFont', color: 'whitesmoke' },
  seiyu: { fontSize: '1.2rem', color: 'whitesmoke', marginBottom: '0.5em' },
  charInfoContainer: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'whitesmoke',
  },
  charInfoContainerMobile: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'whitesmoke',
  },
  title: {
    color: 'inherit',
    marginTop: '0',
  },
  sub: {
    fontSize: '1.5rem',
    color: 'inherit',
  },
};

const CharMetaSection = ({
  info,
  store,
}: {
  info: Character;
  store: Store;
}) => {
  const { xs } = useBreakpoint();

  return (
    <section style={styles.container}>
      <div style={xs ? styles.contentMobile : styles.content}>
        <div
          style={
            xs ? styles.thumbnailContainerMobile : styles.thumbnailContainer
          }
        >
          <Typography.Title style={styles.charName}>
            {info.lastName + info.firstName}
          </Typography.Title>
          <Typography.Text style={styles.seiyu}>
            성우 ▶
            {' '}
            {info.seiyu.name}
          </Typography.Text>
          <ThumbnailCard id={info.id} store={store} />
        </div>
        <div
          style={xs ? styles.charInfoContainerMobile : styles.charInfoContainer}
        >
          <ReviewFormCard id={info.id} />
          <ReviewSliderCard />
        </div>
      </div>
    </section>
  );
};
export default CharMetaSection;
