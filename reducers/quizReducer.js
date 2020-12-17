import {
  CREATING_QUIZ,
  CREATE_QUIZ,
  SET_CATEGORY,
  GUEST_USERNAME,
  JOINING_QUIZ,
  JOIN_QUIZ,
  FETCHING_QUESTION,
  GET_QUESTION,
  ANSWER_QUESTION,
  GET_ANSWERS,
  VOTING_FOR_ANSWER,
  GET_VOTE,
  GET_VOTES,
  NEXT_QUESTION,
  QUIZ_ENDED
} from '../actions/types';

const initialState = {
  id: null,
  name: '',
  code: '',
  username: '',
  players: 0,
  lobbyText: 'Waiting for the game to start...',
  categories: [
    {
      id: 1,
      name: 'How would you call?',
      image: ''
    },
    {
      id: 2,
      name: 'What can you see?',
      image: ''
    },
    {
      id: 3,
      name: 'What is this sound?',
      image: ''
    },
    {
      id: 4,
      name: 'What is it made of?',
      image: ''
    }
  ],
  question: {},
  answer: '',
  answers: [],
  leftToVote: null,
  roundsLeft: null,
  winnerRound: {},
  winner: null,
  ranking: [],
  selectedCategoryId: null,
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATING_QUIZ:
    case JOINING_QUIZ:
    case FETCHING_QUESTION:
    case VOTING_FOR_ANSWER:
      return {
        ...state,
        isLoading: true
      };
    case CREATE_QUIZ:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case GUEST_USERNAME:
      return {
        ...state,
        username: action.payload
      };
    case JOIN_QUIZ:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case SET_CATEGORY:
      return {
        ...state,
        selectedCategoryId: action.payload,
        isLoading: false
      };
    case GET_QUESTION:
      return {
        ...state,
        question: action.payload,
        isLoading: false
      };
    case ANSWER_QUESTION:
    case GET_VOTE:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case GET_ANSWERS:
      return {
        ...state,
        answers: action.payload
      };
    case GET_VOTES: {
      const winnerRound = { ...action.payload.winner };
      winnerRound.answer = action.payload.winner_answer;
      return {
        ...state,
        winnerRound,
        ranking: action.payload.players
      };
    }
    case NEXT_QUESTION:
      return {
        ...state,
        lobbyText: 'Waiting for the host to choose a new category...'
      };
    case QUIZ_ENDED:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
