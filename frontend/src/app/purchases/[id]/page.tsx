"use client";

import React from "react";
import { useItem } from "@/components/table";
import { useParams } from "next/navigation";
import { Purchase, PurchaseFormData } from "@/types/purchase";
import { getPurchaseById, updatePurchase } from "@/services/purchase_service";
import PurchaseHeaderActions from "./components/PurchaseHeaderActions";
import PurchaseInfoCard from "./components/PurchaseInfoCard";
import PurchaseDetailsCard from "./components/PurchaseDetailsCard";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";

export default function PurchaseDetailPage() {
  const params = useParams();
  const purchaseId = params.id as string;

  const {
    item: purchase,
    loading,
    error,
    deleting,
    handleBack,
    handleEdit,
    deleteItem: handleDelete,
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

  const fullPurchase = purchase as Purchase;

  // Main Component Stack
  return (
    <div className="p-6">
      <PurchaseHeaderActions
        purchaseId={fullPurchase.id}
        itemName={fullPurchase.vendorName}
        handleBack={handleBack}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        deleting={deleting}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <PurchaseInfoCard purchase={fullPurchase} />
        <PurchaseDetailsCard purchase={fullPurchase} />
      </div>
    </div>
  );
}