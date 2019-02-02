import { useSubscription } from '@Hooks';
import gql from 'graphql-tag';
import * as React from 'react';
import { QueryHookOptions } from 'react-apollo-hooks/lib/useQuery';
import { RealTimeStationQuery } from '.';

const SUBSCRIPTION = gql`
  subscription onStationChanged($stationId: String!) {
    onStationChanged(stationId: $stationId) {
      id
      stationId
      stationName
      createdAt
      startingTime
      currentPlayingSongId
      ownerId
      isPrivate
      onlineCount
      onlineUsers {
        id
        email
        username
        avatarUrl
      }
      onlineAnonymous {
        clientId
      }
    }
  }
`;

export function useQueryWithSubscription(options: QueryHookOptions<Variables>) {
  const query = RealTimeStationQuery.useQuery(options);

  const {
    data: { onStationChanged }
  } = useSubscription<Response, Variables>(SUBSCRIPTION, options);

  React.useEffect(() => {
    if (!onStationChanged) return;
    query.updateQuery(prev => {
      return {
        ...prev,
        item: onStationChanged
      };
    });
  }, [onStationChanged]);

  return query;
}

export interface Response {
  readonly onStationChanged: RealTimeStationQuery.Station;
}

export interface Variables {
  stationId: string;
}
