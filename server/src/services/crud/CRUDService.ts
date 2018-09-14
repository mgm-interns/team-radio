import { Logger } from 'services';
import { Inject, Service } from 'typedi';
import { BaseFilter } from 'types';

@Service()
export class CRUDService {
  @Inject()
  private logger: Logger;

  public parsePagination(page: number = 0, perPage: number = 10) {
    this.logger.debug('Parse pagination input', { page, perPage });
    const skip = perPage * (page || 0 - 1);
    const pagination = {
      take: perPage,
      skip: skip < 0 ? 0 : skip
    };
    this.logger.debug('Pagination output', pagination);
    return pagination;
  }

  public parseSortCondition(sortField?: string, sortOrder?: string) {
    this.logger.debug('Parse sort condition input', { sortField, sortOrder });
    let sortCondition = {};
    if (sortField) {
      sortCondition = {
        order: { [sortField]: sortOrder }
      };
    }
    this.logger.debug('Sort condition output', sortCondition);
    return sortCondition;
  }

  public parseFilterCondition(filter?: BaseFilter) {
    this.logger.debug('Parse filter condition input', filter);
    const filterCondition = { where: {} };
    if (filter) {
      if (filter.q) filterCondition.where = { ...filterCondition.where, $text: { $search: filter.q } };
    }
    this.logger.debug('Filter condition output', filterCondition);
    return filterCondition;
  }

  public parseAllCondition(
    page?: number,
    perPage?: number,
    sortField?: string,
    sortOrder?: string,
    filter?: BaseFilter
  ) {
    return {
      ...this.parsePagination(page, perPage),
      ...this.parseSortCondition(sortField, sortOrder),
      ...this.parseFilterCondition(filter)
    };
  }
}
