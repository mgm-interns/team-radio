import { ValidationError } from 'class-validator';
import { User } from 'entities';
import { ForbiddenException, UnprocessedEntityException, UserNotFoundException } from 'exceptions';
import { CRUDService } from 'services';
import { Arg, Authorized, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { BaseFilter, ListMetaData } from 'types';
import { BaseUserResolver } from '.';
import { ICRUDResolver } from '..';

@Resolver(of => User)
export class UserCRUDResolver extends BaseUserResolver implements ICRUDResolver<User> {
  @Inject()
  private crudService: CRUDService;

  @Query(returns => User, { name: 'User', description: 'Get user by id' })
  public async one(@Arg('id') id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new UserNotFoundException();
    return user;
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
    if (filter && filter.ids) {
      return Promise.all(filter.ids.map(id => this.userRepository.findOneOrFail(id)));
    }
    return this.userRepository.find({
      ...this.crudService.parseAllCondition(page, perPage, sortField, sortOrder, filter)
    });
  }

  // TODO: Solve .count function
  @Authorized()
  @Query(returns => ListMetaData, { name: '_allUsersMeta', description: 'Get all the users in system.' })
  public async meta(
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string,
    @Arg('filter', type => BaseFilter, { nullable: true }) filter?: BaseFilter
  ): Promise<ListMetaData> {
    const [users, total] = await this.userRepository.findAndCount({
      ...this.crudService.parseAllCondition(page, perPage, sortField, sortOrder, filter)
    });
    return new ListMetaData(total);
  }

  @Authorized()
  @Mutation(returns => User, { name: 'createUser', description: 'Create a user in system.' })
  public async create(
    @Arg('password') password: string,
    @Arg('username', { nullable: true }) username?: string,
    @Arg('email', { nullable: true }) email?: string,
    @Arg('firstname', { nullable: true }) firstname?: string,
    @Arg('lastname', { nullable: true }) lastname?: string,
    @Arg('city', { nullable: true }) city?: string,
    @Arg('country', { nullable: true }) country?: string,
    @Arg('avatarUrl', { nullable: true }) avatarUrl?: string,
    @Arg('coverUrl', { nullable: true }) coverUrl?: string
  ): Promise<User> {
    if (!email && !username) throw new ForbiddenException('Username OR email is required');

    const existedUser = await this.userRepository.findByUsernameOrEmail({ email, username });
    if (existedUser) throw new ForbiddenException('Username or Email has been taken.');

    const user = this.userRepository.create({ email, firstname, lastname, city, country, avatarUrl, coverUrl });
    if (password) {
      if (password.length >= 6 && password.length <= 32) user.generatePassword(password);
      else {
        const error = new ValidationError();
        error.property = 'password';
        error.constraints = {
          minLength: 'Password must be longer than 6 characters',
          maxLength: 'Password must not be longer than 32 characters'
        };
        error.value = password;
        error.children = [];
        throw new UnprocessedEntityException('Can not save User', [error]);
      }
    }
    if (username) user.username = username;
    else user.generateUsernameFromEmail();

    return this.userRepository.saveOrFail(user);
  }

  @Authorized()
  @Mutation(returns => User, { name: 'updateUser', description: 'Update a user in system.' })
  public async update(
    @Arg('id') id: string,
    @Arg('username', { nullable: true }) username?: string,
    @Arg('email', { nullable: true }) email?: string,
    @Arg('firstname', { nullable: true }) firstname?: string,
    @Arg('lastname', { nullable: true }) lastname?: string,
    @Arg('city', { nullable: true }) city?: string,
    @Arg('country', { nullable: true }) country?: string,
    @Arg('avatarUrl', { nullable: true }) avatarUrl?: string,
    @Arg('coverUrl', { nullable: true }) coverUrl?: string
  ): Promise<User> {
    const user = await this.userRepository.findOneOrFail(id);
    if (username) user.username = username;
    if (email) user.email = email;
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (city) user.city = city;
    if (country) user.country = country;
    if (avatarUrl) user.avatarUrl = avatarUrl;
    if (coverUrl) user.coverUrl = coverUrl;

    return this.userRepository.saveOrFail(user);
  }

  @Authorized()
  @Mutation(returns => User, { name: 'deleteUser', description: 'Delete a user in system.' })
  public async delete(@Arg('id') id: string): Promise<User> {
    const user = await this.userRepository.findOneOrFail(id);
    await this.userRepository.remove(user);
    return user;
  }
}
