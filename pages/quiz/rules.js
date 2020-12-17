import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import Button from '../../components/button/Button';
import { withTranslation } from '../../i18n';

import '../../styles/components/text-block.scss';

const QuizRules = ({ t }) => {
  return (
    <Page title='Quiz - Rules' headerType='quiz'>
      <div className='container'>
        <Wrapper size={140}>
          <div className='text-block'>
            <h2 className='text-block__title title-big'>
              {t('a-quiz-game')}
              <span style={{ fontSize: '3.8vh' }}>{t('simplified')}.</span>
            </h2>
            <span className='entry-content yellow'>
              <ol>
                <li>{t('create-a-new-game')}</li>
                <li>{t('share-the-code-with-participants')}</li>
                <li>{t('choose-a-category')}</li>
                <li>{t('write-your-most-creative-answer')}</li>
                <li>{t('vote-for-your-favorite-answer')}</li>
              </ol>
            </span>
            <div className='text-block centered'>
              <span className='text-block__text-sm'>
                {t('make-sure-to-become-winner')}
              </span>
            </div>
          </div>
          <div className='btn-wrapper'>
            <Button component='link' href='/quiz/new-game' className='btn'>
              {t('start-new-game')}
            </Button>
            <Button
              component='link'
              href='/quiz/rules-info'
              className='btn btn--invert'
            >
              {t('more-information')}
            </Button>
          </div>
        </Wrapper>
      </div>
    </Page>
  );
};

QuizRules.getInitialProps = async () => ({
  namespacesRequired: ['quiz-rules']
});

QuizRules.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('quiz-rules')(QuizRules);
