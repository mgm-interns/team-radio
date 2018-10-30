import { ApolloClient, InMemoryCache, split } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

export interface RadioClient extends ApolloClient<any> {}
let client: RadioClient | null;
let connectionAttempts: number;

export function initClient() {
  const { hostname, protocol } = window.location;
  const serverPort = process.env.NODE_ENV === 'production' ? '' : ':8000';

  const httpLink = createHttpLink({
    uri: `${protocol}//${hostname}${serverPort}/api`,
    useGETForQueries: true
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

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  const authLink = setContext((_, { headers }) => {
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

  client = new ApolloClient({
    link: authLink.concat(link),
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
