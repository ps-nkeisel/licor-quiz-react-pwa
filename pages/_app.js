import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { initializeStore } from '../store';
import { loadUser } from '../actions/authActions';
import { AUTH_ERROR } from '../actions/types';
import { PersistGate } from 'redux-persist/integration/react';
import Spinner from '../components/spinner/Spinner';
import { appWithTranslation } from '../i18n';
// import "../static/styles/components/empty.scss";
import '../styles/main.scss';

Router.events.on('routeChangeComplete', () => {
  if (process.env.NODE_ENV !== 'production') {
    const els = document.querySelectorAll(
      'link[href*="/_next/static/css/styles.chunk.css"]'
    );
    const timestamp = new Date().valueOf();
    els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp;
  }
});

class MyApp extends App {
  componentDidMount() {
    if (localStorage.token) {
      this.props.store.dispatch(loadUser());
    } else {
      this.props.store.dispatch({ type: AUTH_ERROR });
    }
  }
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {})
      }
    };
  }
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <PersistGate persistor={store.__PERSISTOR} loading={<Spinner />}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    );
  }
}

export default withRedux(initializeStore)(appWithTranslation(MyApp));
