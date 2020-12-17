import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

const initialState = {};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['quiz', 'echo']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const initializeStore = (state = initialState) => {
  let store;
  const isClient = typeof window !== 'undefined';
  if (isClient) {
    store = createStore(
      persistedReducer,
      state,
      composeWithDevTools(applyMiddleware(thunk))
    );
    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(
      rootReducer,
      state,
      composeWithDevTools(applyMiddleware(thunk))
    );
  }
  return store;
};
