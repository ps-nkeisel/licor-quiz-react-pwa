import {
  FETCHING_FOOD,
  FETCHING_DRINKS,
  GET_FOOD,
  GET_DRINKS,
  SELECT_FOOD,
  DESELECT_FOOD,
  SELECT_DRINKS,
  DESELECT_DRINKS
} from '../actions/types';

const initialState = {
  food: [],
  drinks: [],
  selectedFood: null,
  selectedDrink: null,
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_FOOD:
    case FETCHING_DRINKS:
      return {
        ...state,
        isLoading: true
      };
    case GET_FOOD:
      return {
        ...state,
        food: action.payload,
        isLoading: false
      };
    case GET_DRINKS:
      return {
        ...state,
        drinks: action.payload,
        isLoading: false
      };
    case SELECT_FOOD: {
      // const food = action.payload;
      // // Check if selected item is already selected
      // const index = state.selectedFood.findIndex(item => item.id === food.id);
      // const selectedFoodTemp = [...state.selectedFood];
      // // Delete if already exist, otherwise add to the array
      // if (index !== -1) {
      //   selectedFoodTemp.splice(index, 1);
      // } else {
      //   selectedFoodTemp = [food];
      //   console.log('selected food', selectedFoodTemp);
      // }
      // return {
      //   ...state,
      //   selectedFood: selectedFoodTemp
      // };
      const food =
        state.selectedFood && action.payload.id === state.selectedFood.id
          ? null
          : action.payload;
      return {
        ...state,
        selectedFood: food
      };
    }
    case SELECT_DRINKS: {
      // const drink = action.payload;
      // // Check if selected item is already selected
      // const index = state.selectedDrinks.findIndex(
      //   item => item.id === drink.id
      // );
      // const selectedDrinksTemp = [...state.selectedDrinks];
      // // Delete if already exist, otherwise add to the array
      // if (index !== -1) {
      //   selectedDrinksTemp.splice(index, 1);
      // } else {
      //   selectedDrinksTemp.push(drink);
      // }
      // return {
      //   ...state,
      //   selectedDrinks: [...selectedDrinksTemp]
      // };
      const drink =
        state.selectedDrink && action.payload.id === state.selectedDrink.id
          ? null
          : action.payload;
      return {
        ...state,
        selectedDrink: drink
      };
    }
    default:
      return state;
  }
}
