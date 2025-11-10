"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ItemFormData } from "@/types/item";
import { createItem } from "@/services/item_service";
import NewItemHeader from "./components/NewItemHeader";
import NewItemForm from "./components/NewItemForm";

export default function NewItemPage() {
  const router = useRouter();
  const [item, setItem] = useState<ItemFormData>({
    name: "",
    nameBn: "",
    categoryId: 0,
    code: "",
    description: "",
    unitId: 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: any) => {
    setItem(prev => ({ ...prev, [field]: value }));
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await createItem(item);
      router.push('/items');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create item');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    router.push('/items');
  };

  const handleCancel = () => {
    router.push('/items');
  };

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