import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import Button from '../../components/button/Button';
import SliderSelection from '../../components/slider/SliderSelection';
import Spinner from '../../components/spinner/Spinner';
import { getFood, selectFood } from '../../actions/orderActions';
import { withTranslation } from '../../i18n';

//components
import '../../styles/components/text-block.scss';
import '../../styles/components/slider.scss';
import '../../styles/components/selection.scss';

const SelectionFood = ({ order, getFood, selectFood, t }) => {
  const { food, selectedFood, selectedDrink, isLoading } = order;
  // Get food when the page loads
  // useEffect(() => {
  //   if (token) {
  //     getFood(token);
  //   }
  // }, [token]);
  return (
    <Page title='Food Selection' headerType='withMenu'>
      <div className='container'>
        <Wrapper>
          <div className='text-block'>
            <h2 className='title-big'>
              {t('lets-pick')}
              <span>{t('delicious-food')}</span>
            </h2>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <SliderSelection
                type='foods'
                items={food}
                setItems={selectFood}
                selected={[selectedFood, selectedDrink]}
              />
              <div
                className={`selection__btn-wrap ${
                  selectedFood ? 'selection__btn-wrap--display' : ''
                }`}
              >
                <Button
                  component='link'
                  href='/selection/drinks'
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

SelectionFood.getInitialProps = ({ store }) => {
  getFood(store.getState().event.selectedEvent.id)(store.dispatch);
  return {
    namespacesRequired: ['selection-food']
  };
};

SelectionFood.propTypes = {
  t: PropTypes.func.isRequired,
  selectFood: PropTypes.func,
  order: PropTypes.object
};

const mapStateToProps = state => ({
  order: state.order
});

export default withTranslation('selection-food')(
  connect(mapStateToProps, { getFood, selectFood })(SelectionFood)
);
