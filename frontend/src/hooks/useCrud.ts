"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface CrudConfig<T extends { id: string | number } = { id: string | number }> {
  entityName: string;
  basePath: string;
  getAllQueryKey: (string | number)[];
  getByIdQueryKey: (id: string | number) => (string | number)[];
  api: {
    getAll: () => Promise<T[]>;
    getById?: (id: string | number) => Promise<T>;
    create?: (data: Partial<T>) => Promise<T>;
    update?: (id: string | number, data: Partial<T>) => Promise<T>;
    delete?: (id: string | number) => Promise<void>;
  };
  permissions?: {
    create?: string;
    update?: string;
    delete?: string;
  };
}

export interface UseCrudOptions {
  id?: string | number;
  skipFetch?: boolean;
  onSuccess?: {
    create?: (item: any) => void;
    update?: (item: any) => void;
    delete?: () => void;
  };
}

export function useCrud<T extends { id: string | number }>(config: CrudConfig<T>, options: UseCrudOptions = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);

  const { id, skipFetch = false, onSuccess } = options;

  // Query for fetching all items
  const listQuery = useQuery<T[], Error>({
    queryKey: config.getAllQueryKey,
    queryFn: () => config.api.getAll(),
    enabled: !id || skipFetch,
  });

  // Query for fetching single item
  const detailQuery = useQuery<T, Error>({
    queryKey: id ? config.getByIdQueryKey(id) : [],
    queryFn: () => config.api.getById!(id!),
    enabled: !!id && !skipFetch && !!config.api.getById,
  });

  // Create mutation
  const createMutation = useMutation<T, Error, Partial<T>>({
    mutationFn: (data) => config.api.create!(data),
    onSuccess: (newItem) => {
      queryClient.invalidateQueries({ queryKey: config.getAllQueryKey });
      toast.success(`${config.entityName} created successfully!`);
      onSuccess?.create?.(newItem);
    },
    onError: () => {
      toast.error(`Failed to create ${config.entityName.toLowerCase()}`);
    },
  });

  // Update mutation
  const updateMutation = useMutation<T, Error, { id: string | number; data: Partial<T> }>({
    mutationFn: ({ id, data }) => config.api.update!(id, data),
    onSuccess: (updatedItem, { id }) => {
      queryClient.invalidateQueries({ queryKey: config.getByIdQueryKey(id) });
      queryClient.invalidateQueries({ queryKey: config.getAllQueryKey });
      toast.success(`${config.entityName} updated successfully!`);
      onSuccess?.update?.(updatedItem);
    },
    onError: () => {
      toast.error(`Failed to update ${config.entityName.toLowerCase()}`);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation<void, Error, string | number>({
    mutationFn: (itemId) => config.api.delete!(itemId),
    onSuccess: (_, itemId) => {
      queryClient.invalidateQueries({ queryKey: config.getByIdQueryKey(itemId) });
      queryClient.invalidateQueries({ queryKey: config.getAllQueryKey });
      toast.success(`${config.entityName} deleted successfully!`);
      onSuccess?.delete?.();
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    },
    onError: () => {
      toast.error(`Failed to delete ${config.entityName.toLowerCase()}`);
    },
  });

  // Navigation handlers
  const handleView = (item: T & { id: string | number }) => {
    router.push(`${config.basePath}/${item.id}`);
  };

  const handleEdit = (item: T & { id: string | number }) => {
    router.push(`${config.basePath}/${item.id}/edit`);
  };

  const handleBack = () => {
    router.back();
  };

  const handleCreate = () => {
    router.push(`${config.basePath}/new`);
  };

  // Delete handlers
  const handleDelete = (item: T) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteMutation.mutate(itemToDelete.id);
    }
  };

  // Delete confirmation dialog state
  const deleteDialogState = {
    open: deleteDialogOpen,
    item: itemToDelete,
    isDeleting: deleteMutation.isPending,
    onOpenChange: setDeleteDialogOpen,
    onConfirm: confirmDelete,
  };

  return {
    // Data
    items: listQuery.data ?? [],
    item: detailQuery.data,
    isLoading: listQuery.isLoading || detailQuery.isLoading,
    error: listQuery.error || detailQuery.error,

    // Mutations
    createItem: createMutation.mutate,
    updateItem: (id: string | number, data: Partial<T>) => updateMutation.mutate({ id, data }),
    deleteItem: handleDelete,

    // Mutation states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    // Navigation handlers
    handleView,
    handleEdit,
    handleBack,
    handleCreate,

    // Delete dialog state
    deleteDialogState,
  };
}