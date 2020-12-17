import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import ConfirmationScreen from '../../components/confirmation-screen/ConfirmationScreen';
import SliderRecipe from '../../components/slider/SliderRecipe';
import Spinner from '../../components/spinner/Spinner';
import { getRecipe } from '../../actions/recipeActions';

import '../../styles/components/text-block.scss';

import spotifyIcon from '../../static/img/spotify.png';

const DrinksRecipe = ({ token, recipe, order, getRecipe }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { selectedFood, selectedDrink } = order;
  const { drinkRecipe, isLoading } = recipe;
  const body = {
    food_id: selectedFood.id,
    drink_id: selectedDrink.id
  };
  useEffect(() => {
    if (token || !drinkRecipe.length) {
      console.log('fetching drinks');
      getRecipe(body);
    }
  }, [token]);
  return (
    <Page title="Drink Recipe" headerType="withMenu">
      <Wrapper>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="slider--big">
            <div className="container">
              <div className="text-block">
                {currentSlide < drinkRecipe.length ? (
                  <h2 className="text-block__title title-big">
                    Lets go
                    <span>step by step.</span>
                  </h2>
                ) : (
                  <h2 className="text-block__title title-big">
                    Drink
                    <span>is ready.</span>
                  </h2>
                )}
              </div>
            </div>
            <SliderRecipe
              type="drink"
              order={order}
              steps={drinkRecipe}
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
            />
          </div>
        )}
      </Wrapper>
    </Page>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
  recipe: state.recipe,
  order: state.order
});

export default connect(mapStateToProps, { getRecipe })(DrinksRecipe);
