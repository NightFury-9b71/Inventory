import { useState, useMemo } from "react";

export interface FilterConfig {
  key: string;
  value: string;
  options?: Array<{ value: string; label: string }>;
}

export interface UsePageTableConfig<T> {
  data: T[];
  searchKeys?: (keyof T)[];
  filters?: FilterConfig[];
  enableHierarchy?: boolean;
  customFilterFn?: (item: T, filters: Record<string, string>, searchTerm: string) => boolean;
}

export interface UsePageTableReturn<T> {
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
 * Generic hook for page table management
 * Handles search, filtering, hierarchical expansion, and common table operations
 * 
 * @example
 * // Basic usage with search and status filter
 * const tableState = usePageTable({
 *   data: categories,
 *   searchKeys: ['name', 'nameBn', 'code'],
 *   filters: [{ key: 'status', value: 'all' }]
 * });
 * 
 * @example
 * // With hierarchical support (for offices)
 * const tableState = usePageTable({
 *   data: offices,
 *   searchKeys: ['name', 'nameBn', 'code'],
 *   filters: [
 *     { key: 'type', value: 'all' },
 *     { key: 'status', value: 'all' }
 *   ],
 *   enableHierarchy: true
 * });
 */
export function usePageTable<T extends Record<string, any>>({
  data,
  searchKeys = [],
  filters: initialFilters = [],
  enableHierarchy = false,
  customFilterFn
}: UsePageTableConfig<T>): UsePageTableReturn<T> {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>(
    initialFilters.reduce((acc, f) => ({ ...acc, [f.key]: f.value }), {})
  );
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // Toggle expand/collapse for hierarchical items
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

  // Default filter function
  const defaultFilterFn = (item: T): boolean => {
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

      // Handle status filter (common pattern)
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
    const filterFn = customFilterFn 
      ? (item: T) => customFilterFn(item, filters, searchTerm)
      : defaultFilterFn;

    return data.filter(filterFn);
  }, [data, searchTerm, filters, searchKeys, customFilterFn]);

  // Generate filter options dynamically
  const filterOptions = useMemo(() => {
    const options: Record<string, Array<{ value: string; label: string }>> = {};

    initialFilters.forEach((filter) => {
      if (filter.options) {
        options[filter.key] = filter.options;
      } else if (filter.key === "status") {
        // Default status options
        options[filter.key] = [
          { value: "all", label: "All" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" }
        ];
      } else {
        // Auto-generate options from data
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
