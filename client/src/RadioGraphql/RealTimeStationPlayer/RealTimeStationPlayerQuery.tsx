import gql from 'graphql-tag';
import * as React from 'react';
import { DataProps, DataValue, graphql, OperationOption, Query as GraphQLQuery } from 'react-apollo';
import { PartialQueryProps } from '../types';

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

export class QueryComponent extends GraphQLQuery<Response, Variables> {}

export default function RealTimeStationPlayerQuery(props: Props) {
  return <QueryComponent query={QUERY} {...props} />;
}

export function withHOC<TProps>(options: OperationOption<{}, Response, Variables>) {
  return graphql<TProps, Response, Variables>(QUERY, options);
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

export interface WithHOCProps extends DataProps<Response, Variables> {}
export interface WithHOCData extends DataValue<Response, Variables> {}

export interface Props extends PartialQueryProps<Response, Variables> {}
