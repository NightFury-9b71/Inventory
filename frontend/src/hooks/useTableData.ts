import { useState, useMemo } from "react";

export interface FilterConfig {
  key: string;
  value: string;
  options?: Array<{ value: string; label: string }>;
}

export interface UseTableDataConfig<T> {
  data: T[];
  searchKeys?: (keyof T)[];
  filters?: FilterConfig[];
}

export interface UseTableDataReturn<T> {
  // State
  searchTerm: string;
  filters: Record<string, string>;
  expandedItems: Set<number>;
  
  // Data
  filteredData: T[];
  
  // Options
  filterOptions: Record<string, Array<{ value: string; label: string }>>;
  
  // Actions
  setSearchTerm: (term: string) => void;
  setFilter: (key: string, value: string) => void;
  toggleExpand: (id: number) => void;
  clearFilters: () => void;
}

/**
 * Simplified hook for table data management
 * Handles search and filtering
 */
export function useTableData<T extends Record<string, any>>({
  data,
  searchKeys = [],
  filters: initialFilters = [],
}: UseTableDataConfig<T>): UseTableDataReturn<T> {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>(
    initialFilters.reduce((acc, f) => ({ ...acc, [f.key]: f.value }), {})
  );
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // Toggle expand/collapse
  const toggleExpand = (id: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Set individual filter
  const setFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Filter function
  const filterFn = (item: T): boolean => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      searchKeys.some((key) => {
        const value = item[key];
        return value && String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });

    if (!matchesSearch) return false;

    // Custom filters
    for (const [filterKey, filterValue] of Object.entries(filters)) {
      if (filterValue === "all") continue;

      // Handle status filter
      if (filterKey === "status") {
        const isActive = item.isActive;
        if (filterValue === "active" && !isActive) return false;
        if (filterValue === "inactive" && isActive) return false;
      } 
      // Handle other filters (exact match)
      else if (item[filterKey] !== filterValue) {
        return false;
      }
    }

    return true;
  };

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter(filterFn);
  }, [data, searchTerm, filters, searchKeys]);

  // Generate filter options
  const filterOptions = useMemo(() => {
    const options: Record<string, Array<{ value: string; label: string }>> = {};

    initialFilters.forEach((filter) => {
      if (filter.options) {
        options[filter.key] = filter.options;
      } else if (filter.key === "status") {
        options[filter.key] = [
          { value: "all", label: "All" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" }
        ];
      } else {
        const uniqueValues = Array.from(new Set(data.map(item => item[filter.key])))
          .filter(Boolean)
          .sort();
        
        options[filter.key] = [
          { value: "all", label: "All" },
          ...uniqueValues.map(val => ({
            value: String(val),
            label: String(val)
          }))
        ];
      }
    });

    return options;
  }, [data, initialFilters]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setFilters(
      initialFilters.reduce((acc, f) => ({ ...acc, [f.key]: f.value }), {})
    );
  };

  return {
    // State
    searchTerm,
    filters,
    expandedItems,
    
    // Data
    filteredData,
    
    // Options
    filterOptions,
    
    // Actions
    setSearchTerm,
    setFilter,
    toggleExpand,
    clearFilters,
  };
}
