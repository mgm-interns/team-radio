import { BaseEntity } from 'entities';
import { BaseFilter, ListMetaData } from 'types';

export interface ICRUDResolver<Entity extends BaseEntity> {
  one(id: string): Promise<Entity> | Entity;

  all(
    page: number,
    perPage: number,
    sortField: string,
    sortOrder: string,
    filter: BaseFilter
  ): Promise<Entity[]> | Entity[];

  meta(
    page: number,
    perPage: number,
    sortField: string,
    sortOrder: string,
    filter: BaseFilter
  ): Promise<ListMetaData> | ListMetaData;

  create(...args: any[]): Promise<Entity> | Entity;

  update(id: string, ...args: any[]): Promise<Entity> | Entity;

  delete(id: string): Promise<Entity> | Entity;
}
