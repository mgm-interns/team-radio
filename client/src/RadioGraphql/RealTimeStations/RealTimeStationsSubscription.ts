import { SubscribeToMoreOptions } from 'apollo-boost';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { AllRealTimeStationsQuery } from '.';

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

export const withHOC = graphql<{}, Response, Variables>(SUBSCRIPTION);

export function getSubscribeToMoreOptions(): SubscribeToMoreOptions<
  AllRealTimeStationsQuery.Response,
  AllRealTimeStationsQuery.Variables,
  Response
> {
  return {
    document: SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      return {
        ...prev,
        items: prev.items.map((station: AllRealTimeStationsQuery.Station) => {
          if (station.id === subscriptionData.data.onStationsChanged.id) {
            return {
              ...station,
              ...subscriptionData.data.onStationsChanged
            };
          }
          return station;
        })
      };
    }
  };
}

export interface Response {
  readonly onStationsChanged: AllRealTimeStationsQuery.Station;
}

export interface Variables {}
