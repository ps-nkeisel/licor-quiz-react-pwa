import {
  GET_EVENTS,
  FETCHING_EVENTS,
  SELECT_EVENT,
  CREATING_EVENT,
  CREATE_EVENT
} from '../actions/types';

const initialState = {
  events: [],
  selectedEvent: null,
  createdEvent: null,
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_EVENTS:
    case CREATING_EVENT:
      return {
        ...state,
        isLoading: true
      };
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
        isLoading: false
      };
    case SELECT_EVENT:
      return {
        ...state,
        selectedEvent: action.payload
      };
    case CREATE_EVENT:
      return {
        ...state,
        createdEvent: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}
