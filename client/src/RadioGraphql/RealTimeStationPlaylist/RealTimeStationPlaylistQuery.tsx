import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApolloHooks from 'react-apollo-hooks';
import { QueryHookOptions } from 'react-apollo-hooks/lib/useQuery';

export const QUERY = gql`
  query StationPlaylist($stationId: String!) {
    items: StationPlaylist(stationId: $stationId) {
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

export function useQuery(options: QueryHookOptions<Variables>) {
  return ReactApolloHooks.useQuery<Response, Variables>(QUERY, options);
}

export interface Playlist {
  readonly currentPlayingSongId: string;
  readonly playlist: PlaylistSong[];
}

export interface PlaylistSong {
  readonly id: string;
  readonly url: string;
  readonly thumbnail: string;
  readonly title: string;
  readonly creatorId: string;
  readonly createdAt: number;
  readonly duration: number;
  readonly upVotes: string[];
  readonly downVotes: string[];
}

export interface Response {
  readonly items: Playlist;
}

export interface Variables {
  stationId: string;
}
