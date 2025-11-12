import { useState, useCallback } from "react";

export interface SortConfig {
  key: string;
  direction: "ASC" | "DESC";
}

export const useSortableTable = (initialSort: SortConfig[] = []) => {
  const [sortConfig, setSortConfig] = useState<SortConfig[]>(initialSort);

  const handleSort = useCallback((key: string) => {
    setSortConfig((current) => {
      const existingIndex = current.findIndex((sort) => sort.key === key);

      if (existingIndex === -1) {
        // Nova coluna - adiciona como ASC
        return [...current, { key, direction: "ASC" }];
      }

      const existing = current[existingIndex];

      if (existing.direction === "ASC") {
        // Muda para DESC
        const updated = [...current];
        updated[existingIndex] = { key, direction: "DESC" };
        return updated;
      } else {
        // Remove da ordenação
        return current.filter((sort) => sort.key !== key);
      }
    });
  }, []);

  const getSortParams = useCallback(() => {
    if (sortConfig.length === 0) return {};

    const sortBy = sortConfig.map((sort) => sort.key).join(",");
    const sortOrder = sortConfig.map((sort) => sort.direction).join(",");

    return { sortBy, sortOrder };
  }, [sortConfig]);

  const getSortIndicator = useCallback(
    (key: string) => {
      const sort = sortConfig.find((s) => s.key === key);
      if (!sort) return null;

      return {
        direction: sort.direction,
        position: sortConfig.findIndex((s) => s.key === key) + 1,
      };
    },
    [sortConfig],
  );

  const clearSort = useCallback(() => {
    setSortConfig([]);
  }, []);

  return {
    sortConfig,
    handleSort,
    getSortParams,
    getSortIndicator,
    clearSort,
  };
<<<<<<< HEAD
};
=======
};
>>>>>>> main
