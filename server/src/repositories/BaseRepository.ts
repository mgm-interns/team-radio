import { ObjectId } from 'bson';
import { BaseEntity } from 'entities';
import { NotFoundException } from 'exceptions';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(BaseEntity)
export class BaseRepository<Entity extends BaseEntity> extends Repository<Entity> {
  public hasId(entity: Entity) {
    return !!entity._id;
  }

  public async findById(id: string): Promise<Entity> {
    const entity = await this.findOne({ where: { _id: new ObjectId(id) } });
    if (!entity) throw new NotFoundException();
    return entity;
  }
}
