import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import Button from '../../components/button/Button';
import ConfirmationScreen from '../../components/confirmation-screen/ConfirmationScreen';
import SliderRecipe from '../../components/slider/SliderRecipe';
import Spinner from '../../components/spinner/Spinner';
import { getRecipe } from '../../actions/recipeActions';
import { toggleAlexaMode } from '../../actions/recipeActions';
import { withTranslation } from '../../i18n';

import '../../styles/components/text-block.scss';

const FoodRecipe = ({ recipe, order, t, toggleAlexaMode }) => {
  const [showConfirmationScreen, setConfirmationScreen] = useState(false);
  const closeConfirmationScreen = () => setConfirmationScreen(false);

  const [modalOpen, setModalOpen] = useState(true);
  const closeModal = alexaMode => {
    setModalOpen(false);
    toggleAlexaMode(alexaMode);
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const { foodRecipe, alexaMode, isLoading } = recipe;
  
  return (
    <Page title="Food Recipe" headerType="withMenu">
      {modalOpen ? (
        <div className="container">
          <Wrapper>
            <div className="text-block">
              <h2 className="text-block__title title-big">
                {t('lets-do-this')}
                <span>{t('chef')}</span>
              </h2>
              <span className="text-block__text">
                {t('what-do-you-want-to-do-first')}
              </span>
            </div>
            <div className="btn-wrapper btn-wrapper--big">
              <Button
                // component="link"
                // href="/recipe/food"
                className="btn"
                style={{ marginBottom: '15px', padding: '13px 35px' }}
                onClick={() => closeModal(false)}
              >
                {t('food')}
              </Button>
              <Button
                // component="link"
                // href="/recipe/drinks"
                className="btn btn--white"
                style={{ marginBottom: '15px', padding: '13px 35px' }}
                onClick={() => closeModal(false)}
              >
                {t('drinks')}
              </Button>
              <Button
                // component="link"
                // href="/recipe/food"
                onClick={() => closeModal(true)}
                className="btn btn--alexa"
                style={{ marginBottom: '15px', padding: '13px 35px' }}
              >
                {t('continue-with-alexa')}
              </Button>
              <a
                href="https://open.spotify.com/playlist/1IidQTR2HaahdRQ0W4woop?si=7ca-eB4-TKGp6vW0FabDjA"
                className="btn btn--green"
                target="_blank"
              >
                {t('listen-to-spotify')}
              </a>
            </div>
          </Wrapper>
        </div>
      ) : (
        <Wrapper>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="slider--big">
              <div className="container">
                <div className="text-block">
                  {currentSlide < foodRecipe.length ? (
                    <h2 className="text-block__title title-big">
                      Lets go
                      <span>step by step.</span>
                    </h2>
                  ) : (
                    <h2 className="text-block__title title-big">
                      Food
                      <span>is ready.</span>
                    </h2>
                  )}
                </div>
              </div>
              <SliderRecipe
                type="food"
                steps={foodRecipe}
                order={order}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
              />
            </div>
          )}
        </Wrapper>
      )}
      {showConfirmationScreen && (
        <ConfirmationScreen
          text="Everything is ready,Why not playing?"
          closeConfirmationScreen={closeConfirmationScreen}
          nextPage="/quiz"
        />
      )}
    </Page>
  );
};

FoodRecipe.getInitialProps = ({ store }) => {
  const { order } = store.getState();
  const { selectedFood, selectedDrink } = order;
  const body = {
    food_id: selectedFood.id,
    drink_id: selectedDrink.id
  };
  getRecipe(body)(store.dispatch);
  return { namespacesRequired: ['recipe'] };
};

const mapStateToProps = state => ({
  recipe: state.recipe,
  order: state.order
});

export default withTranslation('recipe')(
  connect(mapStateToProps, { toggleAlexaMode })(FoodRecipe)
);
