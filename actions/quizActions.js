import request from "../util/fetch";
import { returnErrors } from "./errorActions";
import { connectSocket } from "./echoActions";
import { toast } from "react-toastify";
import {
  SET_CATEGORY,
  CREATING_QUIZ,
  CREATE_QUIZ,
  GUEST_USERNAME,
  JOINING_QUIZ,
  JOIN_QUIZ,
  FETCHING_QUESTION,
  GET_QUESTION,
  ANSWERING_QUESTION,
  ANSWER_QUESTION,
  VOTING_FOR_ANSWER,
  GET_VOTE,
  NEXT_QUESTION,
  SET_LANGUAGE
} from "./types";
import { BASE_URL } from "../util/varibales";

export const createQuiz = (name, router) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATING_QUIZ });
    const body = { name };
    const data = await request(`${BASE_URL}/api/quiz/generate`, "POST", body);
    router.push("/quiz/share");
    dispatch({
      type: CREATE_QUIZ,
      payload: {
        id: data.id,
        name,
        code: data.code,
        players: 1,
        username: getState().auth.user.name
      }
    });
  } catch (err) {
    dispatch(returnErrors("Failed to create quiz", err.response.status));
    console.log(err.response);
  }
};

export const joinQuiz = (name, code, router) => async (dispatch, getState) => {
  try {
    dispatch({ type: JOINING_QUIZ });
    const body = { name, code };
    const data = await request(`${BASE_URL}/api/quiz/join`, "POST", body);
    router.push("/quiz/lobby");
    dispatch({ type: SET_LANGUAGEGE, payload: data.quiz_language });
    dispatch({
      type: JOIN_QUIZ,
      payload: {
        name: data.quiz_name,
        code
      }
    });
    connectSocket(code, name, router)(dispatch, getState);
  } catch (err) {
    dispatch(returnErrors("Failed to join quiz", err.response.status));
    console.log(err.response);
  }
};

export const getQuestion = (quiz_id, category) => async dispatch => {
  try {
    dispatch({ type: FETCHING_QUESTION });
    const body = { quiz_id, category };
    const data = await request(`${BASE_URL}/api/quiz/question`, "POST", body);
    if (!data.questions) {
      toast(`No more questions in that category`, {
        type: toast.TYPE.ERROR
      });
    }
  } catch (err) {
    dispatch(returnErrors("Failed to get question", err.response.status));
    console.log(err.response);
  }
};

export const answerQuestion = (
  socket_id,
  question_id,
  answer,
  router
) => async dispatch => {
  try {
    dispatch({ type: ANSWERING_QUESTION });
    const body = { socket_id, question_id, answer };
    const data = await request(`${BASE_URL}/api/quiz/answer`, "POST", body);
    dispatch({
      type: ANSWER_QUESTION,
      payload: {
        lobbyText: "Waiting for other players to answer...",
        answer,
        leftToVote: data.left
      }
    });
    if (data.left === 0) {
      router.push("/quiz/vote");
    } else {
      router.push("/quiz/lobby");
    }
  } catch (err) {
    dispatch(
      returnErrors("Failed to answer the question", err.response.status)
    );
    console.log(err.response);
  }
};

export const voteForAnswer = (answer_id, router) => async dispatch => {
  try {
    dispatch({ type: VOTING_FOR_ANSWER });
    const body = { answer_id };
    const data = await request(`${BASE_URL}/api/quiz/vote`, "POST", body);
    dispatch({
      type: GET_VOTE,
      payload: {
        lobbyText: "Waiting for other players to vote...",
        leftToVote: data.left
      }
    });
    if (data.left === 0) {
      router.push("/quiz/winner-round");
    } else {
      router.push("/quiz/lobby");
    }
  } catch (err) {
    dispatch(
      returnErrors(
        "Failed to vote for the favorite answer",
        err.response.status
      )
    );
    console.log(err.response);
  }
};

export const setGuestUsername = name => dispatch => {
  dispatch({
    type: GUEST_USERNAME,
    payload: name
  });
};

export const setCategory = id => dispatch => {
  dispatch({
    type: SET_CATEGORY,
    payload: id
  });
};

export const nextQuestion = () => dispatch => {
  dispatch({ type: NEXT_QUESTION });
};
