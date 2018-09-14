import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

const { default: buildApolloClient } = require('ra-data-graphql-simple');

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : '/api'
});

const authLink = setContext((_: any, { headers }: { headers: any }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token') || undefined;
  const refreshToken = localStorage.getItem('refreshToken') || undefined;
  const newHeaders = headers || {};
  if (token) {
    newHeaders.Authorization = token;
  }
  if (refreshToken) {
    newHeaders.refreshToken = refreshToken;
  }
  return { headers: newHeaders };
});

export const buildGraphQLProvider = () => {
  const getGqlResource = (resource: string) => {
    switch (resource) {
      case 'users':
        return 'User';

      case 'stations':
        return 'Station';

      case 'songs':
        return 'Song';

      case 'playlistSongs':
        return 'PlaylistSong';

      case 'historySongs':
        return 'HistorySong';

      default:
        throw new Error(`Unknown resource ${resource}`);
    }
  };

  return buildApolloClient({
    clientOptions: {
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    }
  })
    .then((dataProvider: any) => (type: any, resource: string, params: any) =>
      dataProvider(type, getGqlResource(resource), params)
    )
    .catch(() => {
      localStorage.clear();
      window.location.reload();
    });
};
