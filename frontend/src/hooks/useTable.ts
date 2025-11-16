import { useState, useMemo, useEffect, useCallback, useRef } from 'react';

const POSSIBLE_COLLECTION_KEYS = ['data', 'items', 'content', 'results', 'rows'] as const;

type ErrorWithStatus = {
  response?: {
    status?: number;
  };
};

const getErrorStatus = (error: unknown): number | undefined => {
  if (typeof error === 'object' && error !== null) {
    return (error as ErrorWithStatus).response?.status;
  }
  return undefined;
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  return error instanceof Error ? error.message : fallback;
};

const normalizeTableData = <T,>(value: unknown): T[] => {
  if (Array.isArray(value)) {
    return value as T[];
  }

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    for (const key of POSSIBLE_COLLECTION_KEYS) {
      const candidate = record[key];
      if (Array.isArray(candidate)) {
        return candidate as T[];
      }
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    console.warn('[useTable] Expected array data but received:', value);
  }

  return [];
};

type UseTableOptions<T extends { id: string | number }> = {
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
    childrenKey?: keyof T & string;
  };
  crud?: {
    basePath: string;
    getAll?: () => Promise<T[] | Record<string, unknown>>;
    create?: (data: Partial<T>) => Promise<T>;
    update?: (id: string | number, data: Partial<T>) => Promise<T>;
    delete?: (id: string | number) => Promise<void>;
  };
};

export function useTable<T extends { id: string | number }>({
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
  const [data, setData] = useState<T[]>(Array.isArray(initialData) ? initialData : []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(new Set());
  const hasFetchedRef = useRef(false);
  const getAllFn = crud?.getAll;

  const resolveError = useCallback(
    (err: unknown, fallback: string) => {
      const status = getErrorStatus(err);
      if (status === 401) {
        setError('Authentication required. Please log in.');
      } else {
        setError(getErrorMessage(err, fallback));
      }
    },
    []
  );

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
        const typedKey = key as keyof T;
        result = result.filter((item) => {
          const itemValue = item[typedKey];
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
  const fetchData = useCallback(async () => {
    if (!getAllFn) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await getAllFn();
      setData(normalizeTableData<T>(result));
    } catch (err) {
      resolveError(err, 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [getAllFn, resolveError]);

  const createItem = async (itemData: Partial<T>) => {
    if (!crud?.create) return;
    setIsCreating(true);
    try {
      const newItem = await crud.create(itemData);
      setData(prev => [...prev, newItem]);
    } catch (err) {
      resolveError(err, 'Failed to create item');
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
      resolveError(err, 'Failed to update item');
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
      resolveError(err, 'Failed to delete item');
    } finally {
      setIsDeleting(false);
    }
  };

  // Load data on mount if CRUD is configured
  useEffect(() => {
    if (!getAllFn || hasFetchedRef.current) {
      return;
    }
    hasFetchedRef.current = true;
    fetchData();
  }, [getAllFn, fetchData]);
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