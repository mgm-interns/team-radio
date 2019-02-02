import { useSubscription } from '@Hooks';
import gql from 'graphql-tag';
import * as React from 'react';
import { QueryHookOptions } from 'react-apollo-hooks/lib/useQuery';
import { RealTimeStationPlaylistQuery } from '.';

const SUBSCRIPTION = gql`
  subscription onStationPlaylistChanged($stationId: String!) {
    onStationPlaylistChanged(stationId: $stationId) {
      currentPlayingSongId
      playlist {
        id
        url
        thumbnail
        title
        creatorId
        createdAt
        duration
        upVotes
        downVotes
      }
    }
  }
`;

export function useQueryWithSubscription(options: QueryHookOptions<Variables>) {
  const query = RealTimeStationPlaylistQuery.useQuery(options);

  const {
    data: { onStationPlaylistChanged }
  } = useSubscription<Response, Variables>(SUBSCRIPTION, options);

  React.useEffect(() => {
    if (!onStationPlaylistChanged) return;
    query.updateQuery(prev => {
      return {
        ...prev,
        items: onStationPlaylistChanged
      };
    });
  }, [onStationPlaylistChanged]);

  return query;
}

export interface Response {
  readonly onStationPlaylistChanged: RealTimeStationPlaylistQuery.Playlist;
}

export interface Variables {
  stationId: string;
}
