import { useSubscription } from '@Hooks';
import gql from 'graphql-tag';
import * as React from 'react';
import { QueryHookOptions } from 'react-apollo-hooks/lib/useQuery';
import { RealTimeStationsQuery } from '.';

const SUBSCRIPTION = gql`
  subscription {
    onStationsChanged {
      id
      stationId
      onlineCount
      createdAt
      isPrivate
      ownerId
      stationName
      thumbnail
    }
  }
`;

export function useQueryWithSubscription(options: QueryHookOptions<Variables>) {
  const query = RealTimeStationsQuery.useQuery(options);

  const {
    data: { onStationsChanged }
  } = useSubscription<Response, Variables>(SUBSCRIPTION, options);

  React.useEffect(() => {
    if (!onStationsChanged) return;
    query.updateQuery(prev => {
      return {
        ...prev,
        items: prev.items.map((station: RealTimeStationsQuery.Station) => {
          if (station.id === onStationsChanged.id) {
            return {
              ...station,
              ...onStationsChanged
            };
          }
          return station;
        })
      };
    });
  }, [onStationsChanged]);

  return query;
}

export interface Response {
  readonly onStationsChanged: RealTimeStationsQuery.Station;
}

export interface Variables {}
