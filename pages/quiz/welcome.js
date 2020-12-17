import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import Button from '../../components/button/Button';
import { withTranslation } from '../../i18n';

//components
import '../../styles/components/text-block.scss';
import '../../styles/components/quiz.scss';
import '../../styles/components/img-fade.scss';

//images
import homeQuizIcon from '../../static/img/home-quiz.svg';
import welcomeImage from '../../static/img/quiz-welcome.jpg';

const QuizWelcome = ({ t }) => {
  return (
    <Page title='Quiz - Welcome' headerType='none'>
      <Wrapper size={0}>
        <div className='container'>
          <div className='quiz-logo' style={{ width: '23vh' }}>
            <img src={homeQuizIcon} alt='Quiz logo' />
          </div>
        </div>
        <div className='img-fade tt-20'>
          <img src={welcomeImage} alt='' />
        </div>
        <div className='container'>
          <div
            className='text-block-big centered'
            style={{ margin: '10px 0 30px' }}
          >
            <h2 className='title-big'>{t('welcome')}</h2>
            <span className='text-block-big__text'>
              {t('to-the-most-creative-quiz-game-ever')}
            </span>
          </div>
          <div className='btn-wrapper'>
            <Button component='link' href='/quiz/rules' className='btn'>
              {t('continue')}
            </Button>
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

QuizWelcome.getInitialProps = async () => ({
  namespacesRequired: ['quiz-welcome']
});

QuizWelcome.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('quiz-welcome')(QuizWelcome);
