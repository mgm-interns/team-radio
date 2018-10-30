import { initClient, RadioClient } from 'Config';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { AppRouter } from 'router';

export class App extends React.Component<Props, States> {
  public render() {
    const client = initClient();

    return (
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
    );
  }
}

export interface Props {}

export interface States {
  client: RadioClient;
}

export default App;
