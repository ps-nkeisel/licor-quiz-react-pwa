import {
  GET_NOTIFICATION,
  CONNECTED,
  DISCONNECTED,
  CONNECTION_FAILED,
  USER_CONNECTED,
  USER_DISCONNECTED
} from '../actions/types';

const initialState = {
  status: DISCONNECTED,
  users: [],
  notification: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONNECTED:
      return {
        ...state,
        status: CONNECTED,
        users: action.payload
      };
    case DISCONNECTED:
      return {
        ...state,
        status: DISCONNECTED
      };
    case CONNECTION_FAILED:
      return {
        ...state,
        status: undefined
      };
    case USER_CONNECTED:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case USER_DISCONNECTED:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload.id)
      };
    case GET_NOTIFICATION: {
      console.log(action.payload);
      return {
        ...state,
        notification: action.payload.message
      };
    }
    default:
      return state;
  }
}
