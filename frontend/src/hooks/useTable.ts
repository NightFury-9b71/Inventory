import { useState, useMemo, useEffect } from 'react';

type UseTableOptions<T> = {
  data: T[];
  columns: { key: keyof T; label: string }[];
  searchableKeys?: (keyof T)[];
  filterableKeys?: (keyof T)[];
  actions?: {
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    showView?: boolean;
    showEdit?: boolean;
    showDelete?: boolean;
  };
  pagination?: {
    enabled: boolean;
    pageSize?: number;
  };
  expandable?: {
    enabled: boolean;
    childrenKey?: string;
  };
  crud?: {
    basePath: string;
    getAll?: () => Promise<T[]>;
    create?: (data: Partial<T>) => Promise<T>;
    update?: (id: string | number, data: Partial<T>) => Promise<T>;
    delete?: (id: string | number) => Promise<void>;
  };
};

export function useTable<T extends Record<string, any>>({
  data: initialData,
  columns,
  searchableKeys = [],
  filterableKeys = [],
  actions = {},
  pagination = { enabled: false, pageSize: 10 },
  crud,
  expandable = { enabled: false },
}: UseTableOptions<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(new Set());

  const filteredData = useMemo(() => {
    let result = data;

    // Apply search
    if (searchTerm && searchableKeys.length > 0) {
      result = result.filter((item) =>
        searchableKeys.some((key) =>
          String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all' && filterableKeys.includes(key as keyof T)) {
        result = result.filter((item) => {
          const itemValue = item[key];
          if (typeof itemValue === 'boolean') {
            return String(itemValue) === value;
          }
          return String(itemValue).toLowerCase().includes(value.toLowerCase());
        });
      }
    });

    return result;
  }, [data, searchTerm, filters, searchableKeys, filterableKeys]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (!pagination.enabled) return filteredData;

    const startIndex = (currentPage - 1) * (pagination.pageSize || 10);
    const endIndex = startIndex + (pagination.pageSize || 10);
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pagination]);

  const totalPages = useMemo(() => {
    if (!pagination.enabled) return 1;
    return Math.ceil(filteredData.length / (pagination.pageSize || 10));
  }, [filteredData.length, pagination]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page on filter
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleRowExpansion = (rowId: string | number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  };

  const isRowExpanded = (rowId: string | number) => {
    return expandedRows.has(rowId);
  };

  // CRUD operations
  const fetchData = async () => {
    if (!crud?.getAll) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await crud.getAll();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const createItem = async (itemData: Partial<T>) => {
    if (!crud?.create) return;
    setIsCreating(true);
    try {
      const newItem = await crud.create(itemData);
      setData(prev => [...prev, newItem]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create item');
    } finally {
      setIsCreating(false);
    }
  };

  const updateItem = async (id: string | number, itemData: Partial<T>) => {
    if (!crud?.update) return;
    setIsUpdating(true);
    try {
      const updatedItem = await crud.update(id, itemData);
      setData(prev => prev.map(item => (item.id === id ? updatedItem : item)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteItem = async (id: string | number) => {
    if (!crud?.delete) return;
    setIsDeleting(true);
    try {
      await crud.delete(id);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    } finally {
      setIsDeleting(false);
    }
  };

  // Load data on mount if CRUD is configured
  useEffect(() => {
    if (crud?.getAll && data.length === 0) {
      fetchData();
    }
  }, []);
  const handleView = (row: T) => {
    if (actions.onView) {
      actions.onView(row);
    } else if (crud?.basePath) {
      // Default navigation logic
      window.location.href = `${crud.basePath}/${row.id}`;
    }
  };

  const handleEdit = (row: T) => {
    if (actions.onEdit) {
      actions.onEdit(row);
    } else if (crud?.basePath) {
      // Default navigation logic
      window.location.href = `${crud.basePath}/${row.id}/edit`;
    }
  };

  const handleDelete = (row: T) => {
    if (actions.onDelete) {
      actions.onDelete(row);
    } else {
      // Use the centralized delete
      deleteItem(row.id);
    }
  };

  return {
    // Data
    data: pagination.enabled ? paginatedData : filteredData,
    totalCount: filteredData.length,
    columns,

    // State
    isLoading,
    error,
    isCreating,
    isUpdating,
    isDeleting,

    // Search & Filter
    searchTerm,
    filters,
    handleSearch,
    handleFilter,
    clearFilters,

    // Pagination
    currentPage,
    totalPages,
    handlePageChange,
    hasPagination: pagination.enabled,

    // Expansion
    expandedRows,
    toggleRowExpansion,
    isRowExpanded,
    hasExpansion: expandable?.enabled ?? false,

    // CRUD operations
    fetchData,
    createItem,
    updateItem,
    deleteItem,

    // Actions
    actions: {
      showView: actions.showView ?? true,
      showEdit: actions.showEdit ?? true,
      showDelete: actions.showDelete ?? true,
      onView: handleView,
      onEdit: handleEdit,
      onDelete: handleDelete,
    },
  };
}