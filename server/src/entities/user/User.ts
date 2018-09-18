import * as Bcrypt from 'bcrypt-nodejs';
import { IsEmail, IsNumber, IsUrl, MaxLength, MinLength, IsOptional } from 'class-validator';
import { IdentifiableUser } from 'config';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ObjectID } from 'typeorm';
import { AuthToken, Role } from '.';
import { BaseEntity } from '..';
import { UserRole } from './Role';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity implements IdentifiableUser {
  @MinLength(6)
  @MaxLength(64)
  @IsEmail()
  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
  email: string;

  @MinLength(6)
  @MaxLength(32)
  @Field()
  @Column({ unique: true })
  username: string;

  @MinLength(6)
  @Column()
  password: string;

  @Column(type => AuthToken)
  authToken: AuthToken;

  @IsOptional()
  @Field({ nullable: true })
  @Column()
  firstname: string;

  @IsOptional()
  @Field({ nullable: true })
  @Column()
  lastname: string;

  @IsOptional()
  @Field({ nullable: true })
  @Column({ nullable: true })
  country: string;

  @IsOptional()
  @Field({ nullable: true })
  @Column({ nullable: true })
  city: string;

  @IsOptional()
  @Field({ nullable: true })
  @Column({ nullable: true })
  bio: string;

  @IsOptional()
  @IsUrl()
  @Field({ nullable: true })
  @Column({ nullable: true })
  avatarUrl: string;

  @IsOptional()
  @IsUrl()
  @Field({ nullable: true })
  @Column({ nullable: true })
  coverUrl: string;

  @IsNumber()
  @Field()
  @Column({ default: 0 })
  reputation: number = 0;

  @IsOptional()
  @Field({ nullable: true })
  @Column({ nullable: true })
  facebookId: string;

  @IsOptional()
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

  @Field(type => [Role], { nullable: true })
  @Column(type => Role)
  roles?: Role[];

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

  public isAdmin() {
    if (this.roles) {
      const matchedRole = this.roles.find(role => role.role === UserRole.ADMIN);
      if (matchedRole) {
        return true;
      }
    }
    return false;
  }

  public isStationOwner(stationId: string) {
    if (this.roles) {
      const matchedRole = this.roles.find(
        role =>
          // The owner of stations
          (role.role === UserRole.STATION_OWNER && role.isMatchedStationId(stationId)) ||
          // System administrator is also the owner
          role.role === UserRole.ADMIN
      );
      if (matchedRole) {
        return true;
      }
    }
    return false;
  }
}
