import { SET_LANGUAGE } from '../actions/types';

const initialState = {
  currentLanguage: 'english'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        currentLanguage: action.payload
      };
    default:
      return state;
  }
}
