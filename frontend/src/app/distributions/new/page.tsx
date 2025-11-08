"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DistributionFormData } from "@/types/distribution";
import { createDistribution } from "@/services/distribution_service";
import { useAuth } from "@/contexts/AuthContext";
import NewDistributionForm from "./components/NewDistributionForm";
import NewDistributionHeader from "./components/NewDistributionHeader";

export default function NewDistributionPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [distribution, setDistribution] = useState<DistributionFormData>({
    itemId: 0,
    officeId: 0,
    userId: user?.id ? parseInt(user.id) : 0,
    quantity: 0,
    dateDistributed: new Date().toISOString().split('T')[0],
    remarks: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: any) => {
    setDistribution(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await createDistribution(distribution);
      router.push('/distributions');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create distribution');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    router.push('/distributions');
  };

  const handleCancel = () => {
    router.push('/distributions');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <NewDistributionHeader onBack={handleBack} />

      <NewDistributionForm
        distribution={distribution}
        saving={saving}
        error={error}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}