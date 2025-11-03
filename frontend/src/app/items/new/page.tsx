"use client";

import React from "react";
import { useNewItem } from "./hooks/useNewItem";
import NewItemHeader from "./components/NewItemHeader";
import NewItemForm from "./components/NewItemForm";

export default function NewItemPage() {
  const {
    item,
    saving,
    error,
    handleInputChange,
    handleSubmit,
    handleBack,
    handleCancel,
  } = useNewItem();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <NewItemHeader onBack={handleBack} />

      <NewItemForm
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
