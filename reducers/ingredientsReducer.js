import {
  FETCHING_INGREDIENTS,
  GET_INGREDIENTS,
  EMAILING_MISSING_INGREDIENTS,
  EMAIL_SENT,
  SET_MISSING_INGREDIENTS
} from '../actions/types';

const initialState = {
  foodIngredients: [],
  drinkIngredients: [],
  missingIngredients: [],
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_INGREDIENTS:
    case EMAILING_MISSING_INGREDIENTS:
      return {
        ...state,
        isLoading: true
      };
    case GET_INGREDIENTS:
      return {
        ...state,
        foodIngredients: action.payload.foodIngredients,
        drinkIngredients: action.payload.drinkIngredients,
        isLoading: false
      };
    case SET_MISSING_INGREDIENTS:
      return {
        ...state,
        missingIngedients: action.payload
      };
    case EMAIL_SENT:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}

// function createReducer(initialState, reducerDictionary) {
//   return function reducer(state = initialState, action) {
//     return immer.produce(state, draft =>
//       reducerDictionary[action.type](draft, action.payload)
//     );
//   };
// }

// export default createReducer(
//   { value: 0 },
//   {
//     [increment.type](state, payload) {
//       state.value += playload;
//     }
//   }
// );

// dispatch(increment(10));
