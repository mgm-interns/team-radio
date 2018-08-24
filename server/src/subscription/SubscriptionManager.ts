import { Logger } from 'services';
import { Inject, Service } from 'typedi';

@Service()
export class SubscriptionManager {
  @Inject()
  private logger: Logger;
  getOnConnectingHandler() {
    return (headers: SubscriptionHeader) => {
      this.logger.info('Client connecting');
      return headers;
    };
  }

  getOnDisconnectingHandler() {
    return () => {
      this.logger.info('Client disconnecting');
    };
  }
}

interface SubscriptionHeader {
  token?: string;
  refreshToken?: string;
  byPassToken?: string;
}
