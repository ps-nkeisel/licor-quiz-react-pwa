import request from '../util/fetch';
import { returnErrors } from './errorActions';
import {
  FETCHING_FOOD,
  FETCHING_DRINKS,
  GET_FOOD,
  GET_DRINKS,
  SELECT_FOOD,
  SELECT_DRINKS
} from './types';
import { BASE_URL } from '../util/varibales';

export const getFood = eventId => async dispatch => {
  try {
    const body = {
      event_type_id: eventId
    };
    dispatch({ type: FETCHING_FOOD });
    const data = await request(`${BASE_URL}/api/foods`, 'POST', body);
    dispatch({
      type: GET_FOOD,
      payload: data
    });
  } catch (err) {
    returnErrors('Failed to fetch food.', err.response.status);
    console.log(err);
  }
};

export const getDrinks = food_id => async dispatch => {
  try {
    dispatch({ type: FETCHING_DRINKS });
    const body = { food_id };
    const data = await request(`${BASE_URL}/api/drinks`, 'POST', body);
    let matched_drinks = data.match_drinks.map(item => ({
      ...item,
      isPerfect: true
    }));
    dispatch({
      type: GET_DRINKS,
      payload: [...matched_drinks, ...data.other_drinks]
    });
  } catch (err) {
    returnErrors('Failed to fetch drinks.', err.response.status);
    console.log(err);
  }
};

export const selectFood = food => dispatch => {
  dispatch({
    type: SELECT_FOOD,
    payload: food
  });
};

export const selectDrinks = drinks => dispatch => {
  dispatch({
    type: SELECT_DRINKS,
    payload: drinks
  });
};
