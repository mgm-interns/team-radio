import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { render } from 'react-dom';
import { AppRouter } from 'router';
import ApolloClient from 'apollo-boost';

export const App = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:8000/api'
  });

  return (
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  );
};

render(<App />, document.getElementById('root'));

if ((module as any).hot) {
  (module as any).hot.accept();
}
