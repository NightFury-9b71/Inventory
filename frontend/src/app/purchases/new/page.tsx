"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PurchaseFormData } from "@/types/purchase";
import { createPurchase } from "@/services/purchase_service";
import { useAuth } from "@/contexts/AuthContext";
import NewPurchaseHeader from "./components/NewPurchaseHeader";
import NewPurchaseForm from "./components/NewPurchaseForm";

export default function NewPurchasePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [purchase, setPurchase] = useState<PurchaseFormData>({
    itemId: 0,
    quantity: 0,
    unitPrice: 0,
    vendorName: "",
    vendorContact: "",
    purchaseDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    invoiceNumber: "",
    remarks: "",
    purchasedById: user?.id ? parseInt(user.id) : 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: any) => {
    setPurchase(prev => ({ ...prev, [field]: value }));
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await createPurchase(purchase);
      router.push('/purchases');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create purchase');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    router.push('/purchases');
  };

  const handleCancel = () => {
    router.push('/purchases');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <NewPurchaseHeader onBack={handleBack} />

      <NewPurchaseForm
        purchase={purchase}
        saving={saving}
        error={error}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}