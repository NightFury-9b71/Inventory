"use client";

import React from "react";
import { useItem } from "@/components/table";
import { useParams } from "next/navigation";
import { Office } from "@/types/office";
import { getOfficeById, deleteOffice } from "@/services/office_service";
import HeaderActions from "./components/HeaderActions";
import OfficeInfoCard from "./components/OfficeInfoCard";
import AdditionalDetailsCard from "./components/AdditionalDetailsCard";
import ChildOfficesCard from "./components/ChildOfficesCard";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";

export default function OfficeDetailPage() {
  const params = useParams();
  const officeId = params.id as string;

  const {
    item: office,
    loading,
    error,
    deleting,
    handleBack,
    handleEdit,
    handleAddChild,
    handleNavigateToChild,
    deleteItem,
  } = useItem<Office>({
    id: officeId,
    crud: {
      basePath: '/offices',
      getById: (id) => getOfficeById(Number(id)),
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

  const fullOffice = office as Office;

  // Main Component Stack
  return (
    <div>
      <HeaderActions
        officeName={fullOffice.name}
        handleBack={handleBack}
        handleEdit={handleEdit}
        handleAddChild={handleAddChild}
        handleDelete={deleteItem}
        deleting={deleting}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <OfficeInfoCard office={fullOffice} />
        <AdditionalDetailsCard office={fullOffice} />
      </div>

      <ChildOfficesCard
        subOffices={fullOffice.subOffices}
        onNavigateToChild={handleNavigateToChild}
      />
    </div>
  );
}