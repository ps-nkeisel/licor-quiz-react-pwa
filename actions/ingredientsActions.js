import request from '../util/fetch';
import { returnErrors } from './errorActions';
import {
  FETCHING_INGREDIENTS,
  GET_INGREDIENTS,
  EMAILING_MISSING_INGREDIENTS,
  EMAIL_SENT,
  SET_MISSING_INGREDIENTS
} from './types';
import { BASE_URL } from '../util/varibales';

export const getIngredients = body => async dispatch => {
  dispatch({ type: FETCHING_INGREDIENTS });
  try {
    const data = await request(`${BASE_URL}/api/ingredients`, 'POST', body);
    dispatch({
      type: GET_INGREDIENTS,
      payload: {
        foodIngredients: data.food_ingredients,
        drinkIngredients: data.drink_ingredients,
        isLoading: false
      }
    });
  } catch (err) {
    dispatch(returnErrors(err.response.statusText, err.response.status));
    console.log(err);
  }
};

export const emailMissingIngredients = (
  missingFoodIngredients,
  missingDrinkIngredients
) => async dispatch => {
  try {
    dispatch({ type: EMAILING_MISSING_INGREDIENTS });
    const missingIngredients = [
      ...missingFoodIngredients,
      ...missingDrinkIngredients
    ];
    dispatch({
      type: SET_MISSING_INGREDIENTS,
      payload: missingIngredients
    });
    const body = {
      food_ingredients: missingFoodIngredients,
      drink_ingredients: missingDrinkIngredients
    };
    const data = await request(`${BASE_URL}/api/ingredients/missing`, 'POST', body);
    dispatch({ type: EMAIL_SENT });
  } catch (err) {
    dispatch(returnErrors(err.response.statusText, err.response.status));
    console.log(err);
  }
};
