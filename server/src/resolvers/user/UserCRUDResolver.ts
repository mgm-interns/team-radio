import { User, UserRole } from 'entities';
import { UserCRUDService } from 'services';
import { Arg, Authorized, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { BaseFilter, ListMetaData } from 'types';
import { ICRUDResolver } from '../ICRUDResolver';
import { BaseUserResolver } from './BaseUserResolver';

@Resolver(of => User)
export class UserCRUDResolver extends BaseUserResolver implements ICRUDResolver<User> {
  @Inject()
  private userCRUDService: UserCRUDService;

  @Query(returns => User, { name: 'User', description: 'Get user by id' })
  public async one(@Arg('id') id: string): Promise<User> {
    return this.userCRUDService.findOne(id);
  }

  @Authorized()
  @Query(returns => [User], { name: 'allUsers', description: 'Get all the users in system.' })
  public async all(
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string,
    @Arg('filter', type => BaseFilter, { nullable: true }) filter?: BaseFilter
  ): Promise<User[]> {
    const [entities] = await this.userCRUDService.findAllAndCount(page, perPage, sortField, sortOrder, filter);
    return entities;
  }

  @Authorized()
  @Query(returns => ListMetaData, { name: '_allUsersMeta', description: 'Get meta for all the users in system.' })
  public async meta(
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string,
    @Arg('filter', type => BaseFilter, { nullable: true }) filter?: BaseFilter
  ): Promise<ListMetaData> {
    const [entities, total] = await this.userCRUDService.findAllAndCount(page, perPage, sortField, sortOrder, filter);
    return new ListMetaData(total);
  }

  @Authorized([UserRole.ADMIN])
  @Mutation(returns => User, { name: 'createUser', description: 'Create a user in system.' })
  public async create(
    @Arg('password') password: string,
    @Arg('username', { nullable: true }) username?: string,
    @Arg('email', { nullable: true }) email?: string,
    @Arg('firstname', { nullable: true }) firstname?: string,
    @Arg('lastname', { nullable: true }) lastname?: string,
    @Arg('name', { nullable: true }) name?: string,
    @Arg('city', { nullable: true }) city?: string,
    @Arg('country', { nullable: true }) country?: string,
    @Arg('avatarUrl', { nullable: true }) avatarUrl?: string,
    @Arg('coverUrl', { nullable: true }) coverUrl?: string
  ): Promise<User> {
    return this.userCRUDService.create(
      password,
      username,
      email,
      firstname,
      lastname,
      name,
      city,
      country,
      avatarUrl,
      coverUrl
    );
  }

  @Authorized([UserRole.ADMIN])
  @Mutation(returns => User, { name: 'updateUser', description: 'Update a user in system.' })
  public async update(
    @Arg('id') id: string,
    @Arg('password', { nullable: true }) password?: string,
    @Arg('username', { nullable: true }) username?: string,
    @Arg('email', { nullable: true }) email?: string,
    @Arg('firstname', { nullable: true }) firstname?: string,
    @Arg('lastname', { nullable: true }) lastname?: string,
    @Arg('name', { nullable: true }) name?: string,
    @Arg('city', { nullable: true }) city?: string,
    @Arg('country', { nullable: true }) country?: string,
    @Arg('avatarUrl', { nullable: true }) avatarUrl?: string,
    @Arg('coverUrl', { nullable: true }) coverUrl?: string
  ): Promise<User> {
    return this.userCRUDService.update(
      id,
      password,
      username,
      email,
      firstname,
      lastname,
      name,
      city,
      country,
      avatarUrl,
      coverUrl
    );
  }

  @Authorized([UserRole.ADMIN])
  @Mutation(returns => User, { name: 'deleteUser', description: 'Delete a user in system.' })
  public async delete(@Arg('id') id: string): Promise<User> {
    return this.userCRUDService.delete(id);
  }
}
