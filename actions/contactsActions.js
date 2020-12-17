import request from '../util/fetch';
import { returnErrors } from './errorActions';
import {
  FETCHING_CONTACTS,
  ADDING_NEW_CONTACT,
  GET_CONTACTS,
  ADD_CONTACT,
  INVITE_CONTACTS,
  INVITED_CONTACTS,
  CLEAR_ERRORS,
  INVITING_CONTACTS
} from './types';
import { BASE_URL } from '../util/varibales';

export const getContacts = () => async dispatch => {
  dispatch({ type: FETCHING_CONTACTS });
  dispatch({ type: CLEAR_ERRORS });
  try {
    const data = await request(`${BASE_URL}/api/contacts`, 'GET');
    console.log('contacts', data);
    dispatch({
      type: GET_CONTACTS,
      payload: data
    });
  } catch (err) {
    dispatch(returnErrors('Failed to fetch contacts', err.response.status));
    console.log(err.response);
  }
};

export const getInvitedContacts = body => async dispatch => {
  dispatch({ type: FETCHING_CONTACTS });
  try {
    const data = await request(`${BASE_URL}/api/contacts/attending`, 'POST', body);
    console.log('invited contacts', data);
    dispatch({
      type: INVITED_CONTACTS,
      payload: data
    });
  } catch (err) {
    dispatch(returnErrors('Failed to fetch contacts', err.response.status));
    console.log(err.response);
  }
};

export const addNewContact = (body, router) => async dispatch => {
  dispatch({ type: ADDING_NEW_CONTACT });
  dispatch({ type: CLEAR_ERRORS });
  try {
    const data = await request(`${BASE_URL}/api/contacts`, 'POST', body);
    dispatch({
      type: ADD_CONTACT,
      payload: data
    });
    router.push('/event/invites');
  } catch (err) {
    dispatch(returnErrors('Failed to add contact', err.response.status));
    console.log(err.response);
  }
};

export const inviteContacts = (
  contacts,
  id,
  setConfirmationScreen
) => async dispatch => {
  dispatch({ type: INVITING_CONTACTS });
  dispatch({ type: CLEAR_ERRORS });
  try {
    const body = {
      event_id: id,
      contacts: contacts.map(item => item.id)
    };
    const data = await request(`${BASE_URL}/api/contacts/invite`, 'POST', body);
    dispatch({
      type: INVITE_CONTACTS,
      payload: contacts
    });
    setConfirmationScreen(true);
  } catch (err) {
    dispatch(returnErrors(err.response.statusText, err.response.status));
    console.log(err.response);
  }
};
