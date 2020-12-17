import request from '../util/fetch';
import { returnErrors } from './errorActions';
import { SET_LANGUAGE } from './types';
import { BASE_URL } from '../util/varibales';

export const changeLanguage = ({
  language,
  shortLang,
  i18n
}) => async dispatch => {
  i18n.changeLanguage(shortLang);
  try {
    const body = { language };
    const data = await request(`${BASE_URL}/api/set-language`, 'POST', body);
    dispatch({
      type: SET_LANGUAGE,
      payload: language
    });
  } catch (err) {
    returnErrors('Failed to change language', err.response.status);
    console.log(err);
  }
};

export const setLanguage = language => dispatch =>
  dispatch({ type: SET_LANGUAGE, payload: language });
