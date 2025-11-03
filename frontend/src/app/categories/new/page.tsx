"use client";

import React from "react";
import { useNewCategory } from "./hooks/useNewCategory";
import NewCategoryHeader from "./components/NewCategoryHeader";
import NewCategoryForm from "./components/NewCategoryForm";

export default function NewCategoryPage() {
  const {
    category,
    saving,
    error,
    handleInputChange,
    handleSubmit,
    handleBack,
    handleCancel,
  } = useNewCategory();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <NewCategoryHeader onBack={handleBack} />

      <NewCategoryForm
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
