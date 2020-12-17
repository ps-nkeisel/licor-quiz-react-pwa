import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';
import {
  CONNECTED,
  USER_CONNECTED,
  USER_DISCONNECTED,
  GET_QUESTION,
  GET_ANSWERS,
  GET_VOTES,
  QUIZ_ENDED
} from './types';
import { BASE_URL } from '../util/varibales';

export const connectSocket = (code, name, router) => async (
  dispatch,
  getState
) => {
  const options = {
    broadcaster: 'pusher',
    key: '20651a2ee92591f96fd2',
    cluster: 'eu',
    forceTLS: true,
    //authEndpoint is your apiUrl + /broadcast/auth
    authEndpoint: `${BASE_URL}/api/broadcast/auth/guest`,
    auth: {
      headers: {
        Authorization: `name:${name}`,
        Accept: 'application/json'
      }
    }
  };

  const echo = new Echo(options);

  echo
    .join(`quiz.${code}`)
    .here(users => {
      console.log(users);
      dispatch({
        type: CONNECTED,
        payload: users
      });
    })
    .joining(user => {
      console.log('joining', user);
      dispatch({
        type: USER_CONNECTED,
        payload: user
      });
      toast(`${user.name} connected`, {
        type: toast.TYPE.WARNING
      });
    })
    .leaving(user => {
      console.log(user);
      dispatch({
        type: USER_DISCONNECTED,
        payload: user
      });
      toast(`${user.name} disconnected`, {
        type: toast.TYPE.WARNING
      });
    })
    .listen('QuestionsEvent', data => {
      console.log('question event', data);
      dispatch({
        type: GET_QUESTION,
        payload: data.question
      });
      router.push('/quiz/question');
    })
    .listen('VotingEvent', data => {
      dispatch({
        type: GET_ANSWERS,
        payload: data.answers
      });
      router.push('/quiz/vote');
    })
    .listen('QuizEndedEvent', data => {
      console.log('quiz ended event', data);
      const { quiz } = getState();
      dispatch({
        type: QUIZ_ENDED,
        payload: data
      });
      if (quiz.username === data.winner.name) {
        console.log(
          'redirecting to winner quiz',
          quiz.username === data.winner.name
        );
        router.push('/quiz/winner-quiz');
      } else {
        router.push('/quiz/ranking');
      }
    })
    .listen('PlayersPointsEvent', data => {
      console.log('player points event');
      dispatch({
        type: GET_VOTES,
        payload: data
      });
      router.push('/quiz/winner-round');
    });
};
