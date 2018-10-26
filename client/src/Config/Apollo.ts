import { ApolloClient, InMemoryCache, split } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

export function initClient() {
  const { hostname, protocol } = window.location;
  const httpLink = createHttpLink({
    uri: process.env.NODE_ENV === 'production' ? '/api' : `${protocol}//${hostname}:8000/api`
  });

  const wsLink = new WebSocketLink({
    uri: `ws://localhost${process.env.NODE_ENV === 'production' ? '' : ':8000'}/api`,
    options: {
      reconnect: true,
      connectionParams: {
        token: localStorage.getItem('token') || undefined,
        refreshToken: localStorage.getItem('refreshToken') || undefined,
        clientId: localStorage.getItem('clientId') || undefined
      }
    }
  });

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
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

  return new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache()
  });
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
