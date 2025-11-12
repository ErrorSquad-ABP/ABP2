import { buildOrderByClause, applySortToQuery } from "../utils/sortUtils";

export interface QueryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export class BaseController {
  protected buildSortedQuery(
    baseQuery: string,
    options: QueryOptions,
    params: any[] = [],
  ): { query: string; params: any[] } {
    const { sortBy, sortOrder, limit, page } = options;

    const sortCriteria = buildOrderByClause(sortBy, sortOrder);
    let sortedQuery = applySortToQuery(baseQuery, sortCriteria);

    let finalParams = [...params];

    // Adicionar paginação se necessário
    if (limit !== undefined && page !== undefined) {
      const offset = (page - 1) * limit;
      sortedQuery += ` LIMIT $${finalParams.length + 1} OFFSET $${finalParams.length + 2}`;
      finalParams.push(limit, offset);
    }

    return { query: sortedQuery, params: finalParams };
  }
}