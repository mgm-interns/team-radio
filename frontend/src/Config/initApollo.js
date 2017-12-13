import { ApolloClient, createNetworkInterface } from 'react-apollo';
import {
  SubscriptionClient,
  addGraphQLSubscriptions,
} from 'subscriptions-transport-ws';

let devtools = false;
let apolloClient = null;

// Get the Apollo DevTools extension and fallback to a no-op function
if (window.__APOLLO_CLIENT__ && process.env.NODE_ENV === 'development') {
  devtools = true;
}

const create = (initialState = {}) => {
  const networkInterface = createNetworkInterface({
    uri: process.env.REACT_APP_SERVER_END_POINT,
    opts: {
      // Additional options like `credentials` or `headers`
    },
    connectToDevTools: devtools,
  });
  const wsClient = new SubscriptionClient(
    process.env.REACT_APP_SUBCRIPTION_END_POINT,
    {
      reconnect: true,
      connectionParams: {
        authToken: localStorage.getItem('token'),
        refreshToken: localStorage.getItem('refreshToken'),
      },
    },
  );
  networkInterface.use([
    {
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {}; // Create the header object if needed.
        }
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        req.options.headers.authorization = token;
        req.options.headers.refreshToken = refreshToken;
        next();
      },
    },
  ]);
  networkInterface.useAfter([
    {
      applyAfterware({ response }, next) {
        response
          .clone()
          .json()
          .then(res => {
            if (res.errors && res.errors[0].message === 'unauthorized') {
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('id');
              console.log('Clear');
              next();
            }
          });
        const token = response.headers.get('X-Token');
        const refreshToken = response.headers.get('X-Refresh-Token');
        if (token && refreshToken) {
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
        }
        next();
      },
    },
  ]);
  // Can not initate subcription client for now
  // const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  //   networkInterface,
  //   wsClient,
  // );
  return new ApolloClient({
    initialState,
    networkInterface
    // networkInterface: networkInterfaceWithSubscriptions,
  });
};

export default function initApollo(initialState = {}) {
  if (!apolloClient) {
    apolloClient = create(initialState);
  }
  return apolloClient;
}
