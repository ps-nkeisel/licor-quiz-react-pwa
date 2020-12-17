import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import Button from '../../components/button/Button';
import { withTranslation } from '../../i18n';

import AndIcon from '../../static/img/and.png';
import Logo from '../../static/img/licor43.svg';

//components
import '../../styles/components/text-block.scss';
import '../../styles/components/round-block.scss';
import '../../styles/components/slider.scss';
import { isSafari } from 'react-device-detect';

const SelectionComplete = ({ order: { selectedFood, selectedDrink }, t }) => {
  return (
    <Page title='Selection Review' headerType='withMenu'>
      <div className='container'>
        <Wrapper>
          <div className='text-block'>
            <h2 className='text-block__title title-big'>
              {t('the-perfect')}
              <span>{t('pair')}</span>
            </h2>
          </div>
          <div
            className='round-block'
            style={isSafari ? { height: 260, width: 260 } : {}}
          >
            <img src={Logo} alt='' className='round-block__logo' />
            <span className='round-block__text'>{selectedFood.name}</span>
            <img src={AndIcon} alt='' />
            <span className='round-block__text'>{selectedDrink.name}</span>
          </div>
          <div
            className='btn-wrapper'
            style={isSafari ? { marginBottom: 10 } : {}}
          >
            <Button component='link' href='/ingredients' className='btn'>
              {t('lets-get-things-ready')}
            </Button>
            <Button
              component='link'
              href='/selection/food'
              className='btn btn--invert'
            >
              {t('edit-selection')}
            </Button>
          </div>
        </Wrapper>
      </div>
    </Page>
  );
};

SelectionComplete.getInitialProps = () => ({
  namespacesRequired: ['selection-complete']
});

SelectionComplete.propTypes = {
  t: PropTypes.func.isRequired,
  order: PropTypes.object
};

const mapStateToProps = state => ({
  order: state.order
});

export default withTranslation('selection-complete')(
  connect(mapStateToProps)(SelectionComplete)
);
