"use client";

import React from "react";
import { useOfficeDetail } from "./hooks/useOfficeDetail";
import HeaderActions from "./components/HeaderActions";
import OfficeInfoCard from "./components/OfficeInfoCard";
import AdditionalDetailsCard from "./components/AdditionalDetailsCard";
import ChildOfficesCard from "./components/ChildOfficesCard";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";

export default function OfficeDetailPage() {
  const { office, loading, error, handlers } = useOfficeDetail();

  // Loading State
  if (loading) {
    return <LoadingState />;
  }

  // Error State
  if (error || !office) {
    return <ErrorState message={error || undefined} onBack={handlers.handleBack} />;
  }

  // Main Component Stack
  return (
    <div className="p-6">
      <HeaderActions
        onBack={handlers.handleBack}
        onEdit={handlers.handleEdit}
        onAddChild={handlers.handleAddChild}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <OfficeInfoCard office={office} />
        <AdditionalDetailsCard office={office} />
      </div>

      <ChildOfficesCard
        subOffices={office.subOffices}
        onNavigateToChild={handlers.handleNavigateToChild}
      />
    </div>
  );
}