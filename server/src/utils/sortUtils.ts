export interface SortCriteria {
  field: string;
  direction: "ASC" | "DESC";
}

export const buildOrderByClause = (sortBy?: string, sortOrder?: string): SortCriteria[] => {
  if (!sortBy) return [];

  const fields = sortBy.split(",");
  const orders = sortOrder ? sortOrder.split(",") : [];

  return fields.map((field, index) => ({
    field: field.trim(),
    direction: (orders[index] || "ASC").toUpperCase() as "ASC" | "DESC",
  }));
};

export const applySortToQuery = (baseQuery: string, sortCriteria: SortCriteria[]): string => {
  if (sortCriteria.length === 0) {
    return baseQuery;
  }

  const orderByClauses = sortCriteria.map((criteria) => {
    const field = `"${criteria.field}"`;
    return `${field} ${criteria.direction}`;
  });

  return `${baseQuery} ORDER BY ${orderByClauses.join(", ")}`;
};
