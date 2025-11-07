"use client";

import React from "react";
import { useItem } from "@/components/table";
import { useParams } from "next/navigation";

type OfficeFormData = {
  name: string;
  nameBn: string;
  code: string;
  type: string;
  description: string;
  orderIndex: string;
  isActive: boolean;
};

import { createOffice } from "@/services/office_service";
import AddChildHeader from "./components/AddChildHeader";
import AddChildForm from "./components/AddChildForm";

export default function AddChildOfficePage() {
  const params = useParams();
  const parentId = params.id as string;

  const {
    item: office,
    saving,
    error,
    handleInputChange,
    handleCreateSubmit,
    handleBack,
    handleCancel,
  } = useItem<OfficeFormData>({
    crud: {
      basePath: '/offices',
      create: createOffice,
    },
    createMode: true,
    skipFetch: true,
  });

  // Type-safe input change handler
  const handleFormInputChange = (field: string, value: any) => {
    handleInputChange(field as keyof OfficeFormData, value);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <AddChildHeader onBack={handleBack} />

      <AddChildForm
        office={office as OfficeFormData}
        saving={saving}
        error={error}
        onInputChange={handleFormInputChange}
        onSubmit={handleCreateSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}