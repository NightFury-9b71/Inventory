"use client";

import React from "react";
import { useEditCategory } from "./hooks/useEditCategory";
import EditCategoryHeader from "./components/EditCategoryHeader";
import EditCategoryForm from "./components/EditCategoryForm";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

export default function EditCategoryPage() {
  const {
    category,
    loading,
    error,
    saving,
    handleInputChange,
    handleSubmit,
    handleBack,
    handleCancel,
  } = useEditCategory();

  // Loading State
  if (loading) {
    return <LoadingState />;
  }

  // Error State
  if (error || !category) {
    return <ErrorState message={error || undefined} onBack={handleBack} />;
  }

  // Main Component Stack
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <EditCategoryHeader onBack={handleBack} />

      <EditCategoryForm
        category={category}
        saving={saving}
        error={error}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
