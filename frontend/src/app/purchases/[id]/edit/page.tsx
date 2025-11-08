"use client";

import React from "react";
import { useItem } from "@/components/table";
import { useParams } from "next/navigation";
import { Purchase, PurchaseFormData } from "@/types/purchase";
import { getPurchaseById, updatePurchase } from "@/services/purchase_service";
import EditPurchaseHeader from "./components/EditPurchaseHeader";
import EditPurchaseForm from "./components/EditPurchaseForm";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

export default function EditPurchasePage() {
  const params = useParams();
  const purchaseId = params.id as string;

  const {
    item: purchase,
    loading,
    error,
    saving,
    handleInputChange,
    handleUpdateSubmit,
    handleBack,
    handleCancel,
  } = useItem<Purchase>({
    id: purchaseId,
    crud: {
      basePath: '/purchases',
      getById: (id) => getPurchaseById(Number(id)),
      update: (id, data) => updatePurchase(Number(id), data as Partial<PurchaseFormData>),
    },
  });

  // Loading State
  if (loading) {
    return <LoadingState />;
  }

  // Error State
  if (error || !purchase || !purchase.id) {
    return <ErrorState message={error || undefined} onBack={handleBack} />;
  }

  // Main Component Stack
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <EditPurchaseHeader onBack={handleBack} />

      <EditPurchaseForm
        purchase={purchase as Purchase}
        saving={saving}
        error={error}
        onInputChange={handleInputChange}
        onSubmit={handleUpdateSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}