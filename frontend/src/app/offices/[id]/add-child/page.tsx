"use client";

import React from "react";
import { useOfficeCrud } from "../hooks/useOfficeCrud";
import AddChildHeader from "./components/AddChildHeader";
import AddChildForm from "./components/AddChildForm";
import { useRequirePermission } from "@/hooks/useAuthorization";
import { Permission } from "@/types/auth";

export default function AddChildOfficePage() {
  // Protect this page - only users with CREATE_OFFICE permission can access
  useRequirePermission(Permission.CREATE_OFFICE);

  const {
    office,
    saving,
    error,
    handleInputChange,
    handleCreateSubmit,
    handleBack,
    handleCancel,
  } = useOfficeCrud({ createMode: true, skipFetch: true });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <AddChildHeader onBack={handleBack} />

      <AddChildForm
        office={office}
        saving={saving}
        error={error}
        onInputChange={handleInputChange}
        onSubmit={handleCreateSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}