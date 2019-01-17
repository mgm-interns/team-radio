import { initClient, RadioClient } from 'Config';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { AppRouter } from 'router';

export class App extends React.Component<Props, States> {
  public state: States = {
    client: null,
    error: null
  };

  public componentDidMount() {
    const client = initClient({
      onError: error => {
        if (typeof error === 'string') this.setState({ error });
        else if (error.statusCode === 500) {
          this.setState({ error: error.message });
        }
      }
    });
    client.onResetStore(() => {
      this.setState({ error: null });
      return Promise.resolve();
    });
    this.setState({ client });
  }

  public render() {
    if (this.state.client) {
      return (
        <ApolloProvider client={this.state.client}>
          <RadioErrorContext.Provider value={{ error: this.state.error }}>
            <AppRouter />
          </RadioErrorContext.Provider>
        </ApolloProvider>
      );
    }
    return null;
  }
}

interface ErrorContext {
  error?: string;
}
export const RadioErrorContext = React.createContext<ErrorContext>({});

export interface Props {}

export interface States extends ErrorContext {
  client?: RadioClient;
}

export default App;
