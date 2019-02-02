import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApolloHooks from 'react-apollo-hooks';
import { QueryHookOptions } from 'react-apollo-hooks/lib/useQuery';

export const QUERY = gql`
  query StationPlayer($stationId: String!) {
    player: StationPlayer(stationId: $stationId) {
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

export function useQuery(options: QueryHookOptions<Variables>) {
  return ReactApolloHooks.useQuery<Response, Variables>(QUERY, options);
}

export interface Player {
  readonly playing?: Song;
  readonly startedAt?: string;
  readonly currentlyPlayingAt?: number;
  readonly playlistCount: number;
  readonly nextSongThumbnail?: string;
}

export interface Song {
  readonly id: string;
  readonly url: string;
  readonly thumbnail: string;
  readonly highQualityThumbnail?: string;
  readonly title: string;
  readonly creatorId: string;
  readonly createdAt: number;
  readonly duration: number;
}

export interface Response {
  readonly player: Player;
}

export interface Variables {
  stationId: string;
}
