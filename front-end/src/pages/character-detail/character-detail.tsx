import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useAuth, useCharacter, useReview } from '../../hooks';
import CharMetaSection from '../../components/organisms/char-meta-section/char-meta-section';
import { msg } from '../../util/message';
import NotFound from '../error/not-found';
import CharacterDetailTemplate from './template';

const CharacterDetail = observer(() => {
  const param = useParams<{ id: string }>();
  const auth = useAuth();
  const char = useCharacter();
  const review = useReview();

  useEffect(() => {
    review.type = 'Character';
    char
      .getInfo(param.id)
      .then(() => console.log(char.info))
      .catch((error) => msg('Error', error.message));
    window.scroll(0, 0);
  }, [char, param.id, review]);

  useEffect(() => {
    review
      .getAll(param.id)
      .then()
      .catch((error) => msg('Error', error.message));
  }, [review, param.id]);

  useEffect(() => {
    if (auth.isLoggedIn) {
      review
        .getMy(param.id)
        .then()
        .catch((error) => msg('Error', error.message));
    }
  }, [auth, review, param.id]);

  return (
    <section>
      {char.info ? (
        <CharacterDetailTemplate
          meta={<CharMetaSection store={char} info={char.info} />}
        />
      ) : (
        <NotFound type="캐릭터 정보" />
      )}
    </section>
  );
});

export default CharacterDetail;
