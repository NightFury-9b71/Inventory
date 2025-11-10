"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UnitFormData } from "@/types/unit";
import { createUnit } from "@/services/unit_service";
import NewUnitHeader from "./components/NewUnitHeader";
import NewUnitForm from "./components/NewUnitForm";

export default function NewUnitPage() {
  const router = useRouter();
  const [unit, setUnit] = useState<UnitFormData>({
    name: "",
    nameBn: "",
    symbol: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: any) => {
    setUnit(prev => ({ ...prev, [field]: value }));
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await createUnit(unit);
      router.push('/units');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create unit');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    router.push('/units');
  };

  const handleCancel = () => {
    router.push('/units');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <NewUnitHeader onBack={handleBack} />

      <NewUnitForm
        unit={unit}
        saving={saving}
        error={error}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}