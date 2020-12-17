import {
  FETCHING_RECIPES,
  GET_RECIPES,
  TOGGLE_ALEXA_MODE
} from '../actions/types';

const initialState = {
  foodRecipe: [],
  drinkRecipe: [],
  alexaMode: false,
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_RECIPES:
      return {
        ...state,
        isLoading: true
      };
    case GET_RECIPES:
      return {
        ...state,
        foodRecipe: action.payload.food_steps,
        drinkRecipe: action.payload.drink_steps,
        isLoading: false
      };
    case TOGGLE_ALEXA_MODE:
      return {
        ...state,
        alexaMode: action.payload
      };
    default:
      return state;
  }
}
