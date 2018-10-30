import gql from 'graphql-tag';
import * as React from 'react';
import { DataProps, DataValue, graphql, OperationOption, Query as GraphQLQuery } from 'react-apollo';
import { PartialQueryProps } from '../types';

export function RealTimeStationPlayerQuery(props: RealTimeStationPlayerQuery.Props) {
  return <RealTimeStationPlayerQuery.QueryComponent query={RealTimeStationPlayerQuery.QUERY} {...props} />;
}

export namespace RealTimeStationPlayerQuery {
  export const QUERY = gql`
    query StationPlayer($stationId: String!) {
      StationPlayer(stationId: $stationId) {
        playing {
          id
          url
          thumbnail
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

  export interface Player {
    readonly playing?: Song;
    readonly startedAt?: string;
    readonly currentlyPlayingAt?: string;
    readonly playlistCount: number;
    readonly nextSongThumbnail?: string;
  }

  export interface Song {
    readonly id: string;
    readonly url: string;
    readonly thumbnail: string;
    readonly title: string;
    readonly creatorId: string;
    readonly createdAt: string;
    readonly duration: number;
  }

  export interface Response {
    readonly StationPlayer: Player;
  }

  export interface Variables {
    stationId: string;
  }

  export class QueryComponent extends GraphQLQuery<Response, Variables> {}

  export function withHOC<TProps>(options: OperationOption<{}, Response, Variables>) {
    return graphql<TProps, Response, Variables>(QUERY, options);
  }

  export interface WithHOCProps extends DataProps<Response, Variables> {}
  export interface WithHOCData extends DataValue<Response, Variables> {}

  export interface Props extends PartialQueryProps<Response, Variables> {}
}
