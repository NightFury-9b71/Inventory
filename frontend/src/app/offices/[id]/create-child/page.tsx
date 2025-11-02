"use client";

import React from "react";
import { useCreateChildOffice } from "./hooks/useCreateChildOffice";
import CreateChildHeader from "./components/CreateChildHeader";
import CreateChildForm from "./components/CreateChildForm";
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
    handleSubmit,
    handleBack,
    handleCancel,
  } = useCreateChildOffice();

  return (
    <div className="p-6">
      <CreateChildHeader onBack={handleBack} />

      <CreateChildForm
        office={office}
        saving={saving}
        error={error}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}