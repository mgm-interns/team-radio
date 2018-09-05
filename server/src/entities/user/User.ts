import * as Bcrypt from 'bcrypt-nodejs';
import { IdentifiableUser } from 'config';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { AuthToken } from '.';
import { BaseEntity } from '..';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity implements IdentifiableUser {
  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
  email: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Field(type => AuthToken)
  @Column(type => AuthToken)
  authToken: AuthToken;

  @Field({ nullable: true })
  @Column()
  firstname: string;

  @Field({ nullable: true })
  @Column()
  lastname: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  country: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatarUrl: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  coverUrl: string;

  @Field()
  @Column({ default: 0 })
  reputation: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  facebookId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  googleId: string;

  // TODO: Deal with it
  // @Field(type => [])
  // @Column()
  // favouriteSongs: [];

  // TODO: Deal with it
  // @Field(type => [])
  // @Column()
  // myStations: [];

  /**
   * Logs the recent interacting of user in some stations
   */
  // TODO: Deal with it
  // @Field(type => [])
  // @Column()
  // history: [];

  public isUser() {
    return true;
  }

  public isAnonymous() {
    return false;
  }

  public generateUsernameFromEmail() {
    // Take all characters before @
    this.username = this.email.split('@')[0];
  }

  public generatePassword(rawPassword: string) {
    this.password = Bcrypt.hashSync(rawPassword, Bcrypt.genSaltSync(8));
  }

  public isValidPassword(rawPassword: string): boolean {
    return Bcrypt.compareSync(rawPassword, this.password);
  }

  public generateToken() {
    const secret = `${this.username}${this.email}${Date.now()}`;
    const token = Bcrypt.hashSync(secret, Bcrypt.genSaltSync(4));
    const refreshToken = Bcrypt.hashSync(secret, Bcrypt.genSaltSync(2));
    this.authToken = new AuthToken(token, refreshToken);
  }

  public isValidToken(token: string = this.authToken.token) {
    if (token === this.authToken.token) {
      const now = new Date().getTime();
      if (now < this.authToken.expiredAt) {
        return true;
      }
    }
    return false;
  }

  public isValidRefreshToken(refreshToken: string = this.authToken.refreshToken) {
    if (refreshToken === this.authToken.refreshToken) {
      const now = new Date().getTime();
      if (now < this.authToken.refreshTokenExpiredAt) {
        return true;
      }
    }
    return false;
  }
}
