"use client";

import React from "react";
import { useItem } from "@/components/table";
import { useParams } from "next/navigation";
import { Unit } from "@/types/unit";
import { getUnitById, deleteUnit } from "@/services/unit_service";
import HeaderActions from "./components/HeaderActions";
import UnitInfoCard from "./components/UnitInfoCard";
import UnitDetailsCard from "./components/UnitDetailsCard";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";

export default function UnitDetailPage() {
  const params = useParams();
  const unitId = params.id as string;

  const {
    item: unit,
    loading,
    error,
    deleting,
    handleBack,
    handleEdit,
    deleteItem: handleDelete,
  } = useItem<Unit>({
    id: unitId,
    crud: {
      basePath: '/units',
      getById: (id) => getUnitById(Number(id)),
      delete: (id) => deleteUnit(Number(id)),
    },
  });

  // Loading State
  if (loading) {
    return <LoadingState />;
  }

  // Error State
  if (error || !unit || !unit.id) {
    return <ErrorState message={error || undefined} onBack={handleBack} />;
  }

  const fullUnit = unit as Unit;

  // Main Component Stack
  return (
    <div className="p-6">
      <HeaderActions
        unitName={fullUnit.name}
        handleBack={handleBack}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        deleting={deleting}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <UnitInfoCard unit={fullUnit} />
        <UnitDetailsCard unit={fullUnit} />
      </div>
    </div>
  );
}
