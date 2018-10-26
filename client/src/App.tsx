import { initClient } from 'Config';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { AppRouter } from 'router';

export const App = () => {
  const client = initClient();

  return (
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  );
};
