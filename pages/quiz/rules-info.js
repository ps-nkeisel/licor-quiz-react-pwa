import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import Button from '../../components/button/Button';
import { withTranslation } from '../../i18n';

import '../../styles/components/text-block.scss';

const QuizRulesInfo = ({ t }) => {
  return (
    <Page title='Quiz - Rules Information' headerType='quiz'>
      <div className='container'>
        <Wrapper size={140}>
          <div className='text-block'>
            <h2 className='text-block__title title-big'>
              <span>{t('rules-and-information')}</span>
            </h2>
            <span className='entry-content yellow centered'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Dictumst quisque sagittis purus sit. Vel quam elementum pulvinar
                etiam non quam lacus suspendisse. Mollis aliquam ut porttitor
                leo. Suspendisse faucibus interdum posuere lorem ipsum dolor sit
                amet. In egestas erat imperdiet sed euismod nisi porta. Eleifend
                quam adipiscing vitae proin sagittis nisl rhoncus mattis.
                Tincidunt id aliquet risus feugiat in. Nibh nisl condimentum id
                venenatis a condimentum vitae sapien pellentesque. Commodo odio
                aenean sed adipiscing. Netus et malesuada fames ac turpis
                egestas integer eget. Praesent semper feugiat nibh sed pulvinar
                proin gravida hendrerit lectus.
              </p>
              <p>
                Turpis egestas integer eget aliquet nibh praesent tristique.
                Eget aliquet nibh praesent tristique magna. Augue mauris augue
                neque gravida. Quam vulputate dignissim suspendisse in est ante
                in nibh mauris. In hac habitasse platea dictumst. At tellus at
                urna condimentum. Pretium nibh ipsum consequat nisl.
              </p>
            </span>
          </div>
          <div className='btn-wrapper'>
            <Button component='link' href='/quiz/rules' className='btn'>
              {t('go-back')}
            </Button>
          </div>
        </Wrapper>
      </div>
    </Page>
  );
};

QuizRulesInfo.getInitialProps = async () => ({
  namespacesRequired: ['quiz-rules-info']
});

QuizRulesInfo.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('quiz-rules-info')(QuizRulesInfo);
