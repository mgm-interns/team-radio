import { User } from 'entities';
import { UserRepository } from 'repositories';
import { Logger } from 'services';
import { AnonymousUser } from 'subscription';
import { IContext, Tokens } from '.';

export class Context implements IContext {
  public user: User | AnonymousUser | undefined;

  constructor(private logger: Logger, private userRepository: UserRepository) {}

  public toObject() {
    return {
      user: this.user
    };
  }

  public async setUserFromTokens({ token, refreshToken, byPassToken, clientId }: Tokens = {}) {
    if (process.env.NODE_ENV === 'development') {
      if (byPassToken) {
        this.logger.info(`Attempt to login with byPassToken`);
        this.user = await this.getUserFromByPassToken(byPassToken);
        // if byPassToken does not work, give it another try with authToken
        if (this.user) return;
      }
    }
    if (token) {
      this.logger.info('Request tokens', { token, refreshToken });
      this.user = await this.getUserFromAuthToken(token, refreshToken);
      return;
    }
    if (clientId) {
      this.user = new AnonymousUser(clientId);
    }
  }

  /**
   * Perform an normal JWT with token and refreshToken to authenticate user
   * Best for production
   */
  private async getUserFromAuthToken(token: string, refreshToken?: string) {
    const user = await this.userRepository.findByAuthToken(token);
    // return user not found
    if (!user) return undefined;
    this.logger.info(`Attempt to login with user "${user.username}" by authToken`);
    // return user when the token is valid
    if (user.isValidToken()) {
      this.logger.info(`"${user.username}" has a valid token, login successful!`);
      return user;
    }
    this.logger.info(`"${user.username}" has an invalid token, start checking refreshToken...`);
    // if the token is invalid, check the refresh token, if it is either invalid, return user not found
    if (!user.isValidRefreshToken(refreshToken)) return undefined;
    this.logger.info(`"${user.username}" has a valid refreshToken, start expand token's lifetime`);
    // if the refresh token still valid, expand token & refreshToken lifetime.
    const updatedUser = await this.userRepository.updateTokenLifeTime(user);
    this.logger.info(`"${user.username}" token Lifetime has been expanded`, user);
    // Return valid user
    return updatedUser;
  }

  /**
   * Perform an quick & dirty login in to the system by proving correct token matcher that contains userId
   * Best for development
   */
  private async getUserFromByPassToken(byPassToken: string) {
    const tokenValidationRegex = /^Teamradio (.*)/;
    this.logger.info(`Start validating byPassToken`);
    if (tokenValidationRegex.test(byPassToken)) {
      this.logger.info(`Validation successful`);
      const [originalString, userId] = tokenValidationRegex.exec(byPassToken) as string[];
      const user = await this.userRepository.findOne(userId);
      if (user) {
        this.logger.info(`"${user.username}" has a valid byPassToken, login`);
        return user;
      }
    }
    this.logger.info(`Invalid byPassToken, logout`);
    return undefined;
  }
}
