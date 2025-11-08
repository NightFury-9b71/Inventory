"use client";

import React from "react";
import { useItem } from "@/components/table";
import { useParams } from "next/navigation";
import { ItemCategory } from "@/types/item";
import { getCategoryById, deleteCategory } from "@/services/category_service";
import HeaderActions from "./components/HeaderActions";
import CategoryInfoCard from "./components/CategoryInfoCard";
import CategoryDetailsCard from "./components/CategoryDetailsCard";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";

export default function CategoryDetailPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const {
    item: category,
    loading,
    error,
    deleting,
    handleBack,
    handleEdit,
    deleteItem: handleDelete,
  } = useItem<ItemCategory>({
    id: categoryId,
    crud: {
      basePath: '/categories',
      getById: (id) => getCategoryById(Number(id)),
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

  const fullCategory = category as ItemCategory;

  // Main Component Stack
  return (
    <div>
      <HeaderActions
        categoryName={fullCategory.name}
        handleBack={handleBack}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        deleting={deleting}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <CategoryInfoCard category={fullCategory} />
        <CategoryDetailsCard category={fullCategory} />
      </div>
    </div>
  );
}