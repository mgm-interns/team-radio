import { User } from 'entities';
import { UserRepository } from 'repositories';
import { Logger } from 'services';
import { AnonymousUser, RealTimeStation, RealTimeStationsManager } from 'subscription';
import { Container } from 'typedi';
import { IContext, Tokens } from './IContext';

export class Context implements IContext {
  public user: User | AnonymousUser | undefined;
  public currentStation: RealTimeStation | undefined;

  constructor(private logger: Logger, private userRepository: UserRepository) {}

  public toObject() {
    return {
      user: this.user,
      currentStation: this.currentStation
    };
  }

  public async setUserFromTokens({ token, refreshToken, byPassToken, clientId }: Tokens = {}) {
    if (process.env.NODE_ENV === 'development') {
      if (byPassToken) {
        this.logger.debug(`Attempt to login with byPassToken`);
        this.user = await this.getUserFromByPassToken(byPassToken);
        // if byPassToken does not work, give it another try with authToken
        if (this.user) {
          this.setCurrentStation(this.user as User);
          return;
        }
      }
    }
    if (token) {
      this.logger.debug('Request tokens', { token, refreshToken });
      this.user = await this.getUserFromAuthToken(token, refreshToken);
      this.setCurrentStation(this.user as User);
      return;
    }
    if (clientId) {
      this.user = new AnonymousUser(clientId);
      this.setCurrentStation(this.user as AnonymousUser);
    }
  }

  /**
   * Perform an normal JWT with token and refreshToken to authenticate user
   * Best for production
   */
  protected async getUserFromAuthToken(token: string, refreshToken?: string) {
    const user = await this.userRepository.findByAuthToken(token);
    // return user not found
    if (!user) return undefined;
    this.logger.debug(`Attempt to login with user "${user.username}" by authToken`);
    // return user when the token is valid
    if (user.isValidToken()) {
      this.logger.debug(`"${user.username}" has a valid token, login successful!`);
      return user;
    }
    this.logger.debug(`"${user.username}" has an invalid token, start checking refreshToken...`);
    // if the token is invalid, check the refresh token, if it is either invalid, return user not found
    if (!user.isValidRefreshToken(refreshToken)) return undefined;
    this.logger.debug(`"${user.username}" has a valid refreshToken, start expand token's lifetime`);
    // if the refresh token still valid, expand token & refreshToken lifetime.
    const updatedUser = await this.userRepository.updateTokenLifeTime(user);
    this.logger.debug(`"${user.username}" token Lifetime has been expanded`, user);
    // Return valid user
    return updatedUser;
  }

  /**
   * Perform an quick & dirty login by proving correct token matcher that contains userId
   * Best for development
   */
  protected async getUserFromByPassToken(byPassToken: string) {
    const tokenValidationRegex = /^Teamradio (.*)/;
    this.logger.debug(`Start validating byPassToken`);
    if (tokenValidationRegex.test(byPassToken)) {
      this.logger.debug(`Validation successful`);
      const [originalString, userId] = tokenValidationRegex.exec(byPassToken) as string[];
      const user = await this.userRepository.findOne(userId);
      if (user) {
        this.logger.debug(`"${user.username}" has a valid byPassToken, login`);
        return user;
      }
    }
    this.logger.debug(`Invalid byPassToken, logout`);
    return undefined;
  }

  protected async setCurrentStation(user: User | AnonymousUser) {
    const manager = Container.has(RealTimeStationsManager) && Container.get(RealTimeStationsManager);
    if (manager) {
      this.currentStation = manager.stations.find(station => station.isExistedUser(user));
    } else {
      this.logger.error('could not locate manager');
    }
  }
}
