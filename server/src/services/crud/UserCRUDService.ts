import { ValidationError } from 'class-validator';
import { DataAccess } from 'config';
import { User } from 'entities';
import { ForbiddenException, UnprocessedEntityException, UserNotFoundException } from 'exceptions';
import { UserRepository } from 'repositories';
import { Container, Service } from 'typedi';
import { BaseFilter } from 'types';
import { BaseCRUDService } from '.';

@Service()
export class UserCRUDService extends BaseCRUDService {
  public async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new UserNotFoundException();
    return user;
  }

  public async findAllAndCount(
    page?: number,
    perPage?: number,
    sortField?: string,
    sortOrder?: string,
    filter?: BaseFilter
  ): Promise<[User[], number]> {
    if (filter && filter.ids) {
      const total = filter.ids.length;
      const entities = await Promise.all(filter.ids.map(id => this.userRepository.findOneOrFail(id)));
      return [entities, total];
    }
    return this.userRepository.findAndCount({
      ...this.parseAllCondition(page, perPage, sortField, sortOrder, filter)
    });
  }

  public async create(
    password: string,
    username?: string,
    email?: string,
    firstname?: string,
    lastname?: string,
    name?: string,
    city?: string,
    country?: string,
    avatarUrl?: string,
    coverUrl?: string
  ): Promise<User> {
    if (!email && !username) throw new ForbiddenException('Username OR email is required');

    const existedUser = await this.userRepository.findByUsernameOrEmail({ email, username });
    if (existedUser) throw new ForbiddenException('Username or Email has been taken.');

    const user = this.userRepository.create({ email, firstname, lastname, name, city, country, avatarUrl, coverUrl });
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

  public async update(
    id: string,
    username?: string,
    email?: string,
    firstname?: string,
    lastname?: string,
    name?: string,
    city?: string,
    country?: string,
    avatarUrl?: string,
    coverUrl?: string
  ): Promise<User> {
    const user = await this.userRepository.findOneOrFail(id);
    if (username) user.username = username;
    if (email) user.email = email;
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (name) user.name = name;
    if (city) user.city = city;
    if (country) user.country = country;
    if (avatarUrl) user.avatarUrl = avatarUrl;
    if (coverUrl) user.coverUrl = coverUrl;

    return this.userRepository.saveOrFail(user);
  }

  public async delete(id: string): Promise<User> {
    const user = await this.userRepository.findOneOrFail(id);
    await this.userRepository.remove(user);
    return user;
  }

  private get userRepository(): UserRepository {
    return Container.get(DataAccess).getRepository(UserRepository);
  }
}
