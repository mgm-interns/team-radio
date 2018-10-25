import ApolloClient from 'apollo-boost';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { AppRouter } from 'router';

export const App = () => {
  const { hostname, protocol } = window.location;
  const client = new ApolloClient({
    uri: `${protocol}//${hostname}:8000/api`
  });

  return (
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  );
};
