import { BaseEntity } from 'entities';
import { UnprocessedEntityException } from 'exceptions';
import { EntityRepository, Repository, SaveOptions } from 'typeorm';
import { Container } from 'typedi';
import { Logger } from 'services';

@EntityRepository(BaseEntity)
export abstract class BaseRepository<Entity extends BaseEntity> extends Repository<Entity> {
  public hasId(entity: Entity) {
    return !!entity.id;
  }

  // FIXME: check an issue with typescript
  public async saveOrFail(entity: any, options?: SaveOptions): Promise<Entity> {
    const errors = await entity.validate();
    if (errors.length > 0) {
      Container.get(Logger).error('Can not save Entity', errors);
      throw new UnprocessedEntityException('Can not save Entity', errors);
    }
    return this.save(entity, options);
  }
}
