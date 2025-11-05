"use client";

import React from "react";
import { useOfficeCrud } from "../../hooks/useOfficeCrud";
import EditOfficeHeader from "./components/EditOfficeHeader";
import EditOfficeForm from "./components/EditOfficeForm";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import { useRequirePermission } from "@/hooks/useAuthorization";
import { Permission } from "@/types/auth";

export default function EditOfficePage() {
  // Protect this page - only users with EDIT_OFFICE permission can access
  useRequirePermission(Permission.EDIT_OFFICE);

  const {
    office,
    loading,
    error,
    saving,
    handleInputChange,
    handleUpdateSubmit,
    handleBack,
    handleCancel,
  } = useOfficeCrud();

  // Loading State
  if (loading) {
    return <LoadingState />;
  }

  // Error State
  if (error || !office) {
    return <ErrorState message={error || undefined} onBack={handleBack} />;
  }

  // Main Component Stack
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <EditOfficeHeader onBack={handleBack} />

      <EditOfficeForm
        office={office}
        saving={saving}
        error={error}
        onInputChange={handleInputChange}
        onSubmit={handleUpdateSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}