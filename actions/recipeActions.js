import request from '../util/fetch';
import { returnErrors } from './errorActions';
import { FETCHING_RECIPES, GET_RECIPES, TOGGLE_ALEXA_MODE } from './types';
import { BASE_URL } from '../util/varibales';

export const getRecipe = body => async dispatch => {
  try {
    dispatch({ type: FETCHING_RECIPES });
    const data = await request(`${BASE_URL}/api/steps`, 'POST', body);
    dispatch({
      type: GET_RECIPES,
      payload: data
    });
  } catch (err) {
    dispatch(returnErrors(err.response.statusText, err.response.status));
    console.log(err);
  }
};

export const toggleAlexaMode = data => dispatch => {
  dispatch({ type: TOGGLE_ALEXA_MODE, payload: data });
};
