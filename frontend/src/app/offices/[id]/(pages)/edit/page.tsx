"use client";

import React from "react";
import { useItem } from "@/components/table";
import { useParams } from "next/navigation";
import { Office } from "@/types/office";
import { getOfficeById, updateOffice, deleteOffice } from "@/services/office_service";
import EditOfficeHeader from "./components/EditOfficeHeader";
import EditOfficeForm from "./components/EditOfficeForm";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";

export default function EditOfficePage() {
  const params = useParams();
  const officeId = params.id as string;

  const {
    item: office,
    loading,
    error,
    saving,
    handleInputChange,
    handleUpdateSubmit,
    handleBack,
    handleCancel,
  } = useItem<Office>({
    id: officeId,
    crud: {
      basePath: '/offices',
      getById: (id) => getOfficeById(Number(id)),
      update: (id, data) => updateOffice(Number(id), data),
      delete: (id) => deleteOffice(Number(id)),
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
      <EditOfficeHeader onBack={handleBack} />

      <EditOfficeForm
        office={office as Office}
        saving={saving}
        error={error}
        onInputChange={handleInputChange}
        onSubmit={handleUpdateSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}