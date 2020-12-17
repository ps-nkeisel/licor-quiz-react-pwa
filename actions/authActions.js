import request from "../util/fetch";
import { setTokenToLocalStorage } from "../util/setToken";
import { BASE_URL } from "../util/varibales";
import { returnErrors } from "./errorActions";
import {
  USER_LOADING,
  USER_LOADED,
  GET_TOKEN,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS
} from "./types";

// LOAD USER
export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: GET_TOKEN });
    dispatch({ type: USER_LOADING });

    const data = await request(`${BASE_URL}/api/auth/user`, "GET");

    dispatch({
      type: USER_LOADED,
      payload: data
    });
  } catch (err) {
    console.log(err.response);
    dispatch(returnErrors("Loading user failed.", err.response.status));
    dispatch({
      type: AUTH_ERROR
    });
    console.log("Load User Error", err.response);
  }
};

// LOGIN
export const login = (formData, router) => async dispatch => {
  try {
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: USER_LOADING });

    const login = await request(`${BASE_URL}/api/auth/login`, "POST", formData);

    setTokenToLocalStorage(login.access_token, login.expires_at);
    dispatch({ type: GET_TOKEN });

    const data = await request(`${BASE_URL}/api/auth/user`, "GET");

    router.push("/quiz/rules");
    dispatch({ type: LOGIN_SUCCESS });
    dispatch({
      type: USER_LOADED,
      payload: data
    });
  } catch (err) {
    console.log(err.response);
    dispatch(returnErrors("Authentication Failed.", err.response.status));
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// FACEBOOK LOGIN
export const facebookLogin = (formData, router) => async dispatch => {
  try {
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: USER_LOADING });

    const login = await request(`${BASE_URL}/api/auth/login/facebook`, "POST", {
      accessToken: formData.accessToken,
      language: formData.language
    });

    setTokenToLocalStorage(login.access_token, login.expires_at);
    dispatch({ type: GET_TOKEN });

    router.push("/quiz/rules");
    dispatch({ type: LOGIN_SUCCESS });
    dispatch({
      type: USER_LOADED,
      payload: formData
    });
  } catch (err) {
    console.log(err.response);
    dispatch(
      returnErrors("Facebook Authentication Failed.", err.response.status)
    );
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// REGISTER
export const register = (formData, router) => async dispatch => {
  try {
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: USER_LOADING });

    const login = await request(`${BASE_URL}/api/auth/register`, "POST", formData);

    setTokenToLocalStorage(login.access_token, login.expires_at);
    dispatch({ type: GET_TOKEN });

    const data = await request(`${BASE_URL}/api/auth/user`, "GET");

    router.push("/quiz/rules");
    dispatch({ type: REGISTER_SUCCESS });
    dispatch({
      type: USER_LOADED,
      payload: data
    });
  } catch (err) {
    console.log(err.response);
    dispatch(returnErrors("Authentication Failed.", err.response.status));
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const setUser = data => dispatch => {
  dispatch({
    type: USER_LOADED,
    payload: data
  });
};

// LOGOUT
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};
