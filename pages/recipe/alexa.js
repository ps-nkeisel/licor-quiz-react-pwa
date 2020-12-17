import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import { withTranslation } from '../../i18n';

import circle from '../../static/img/circle.png';
import '../../styles/components/text-block.scss';
import '../../styles/components/alexa.scss';

const listStyle = {
  listStyleImage: `url(${circle})`
};

const Alexa = ({ t }) => {
  return (
    <Page title='Quiz - Rules' headerType='quiz'>
      <div className='container'>
        <Wrapper size={140}>
          <div className='text-block'>
            <h2 className='text-block__title title-big'>
              {t('lets-do-this')}
              <span style={{ fontSize: '3.8vh' }}>{t('chef')}</span>
            </h2>
            <h2
              className='text-block__title title-medium-center'
              style={{ fontWeight: 'normal' }}
            >
              {t('let-alexa-guide-you')}
            </h2>
            <span className='entry-content yellow'>
              <ul className='alexa-list'>
                <li style={listStyle}>
                  <span>
                    {t('to-begin-say')}{' '}
                    <span className='yellow'>{t('alexa-lets-begin')}</span>
                  </span>
                </li>
                <li style={listStyle}>
                  <span>
                    {t('to-move-onto-the-next-step')}{' '}
                    <span className='yellow'>{t('alexa-next-step')}</span>
                  </span>
                </li>
                <li style={listStyle}>
                  <span>
                    {t('in-case-you-want')}{' '}
                    <span className='yellow'>{t('alexa-repeat')}</span>
                  </span>
                </li>
                <li style={listStyle}>
                  <span>
                    {t('in-case-you-need')}{' '}
                    <span className='yellow'>{t('alexa-go-back')}</span>
                  </span>
                </li>
              </ul>
            </span>
          </div>
        </Wrapper>
      </div>
    </Page>
  );
};

Alexa.getInitialProps = async () => ({
  namespacesRequired: ['alexa']
});

Alexa.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('alexa')(Alexa);
