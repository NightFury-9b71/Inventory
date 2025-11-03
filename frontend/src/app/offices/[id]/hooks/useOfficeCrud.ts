"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { useOfficeById } from "@/hooks/queries/useOfficeById";
import { useCreateOffice } from "@/hooks/queries/useCreateOffice";
import { useUpdateOffice } from "@/hooks/queries/useUpdateOffice";
import { useDeleteOffice } from "@/hooks/queries/useDeleteOffice";
import { Office } from "@/types/office";

type UseOfficeCrudOptions = {
  /** If true, starts with empty form data for creating a new office */
  createMode?: boolean;
  /** If true, doesn't fetch office data (used for add-child) */
  skipFetch?: boolean;
};

/**
 * Shared CRUD/business logic for office pages under /offices/[id]
 * Provides: fetched office state, input helpers, create/update submit handlers,
 * and navigation handlers used by the different pages. Each page uses this hook
 * directly and accesses only the handlers/data they need for their action buttons.
 */
export function useOfficeCrud(options: UseOfficeCrudOptions = {}) {
  const { createMode = false, skipFetch = false } = options;
  const params = useParams();
  const router = useRouter();
  const officeId = params.id as string;

  const {
    data: fetchedOffice,
    isLoading: loading,
    error: queryError,
  } = useOfficeById(officeId, !skipFetch);

  const [office, setOffice] = useState<any>(
    createMode
      ? {
          name: "",
          nameBn: "",
          code: "",
          type: "",
          description: "",
          orderIndex: "",
          isActive: true,
        }
      : null
  );

  useEffect(() => {
    if (!createMode && fetchedOffice) setOffice(fetchedOffice);
  }, [fetchedOffice, createMode]);

  const createMutation = useCreateOffice();
  const updateMutation = useUpdateOffice(Number(officeId));
  const deleteMutation = useDeleteOffice(Number(officeId));

  const error = queryError ? "Failed to load office details" : null;

  const handleInputChange = (field: string, value: any) => {
    setOffice((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        ...office,
        orderIndex: office.orderIndex ? Number(office.orderIndex) : undefined,
        parentId: Number(officeId),
      };

      await createMutation.mutateAsync(payload);

      toast.success("Child office added successfully!", {
        description: "The new office has been created under the selected parent.",
      });

      router.push(`/offices/${officeId}`);
    } catch (err) {
      toast.error("Failed to add child office", {
        description: "Please check your input and try again.",
      });
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!office) return;
    try {
      await updateMutation.mutateAsync(office as Partial<Office>);
      
      toast.success("Office updated successfully!", {
        description: "The office details have been updated.",
      });
      
      router.push(`/offices/${officeId}`);
    } catch (err) {
      console.error("Failed to update office", err);
      toast.error("Failed to update office", {
        description: "Please check your input and try again.",
      });
    }
  };

  const handleBack = () => router.back();
  const handleCancel = () => router.push(`/offices/${officeId}`);
  const handleEdit = () => router.push(`/offices/${officeId}/edit`);
  const handleAddChild = () => router.push(`/offices/${officeId}/add-child`);
  const handleNavigateToChild = (id: number) => router.push(`/offices/${id}`);
  
  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
      
      toast.success("Office deleted successfully!", {
        description: "The office has been permanently deleted.",
      });
      
      router.push("/offices");
    } catch (err: any) {
      console.error("Failed to delete office", err);
      toast.error("Failed to delete office", {
        description: err?.response?.data?.message || "Please try again or contact support.",
      });
    }
  };

  return {
    office,
    setOffice,
    loading,
    error: error || (createMutation.error || updateMutation.error || deleteMutation.error ? "An operation failed" : null),
    saving: createMutation.isPending || updateMutation.isPending,
    deleting: deleteMutation.isPending,
    officeId,
    handleInputChange,
    handleCreateSubmit,
    handleUpdateSubmit,
    handleDelete,
    handleBack,
    handleCancel,
    handleEdit,
    handleAddChild,
    handleNavigateToChild,
  };
}
