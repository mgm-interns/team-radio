import { SubscribeToMoreOptions } from 'apollo-boost';
import * as React from 'react';
import { DataValue } from 'react-apollo';

// TODO: the params or data in props should have only 1 property, if there are 2 or more, not sure???
export class ReactSubscriptionComponent<TProps extends Props, TStates = States> extends React.Component<
  TProps,
  TStates
> {
  private isSubscribed: boolean;
  private unSubscribe: () => void;

  /**
   * Subscribe to update the station player status
   * Also cancel the subscription when change station
   */
  public componentDidUpdate(prevProps: TProps) {
    if (this.props.params) {
      Object.keys(this.props.params).forEach(key => {
        if (prevProps.params[key] !== this.props.params[key]) {
          if (this.isSubscribed) {
            this.callUnsubscribe();
          }
          this.isSubscribed = false;
        }
      });
    }

    Object.keys(this.props.data).forEach(key => {
      const ignoredKeys = [
        'error',
        'networkStatus',
        'loading',
        'variables',
        'fetchMore',
        'refetch',
        'startPolling',
        'stopPolling',
        'subscribeToMore',
        'updateQuery'
      ];
      if (ignoredKeys.includes(key)) return;
      if (this.props.data[key] && !this.isSubscribed) {
        const options = this.getSubscribeToMoreOptions();
        if (!options) throw new Error('Protected method getSubscribeToMoreOptions must be implemented.');
        this.unSubscribe = this.props.data.subscribeToMore(options);
        this.isSubscribed = true;
      }
    });
  }

  /**
   * Cancel subscription when destroy component
   */
  public componentWillUnmount() {
    if (this.isSubscribed) {
      this.callUnsubscribe();
    }
  }

  protected getSubscribeToMoreOptions = (): SubscribeToMoreOptions<Response, Variables> | null => {
    return null;
  };

  private callUnsubscribe = () => {
    if (typeof this.unSubscribe === 'function') {
      this.unSubscribe();
    }
  };
}

export interface Props {
  params?: Variables;
  data: DataValue<Response | Variables>;
}

interface States extends KeyValuePairObject {}

interface Response extends KeyValuePairObject {}

interface Variables extends KeyValuePairObject {}

interface KeyValuePairObject {
  [key: string]: any;
}

export default ReactSubscriptionComponent;
