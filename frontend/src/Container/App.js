import React from 'react';
import ApolloProvider from 'react-apollo/ApolloProvider';
import Router from './Router';
import { initApollo, initRedux } from '../Config';

const apolloClient = initApollo();
const store = initRedux(apolloClient);

export default () => (
  <ApolloProvider client={apolloClient} store={store}>
    <Router />
  </ApolloProvider>
);
