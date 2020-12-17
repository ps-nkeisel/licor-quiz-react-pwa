import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import { withTranslation } from '../../i18n';

import '../../styles/components/text-block.scss';
import SliderQuiz from '../../components/slider/SliderQuiz';

const QuizHome = ({ auth, t }) => {
  return (
    <Page title='Quiz - Home' headerType='withMenu' menuType='quiz'>
      <div className='container'>
        <Wrapper>
          <div className='text-block'>
            <h2 className='text-block__title title-big'>
              {t('welcome')}
              <span>{auth.user.name}</span>
            </h2>
            <span className='text-block__text'>
              {t('lets-start-with-the-basics')}
            </span>
          </div>
          <h3 className='title-small centered'>
            <span>{t('what')}</span> {t('are-we-doing')}
          </h3>
          <SliderQuiz />
        </Wrapper>
      </div>
    </Page>
  );
};

QuizHome.getInitialProps = async () => ({
  namespacesRequired: ['quiz']
});

QuizHome.propTypes = {
  t: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withTranslation('quiz')(connect(mapStateToProps)(QuizHome));
