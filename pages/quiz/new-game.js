import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import Button from '../../components/button/Button';
import { createQuiz } from '../../actions/quizActions';
import Spinner from '../../components/spinner/Spinner';
import { withTranslation } from '../../i18n';

//components
import '../../styles/components/forms.scss';

const QuizNewGame = ({ quiz, createQuiz, t }) => {
  const [name, setName] = useState('');
  const router = useRouter();
  const { isLoading } = quiz;
  return (
    <Page title='Quiz - New Game' headerType='quiz'>
      <div className='container'>
        <Wrapper size={140}>
          <div className='text-block'>
            <h2 className='text-block__title title-big'>
              {t('lets-set-up')}
              <span>{t('the-basics')}</span>
            </h2>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <div className='form-quiz'>
                  <input
                    type='text'
                    className='input'
                    name='name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={t('new-game-name')}
                  />
                </div>
                <div className='btn-wrapper'>
                  <Button
                    className='btn btn--p16'
                    onClick={() => createQuiz(name, router)}
                  >
                    {t('create-new-game')}
                  </Button>
                </div>
              </>
            )}
          </div>
        </Wrapper>
      </div>
    </Page>
  );
};

QuizNewGame.getInitialProps = async () => ({
  namespacesRequired: ['quiz-new-game']
});

QuizNewGame.propTypes = {
  quiz: PropTypes.object.isRequired,
  createQuiz: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quiz: state.quiz
});

export default withTranslation('quiz-new-game')(
  connect(mapStateToProps, { createQuiz })(QuizNewGame)
);
