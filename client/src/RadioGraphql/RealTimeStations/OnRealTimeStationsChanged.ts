import { SubscribeToMoreOptions } from 'apollo-boost';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { AllRealTimeStations } from './AllRealTimeStations';

export namespace OnRealTimeStationsChanged {
  export const subscription = gql`
    subscription {
      onStationsChanged {
        id
        stationId
        onlineCount
        createdAt
        isPrivate
        ownerId
        stationName
      }
    }
  `;

  export interface Response {
    onStationsChanged: AllRealTimeStations.Station;
  }

  export interface Variables {}

  export const withAllStations = graphql<{}, Response, Variables>(subscription);

  export function getSubscribeToMoreOptions(): SubscribeToMoreOptions<
    AllRealTimeStations.Response,
    AllRealTimeStations.Variables,
    Response
  > {
    return {
      document: subscription,
      updateQuery: (prev: AllRealTimeStations.Response, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          ...prev,
          allStations: prev.allRealTimeStations.map((station: AllRealTimeStations.Station) => {
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
}
