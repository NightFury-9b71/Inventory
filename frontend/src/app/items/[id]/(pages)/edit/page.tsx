"use client";

import React from "react";
import { useItem } from "@/components/table";
import { useParams } from "next/navigation";
import { Item } from "@/types/item";
import { getItemById, updateItem, deleteItem } from "@/services/item_service";
import EditItemHeader from "./components/EditItemHeader";
import EditItemForm from "./components/EditItemForm";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";

export default function EditItemPage() {
  const params = useParams();
  const itemId = params.id as string;

  const {
    item: office,
    loading,
    error,
    saving,
    handleInputChange,
    handleUpdateSubmit,
    handleBack,
    handleCancel,
  } = useItem<Item>({
    id: itemId,
    crud: {
      basePath: '/items',
      getById: (id) => getItemById(Number(id)),
      update: (id, data) => updateItem(Number(id), data),
      delete: (id) => deleteItem(Number(id)),
    },
  });

  // Loading State
  if (loading) {
    return <LoadingState />;
  }

  // Error State
  if (error || !office || !office.id) {
    return <ErrorState message={error || undefined} onBack={handleBack} />;
  }

  // Main Component Stack
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <EditItemHeader onBack={handleBack} />

      <EditItemForm
        item={office as Item}
        saving={saving}
        error={error}
        onInputChange={handleInputChange}
        onSubmit={handleUpdateSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}