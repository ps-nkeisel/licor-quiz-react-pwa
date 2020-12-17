import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../components/wrapper/Wrapper';
import Page from '../components/layout/Page';
import Button from '../components/button/Button';
import { withTranslation } from '../i18n';

import '../styles/components/text-block.scss';
import '../styles/components/tac.scss';

const TermsAndConditions = ({ t }) => {
  return (
    <Page title='Terms and Conditions' headerType='withMenu'>
      <div className='container'>
        <Wrapper className='tac-wrap'>
          <div className='text-block' style={{ marginBottom: 30 }}>
            <h2 className='title-big'>
              {t('title')}
            </h2>
          </div>
          <div className='text-block__text' style={{ marginBottom: 30 }}>
            { t('content').split("\n").map((item, idx) => (
              <span key={idx}>
                { item }
                <br/>
              </span>
            )) }
          </div>
          <div className='back_button' style={{ marginBottom: 30 }}>
            <Button component='link' href='/' className='btn'>
              Go Home
            </Button>
          </div>
        </Wrapper>
      </div>
    </Page>
  );
};

TermsAndConditions.getInitialProps = () => ({
  namespacesRequired: ['terms-and-conditions']
});

TermsAndConditions.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('terms-and-conditions')(
  TermsAndConditions
);
