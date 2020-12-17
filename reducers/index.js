import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import eventReducer from './eventReducer';
import contactsReducer from './contactsReducer';
import orderReducer from './orderReducer';
import ingredientsReducer from './ingredientsReducer';
import recipeReducer from './recipeReducer';
import quizReducer from './quizReducer';
import echoReducer from './echoReducer';

const rootReducer = combineReducers({
  language: languageReducer,
  auth: authReducer,
  error: errorReducer,
  event: eventReducer,
  contacts: contactsReducer,
  order: orderReducer,
  ingredients: ingredientsReducer,
  recipe: recipeReducer,
  quiz: quizReducer,
  echo: echoReducer
});

export default rootReducer;
