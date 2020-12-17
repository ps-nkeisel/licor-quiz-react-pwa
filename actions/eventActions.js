import request from '../util/fetch';
import {
  GET_EVENTS,
  FETCHING_EVENTS,
  SELECT_EVENT,
  CREATE_EVENT,
  CREATING_EVENT
} from './types';

import { BASE_URL } from '../util/varibales';
import { returnErrors } from './errorActions';

export const getEvents = () => async dispatch => {
  try {
    dispatch({ type: FETCHING_EVENTS });
    const data = await request(`${BASE_URL}/api/events/types`, 'GET');
    dispatch({
      type: GET_EVENTS,
      payload: data
    });
  } catch (err) {
    console.log(err.response);
    returnErrors('Failed to fetch events', err.response.status);
  }
};

export const selectEvent = event => dispatch => {
  dispatch({
    type: SELECT_EVENT,
    payload: event
  });
};

export const createEvent = (
  formData,
  selectedEvent,
  router
) => async dispatch => {
  dispatch({ type: CREATING_EVENT });
  try {
    const body = {
      event_type_id: selectedEvent.id,
      name: formData.name,
      dateAndTime: formData.startDate,
      location: formData.location
    };
    const data = await request(`${BASE_URL}/api/events`, 'POST', body);
    console.log(data);
    router.push('/event/preview');
    dispatch({
      type: CREATE_EVENT,
      payload: data
    });
  } catch (err) {
    console.log(err.response);
    returnErrors('CREATING EVENT FAILED', err.response.status);
  }
};
