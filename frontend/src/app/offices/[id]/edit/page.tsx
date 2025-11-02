"use client";

import React from "react";
import { useEditOffice } from "./hooks/useEditOffice";
import EditOfficeHeader from "./components/EditOfficeHeader";
import EditOfficeForm from "./components/EditOfficeForm";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
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
    handleSubmit,
    handleBack,
    handleCancel,
  } = useEditOffice();

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
    <div className="p-6">
      <EditOfficeHeader onBack={handleBack} />

      <EditOfficeForm
        office={office}
        saving={saving}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}