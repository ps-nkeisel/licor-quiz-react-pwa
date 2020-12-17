import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from '../components/layout/Page';
import Wrapper from '../components/wrapper/Wrapper';
import Button from '../components/button/Button';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ConfirmationScreen from '../components/confirmation-screen/ConfirmationScreen';
import Spinner from '../components/spinner/Spinner';
import {
  getIngredients,
  emailMissingIngredients
} from '../actions/ingredientsActions';
import { withTranslation } from '../i18n';
import { isSafari } from 'react-device-detect';

//components
import '../styles/components/text-block.scss';
import '../styles/components/tabs.scss';
import '../styles/components/slider.scss';

//images
import mailIcon from '../static/img/email.svg';

const Ingredients = ({ token, ingredients, emailMissingIngredients, t }) => {
  const [showConfirmationScreen, setConfirmationScreen] = useState(false);
  const closeConfirmationScreen = () => setConfirmationScreen(false);
  const [ownedFoodIngredients, setOwnedFoodIngredients] = useState([]);
  const [ownedDrinkIngredients, setOwnedDrinkIngredients] = useState([]);
  const { foodIngredients, drinkIngredients, isLoading } = ingredients;
  // Function for toggling owned ingredients
  const toggleOwned = (arr, item, cb) => {
    const index = arr.indexOf(item);
    const tempArr = [...arr];
    // If owned delete the item
    if (index !== -1) {
      tempArr.splice(index, 1);
    } else {
      tempArr.push(item);
    }
    cb(tempArr);
  };
  return (
    <Page title="Ingredients" headerType="withMenu">
      <div className="container">
        <Wrapper>
          <div className="text-block" style={{ marginBottom: '15px' }}>
            <h2 className="text-block__title title-big">
              {t('lets-start-with')}
              <span>{t('the-ingredients')}</span>
            </h2>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <div className="tabs" style={{ flex: 1 }}>
                <Tabs>
                  <TabList className="tabs__head">
                    <Tab
                      className="tabs__head-item"
                      selectedClassName="tabs__head-item--active"
                    >
                      <span className="tabs__head-item__text">{t('food')}</span>
                    </Tab>
                    <Tab
                      className="tabs__head-item"
                      selectedClassName="tabs__head-item--active"
                    >
                      <span className="tabs__head-item__text">
                        {t('drinks')}
                      </span>
                    </Tab>
                  </TabList>
                  {/* FOOD TAB */}
                  <TabPanel className="tabs__body">
                    <div
                      className="tabs__body-tab"
                      style={isSafari ? { maxHeight: 180 } : {}}
                    >
                      <div className="tabs__body-tab__wrap">
                        {foodIngredients.map(item => {
                          const index = ownedFoodIngredients.indexOf(item);
                          return (
                            <div className="tabs__body-tab-item" key={item.id}>
                              <span className="tabs__body-tab-item__info">
                                {item.quantity}
                              </span>
                              <span className="tabs__body-tab-item__text">
                                {item.name}
                              </span>
                              <span
                                onClick={() =>
                                  toggleOwned(
                                    ownedFoodIngredients,
                                    item,
                                    setOwnedFoodIngredients
                                  )
                                }
                                className={`tabs__body-tab-item__icon icon-checkmark ${
                                  index !== -1
                                    ? 'tabs__body-tab-item__icon--active'
                                    : ''
                                }`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </TabPanel>
                  {/* DRINKS TAB */}
                  <TabPanel className="tabs__body">
                    <div
                      className="tabs__body-tab"
                      style={isSafari ? { maxHeight: 180 } : {}}
                    >
                      <div className="tabs__body-tab__wrap">
                        {drinkIngredients.map((item, i) => {
                          const index = ownedDrinkIngredients.indexOf(item);
                          return (
                            <div className="tabs__body-tab-item" key={i}>
                              <span className="tabs__body-tab-item__info">
                                {item.quantity}
                              </span>
                              <span className="tabs__body-tab-item__text">
                                {item.name}
                              </span>
                              <span
                                onClick={() =>
                                  toggleOwned(
                                    ownedDrinkIngredients,
                                    item,
                                    setOwnedDrinkIngredients
                                  )
                                }
                                className={`tabs__body-tab-item__icon icon-checkmark ${
                                  index !== -1
                                    ? 'tabs__body-tab-item__icon--active'
                                    : ''
                                }`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
              <div className="btn-wrapper">
                <Button
                  className="btn btn--invert btn--small"
                  style={{ padding: 10 }}
                  onClick={() => {
                    // FIND MISSING INGREDIENTS
                    const missingFoodIngredientsIDs = foodIngredients
                      .filter(item => !ownedFoodIngredients.includes(item))
                      .map(ingredient => ingredient.id);
                    const missingDrinkIngredientsIDs = drinkIngredients
                      .filter(item => !ownedDrinkIngredients.includes(item))
                      .map(ingredient => ingredient.id);
                    emailMissingIngredients(
                      missingFoodIngredientsIDs,
                      missingDrinkIngredientsIDs
                    );
                    setConfirmationScreen(prevState => !prevState);
                  }}
                >
                  <img src={mailIcon} alt="" />
                  {t('email-missing-ingredients')}
                </Button>
                <Button component="link" href="/recipe/food" className="btn">
                  {t('lets-do-this')}
                </Button>
              </div>
            </>
          )}
        </Wrapper>
      </div>
      {showConfirmationScreen && (
        <ConfirmationScreen
          text="Sure thing,email with missing ingredients have been sent..."
          closeConfirmationScreen={closeConfirmationScreen}
          nextPage="/recipe"
        />
      )}
    </Page>
  );
};

Ingredients.getInitialProps = ({ store }) => {
  const { auth, order } = store.getState();
  const { selectedFood, selectedDrink } = order;
  const body = {
    food_id: selectedFood.id,
    drink_id: selectedDrink.id
  };
  getIngredients(body)(store.dispatch);
  return {
    namespacesRequired: ['ingredients']
  };
};

Ingredients.propTypes = {
  t: PropTypes.func.isRequired,
  token: PropTypes.string,
  ingredients: PropTypes.object,
  emailMissingIngredients: PropTypes.func
};

const mapStateToProps = state => ({
  ingredients: state.ingredients
});

export default withTranslation('ingredients')(
  connect(mapStateToProps, { getIngredients, emailMissingIngredients })(
    Ingredients
  )
);
