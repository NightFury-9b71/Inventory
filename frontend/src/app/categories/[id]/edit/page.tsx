"use client";

import React from "react";
import { useItem } from "@/components/table";
import { useParams } from "next/navigation";
import { ItemCategory } from "@/types/item";
import { getCategoryById, updateCategory, deleteCategory } from "@/services/category_service";
import EditCategoryHeader from "./components/EditCategoryHeader";
import EditCategoryForm from "./components/EditCategoryForm";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

export default function EditCategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const {
    item: category,
    loading,
    error,
    saving,
    handleInputChange,
    handleUpdateSubmit,
    handleBack,
    handleCancel,
  } = useItem<ItemCategory>({
    id: categoryId,
    crud: {
      basePath: '/categories',
      getById: (id) => getCategoryById(Number(id)),
      update: (id, data) => updateCategory(Number(id), data),
      delete: (id) => deleteCategory(Number(id)),
    },
  });

  // Loading State
  if (loading) {
    return <LoadingState />;
  }

  // Error State
  if (error || !category || !category.id) {
    return <ErrorState message={error || undefined} onBack={handleBack} />;
  }

  // Main Component Stack
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <EditCategoryHeader onBack={handleBack} />

      <EditCategoryForm
        category={category as ItemCategory}
        saving={saving}
        error={error}
        onInputChange={handleInputChange}
        onSubmit={handleUpdateSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
