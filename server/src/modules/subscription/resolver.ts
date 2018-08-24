import { PubSubEngine } from 'graphql-subscriptions';
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  PubSub,
  Publisher,
  Subscription,
  Root,
  ResolverFilterData
} from 'type-graphql';

import { Notification, NotificationPayload } from './type';

@Resolver()
export class NotificationResolver {
  private autoIncrement = 0;

  @Query(returns => Date)
  currentDate() {
    return new Date();
  }

  @Mutation()
  pubSubMutation(@PubSub() pubSub: PubSubEngine, @Arg('message', { nullable: true }) message?: string): boolean {
    const payload: NotificationPayload = { id: ++this.autoIncrement, message }; // tslint:disable-line
    return pubSub.publish('NOTIFICATIONS', payload);
  }

  @Mutation()
  publisherMutation(
    @PubSub('NOTIFICATIONS') publish: Publisher<NotificationPayload>,
    @Arg('message', { nullable: true }) message?: string
  ): boolean {
    return publish({ id: ++this.autoIncrement, message }); // tslint:disable-line
  }

  @Subscription({ topics: 'NOTIFICATIONS' })
  normalSubscription(@Root() { id, message }: NotificationPayload): Notification {
    return { id, message, date: new Date() };
  }

  @Subscription(returns => Notification, {
    topics: 'NOTIFICATIONS',
    filter: ({ payload }: ResolverFilterData<NotificationPayload>) => payload.id % 2 === 0
  })
  subscriptionWithFilter(@Root() { id, message }: NotificationPayload) {
    const newNotification: Notification = { id, message, date: new Date() };
    return newNotification;
  }
}
