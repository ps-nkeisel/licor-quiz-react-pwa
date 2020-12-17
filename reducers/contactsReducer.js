import {
  ADD_CONTACT,
  FETCHING_CONTACTS,
  ADDING_NEW_CONTACT,
  GET_CONTACTS,
  INVITE_CONTACTS,
  INVITING_CONTACTS,
  INVITED_CONTACTS
} from '../actions/types';

const initialState = {
  contacts: [],
  invitedContacts: [],
  contactsAttending: [],
  contactsNotAttending: [],
  contactsPending: [],
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_CONTACTS:
    case ADDING_NEW_CONTACT:
    case INVITING_CONTACTS:
      return {
        ...state,
        isLoading: true
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        isLoading: false
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        isLoading: false
      };
    case INVITE_CONTACTS:
      return {
        ...state,
        invitedContacts: action.payload,
        isLoading: false
      };
    case INVITED_CONTACTS:
      return {
        ...state,
        // invitedContacts: action.payload,
        contactsAttending: action.payload.contacts_attending,
        contactsNotAttending: action.payload.contacts_not_attending,
        contactsPending: action.payload.contacts_pending,
        isLoading: false
      };
    default:
      return state;
  }
}
