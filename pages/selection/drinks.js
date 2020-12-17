import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import Button from '../../components/button/Button';
import SliderSelection from '../../components/slider/SliderSelection';
import { getDrinks, selectDrinks } from '../../actions/orderActions';
import Spinner from '../../components/spinner/Spinner';
import { withTranslation } from '../../i18n';

//components
import '../../styles/components/text-block.scss';
import '../../styles/components/slider.scss';
import '../../styles/components/selection.scss';

const SelectionDrinks = ({ order, getDrinks, selectDrinks, t }) => {
  const { drinks, selectedDrink, selectedFood, isLoading } = order;
  // Get drinks when the page loads
  // useEffect(() => {
  //   getDrinks(selectedFood[0].id);
  // }, []);
  return (
    <Page title='Drink Selection' headerType='withMenu'>
      <div className='container'>
        <Wrapper>
          <div className='text-block'>
            <h2 className='title-big'>
              {t('lets-pick')}
              <span>{t('perfect-drinks')}</span>
            </h2>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <SliderSelection
                type='drinks'
                items={drinks}
                setItems={selectDrinks}
                selected={[selectedFood, selectedDrink]}
              />
              <div
                className={`selection__btn-wrap ${
                  selectedDrink ? 'selection__btn-wrap--display' : ''
                }`}
              >
                <Button
                  component='link'
                  href='/selection/complete'
                  className='btn btn--invert'
                >
                  {t('continue')}
                </Button>
              </div>
            </>
          )}
        </Wrapper>
      </div>
    </Page>
  );
};

SelectionDrinks.getInitialProps = ({ store }) => {
  const { order } = store.getState();
  getDrinks(order.selectedFood.id)(store.dispatch);
  return {
    namespacesRequired: ['selection-drinks']
  };
};

SelectionDrinks.propTypes = {
  t: PropTypes.func.isRequired,
  selectDrinks: PropTypes.func,
  getDrinks: PropTypes.func,
  order: PropTypes.object
};

const mapStateToProps = state => ({
  order: state.order
});

export default withTranslation('selection-drinks')(
  connect(mapStateToProps, { getDrinks, selectDrinks })(SelectionDrinks)
);
