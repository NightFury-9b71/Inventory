"use client";

import React from "react";
import { useEditItem } from "./hooks/useEditItem";
import EditItemHeader from "./components/EditItemHeader";
import EditItemForm from "./components/EditItemForm";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

export default function EditItemPage() {
  const {
    item,
    loading,
    error,
    saving,
    handleInputChange,
    handleSubmit,
    handleBack,
    handleCancel,
  } = useEditItem();

  // Loading State
  if (loading) {
    return <LoadingState />;
  }

  // Error State
  if (error || !item) {
    return <ErrorState message={error || undefined} onBack={handleBack} />;
  }

  // Main Component Stack
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <EditItemHeader onBack={handleBack} />

      <EditItemForm
        item={item}
        saving={saving}
        error={error}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
