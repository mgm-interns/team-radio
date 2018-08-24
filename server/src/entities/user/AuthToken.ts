import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { TokenHelper } from 'utils';

@ObjectType()
@Entity()
export class AuthToken {
  constructor(token: string, refreshToken: string) {
    this.token = token;
    this.refreshToken = refreshToken;
    this.expiredAt = TokenHelper.generateExpiredTime();
    this.refreshTokenExpiredAt = TokenHelper.generateRefreshTokenExpiredTime();
  }

  @Field()
  @Column()
  token: string;

  @Field()
  @Column()
  refreshToken: string;

  @Column()
  expiredAt: number;

  @Column()
  refreshTokenExpiredAt: number;
}
