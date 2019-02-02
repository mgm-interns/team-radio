import { useSubscription } from '@Hooks';
import gql from 'graphql-tag';
import * as React from 'react';
import { QueryHookOptions } from 'react-apollo-hooks/lib/useQuery';
import { RealTimeStationPlayerQuery } from '.';

const SUBSCRIPTION = gql`
  subscription onStationPlayerChanged($stationId: String!) {
    onStationPlayerChanged(stationId: $stationId) {
      playing {
        id
        url
        thumbnail
        highQualityThumbnail
        title
        creatorId
        createdAt
        duration
      }
      currentlyPlayingAt
      startedAt
      playlistCount
      nextSongThumbnail
    }
  }
`;

export function useQueryWithSubscription(options: QueryHookOptions<Variables>) {
  const query = RealTimeStationPlayerQuery.useQuery(options);

  const {
    data: { onStationPlayerChanged }
  } = useSubscription<Response, Variables>(SUBSCRIPTION, options);

  React.useEffect(() => {
    if (!onStationPlayerChanged) return;
    query.updateQuery(prev => {
      return {
        ...prev,
        player: onStationPlayerChanged
      };
    });
  }, [onStationPlayerChanged]);

  return query;
}

export interface Response {
  readonly onStationPlayerChanged: RealTimeStationPlayerQuery.Player;
}

export interface Variables {
  stationId: string;
}
