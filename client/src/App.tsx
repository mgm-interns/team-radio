import { initClient, RadioClient } from '@Config';
import { AppRouter } from '@router';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHookProvider } from 'react-apollo-hooks';

export const App: React.FunctionComponent<Props> = props => {
  const [appError, setAppError] = React.useState<string | null>(null);
  const [apolloClient, setApolloClient] = React.useState<RadioClient | null>(null);

  React.useEffect(() => {
    const client = initClient({
      onError: error => {
        if (typeof error === 'string') setAppError(error);
        else if (error.statusCode === 500) {
          setAppError(error.message);
        }
      }
    });
    client.onResetStore(() => {
      setAppError(null);
      return Promise.resolve();
    });
    setApolloClient(client);
  }, []);

  if (!apolloClient) return null;
  return (
    <ApolloProvider client={apolloClient}>
      <ApolloHookProvider client={apolloClient}>
        <RadioErrorContext.Provider value={{ error: appError }}>
          <AppRouter />
        </RadioErrorContext.Provider>
      </ApolloHookProvider>
    </ApolloProvider>
  );
};

interface ErrorContext {
  error: string | null;
}
export const RadioErrorContext = React.createContext<ErrorContext>({
  error: null
});

export interface Props {}

export default App;
