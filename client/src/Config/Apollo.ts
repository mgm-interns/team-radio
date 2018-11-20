import { ApolloClient, ApolloLink, InMemoryCache } from 'apollo-boost';
import * as ContextLink from 'apollo-link-context';
import * as ErrorLink from 'apollo-link-error';
import * as HttpLink from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { RadioGraphQLError } from 'Error';

export interface RadioClient extends ApolloClient<any> {}
export interface RadioClientConfig {
  onError?(error: RadioGraphQLError | string, errorType: string): void;
}

let client: RadioClient | null;
let connectionAttempts: number;

export function initClient(config: RadioClientConfig) {
  const { hostname, protocol, port } = window.location;
  let serverPort = port ? `:${port}` : '';
  if (process.env.NODE_ENV !== 'production') {
    serverPort = ':8000';
  }

  const httpLink = HttpLink.createHttpLink({
    uri: `${protocol}//${hostname}${serverPort}/api`,
    useGETForQueries: true
  });

  const authLink = ContextLink.setContext((_, { headers }) => {
    const token = localStorage.getItem('token') || undefined;
    const refreshToken = localStorage.getItem('refreshToken') || undefined;
    let clientId = localStorage.getItem('clientId') || undefined;
    const newHeaders = headers || {};
    if (token) {
      newHeaders.Authorization = token;
    }
    if (refreshToken) {
      newHeaders.refreshToken = refreshToken;
    }
    if (!clientId) {
      clientId = generateUniqueClientId();
      localStorage.setItem('clientId', clientId);
    }
    newHeaders.clientId = clientId;
    return { headers: newHeaders };
  });

  const wsLink = new WebSocketLink({
    uri: `ws://${hostname}${serverPort}/api`,
    options: {
      reconnect: true,
      connectionParams: {
        token: localStorage.getItem('token') || undefined,
        refreshToken: localStorage.getItem('refreshToken') || undefined,
        clientId: localStorage.getItem('clientId') || undefined
      },
      connectionCallback: () => {
        if (connectionAttempts > 0) {
          console.log('Reconnect successful! Start resetting apollo store');
          if (client) client.resetStore();
        }
        connectionAttempts += 1;
      }
    }
  });

  const link = ApolloLink.split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  const errorLink = ErrorLink.onError(error => {
    console.error(error);
    if (!config.onError) return;
    if (error.networkError) {
      const { message } = error.networkError;
      if (/Failed to fetch/.test(message)) {
        config.onError(message, 'failed_to_fetch');
      }
    }
    if (error.graphQLErrors && error.graphQLErrors[0]) {
      const graphQLError = error.graphQLErrors[0] as RadioGraphQLError;
      let errorType = 'common';
      if (/Token expired/.test(graphQLError.message)) {
        console.log('found error', graphQLError.message);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        client.resetStore();
        errorType = 'expired_token';
      }
      config.onError(graphQLError, errorType);
    }
  });

  client = new ApolloClient({
    link: ApolloLink.from([authLink, errorLink, link]),
    cache: new InMemoryCache()
  });
  connectionAttempts = 0;

  return client;
}

export function generateUniqueClientId() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}
