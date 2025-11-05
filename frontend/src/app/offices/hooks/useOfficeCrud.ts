"use client";

import { useCrud, CrudConfig } from "@/hooks/useCrud";
import { Office } from "@/types/office";
import {
  getOffices,
  createOffice,
  updateOffice,
  deleteOffice,
} from "@/lib/api";

export const officeKeys = {
  all: ["offices"] as const,
  lists: () => [...officeKeys.all, "list"] as const,
  list: (filter: string) => [...officeKeys.lists(), filter] as const,
  details: () => [...officeKeys.all, "detail"] as const,
  detail: (id: number) => [...officeKeys.details(), id] as const,
};

const officeCrudConfig: CrudConfig<Office> = {
  entityName: "Office",
  basePath: "/offices",
  getAllQueryKey: [...officeKeys.list("all")],
  getByIdQueryKey: (id) => [...officeKeys.detail(Number(id))],
  api: {
    getAll: getOffices,
    create: createOffice,
    update: (id, data) => updateOffice(Number(id), data),
    delete: (id) => deleteOffice(Number(id)),
  },
};

interface UseOfficeCrudOptions {
  onSuccess?: {
    create?: (office: Office) => void;
    update?: (office: Office) => void;
    delete?: () => void;
  };
}

export function useOfficeCrud(options: UseOfficeCrudOptions = {}) {
  const crud = useCrud(officeCrudConfig, options);

  return {
    // Data - alias for consistency with existing code
    offices: crud.items,
    isLoading: crud.isLoading,
    error: crud.error,

    // Mutations - alias for consistency
    createOffice: crud.createItem,
    updateOffice: crud.updateItem,
    deleteOffice: crud.deleteItem,

    // Mutation states
    isCreating: crud.isCreating,
    isUpdating: crud.isUpdating,
    isDeleting: crud.isDeleting,

    // Actions
    handleView: crud.handleView,
    handleEdit: crud.handleEdit,
    handleDelete: crud.deleteItem,

    // Delete dialog state
    deleteDialogState: crud.deleteDialogState,
  };
}