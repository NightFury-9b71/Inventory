"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryFormData } from "@/types/item";
import { createCategory } from "@/services/category_service";
import NewCategoryHeader from "./components/NewCategoryHeader";
import NewCategoryForm from "./components/NewCategoryForm";

export default function NewCategoryPage() {
  const router = useRouter();
  const [category, setCategory] = useState<CategoryFormData>({
    name: "",
    nameBn: "",
    code: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: any) => {
    setCategory(prev => ({ ...prev, [field]: value }));
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await createCategory(category);
      router.push('/categories');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    router.push('/categories');
  };

  const handleCancel = () => {
    router.push('/categories');
  };

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
