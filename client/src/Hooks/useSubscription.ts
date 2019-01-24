import { SubscribeToMoreOptions } from 'apollo-boost';
import * as React from 'react';
import { DataValue } from 'react-apollo';

export function useSubscription<Response, Variables>(
  dataOrSubscribeToMore:
    | DataValue<Response, Variables>
    | ((options: SubscribeToMoreOptions<any, any, any>) => () => void)
    | undefined,
  subscriptionOptions: SubscribeToMoreOptions<any, any, any>
) {
  React.useEffect(() => {
    if (typeof dataOrSubscribeToMore === 'function') return dataOrSubscribeToMore(subscriptionOptions);
    if (!dataOrSubscribeToMore) return;
    return dataOrSubscribeToMore.subscribeToMore(subscriptionOptions);
  }, [subscriptionOptions]);
}
