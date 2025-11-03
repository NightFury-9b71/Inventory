"use client";

import React from "react";
import { OfficeTableProvider } from "./context/OfficeTableContext";
import { useOfficeTableContext } from "./context/OfficeTableContext";
import { PageToolbar, PageHeader, PageSearch, PageFilter, PageBodyContainer, PageTable } from "@/components/page";
import TableComponent from "@/components/TableComponent";
import TableHeaderRow from "@/components/TableHeaderRow";
import TableHeaderCell from "@/components/TableHeaderCell";
import TableBodyRows from "@/components/TableBodyRows";
import { useOffices } from "@/hooks/queries/useOffices";

function OfficeTableContent() {
  const { 
    filteredOfficeCount, 
    searchTerm, 
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    clearFilters,
    expandedOffices,
    toggleExpand
  } = useOfficeTableContext();

  const { data: offices = [] } = useOffices("all");
  const uniqueTypes = Array.from(new Set(offices.map((office) => office.type))).sort();

  return (
    <div className="p-6">
      {/* Toolbar: Header + Search + Filters */}
      <PageToolbar>
        <PageHeader 
          title="Office Management"
          subtitle="Manage all offices, faculties, and departments"
          totalCount={filteredOfficeCount}
          countLabel={filteredOfficeCount === 1 ? 'Office' : 'Offices'}
        />
        <div className="flex gap-2">
          <PageSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <PageFilter
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            uniqueTypes={uniqueTypes}
            clearFilters={clearFilters}
          />
        </div>
      </PageToolbar>

      {/* Body: Data fetching + table rendering */}
      <OfficeBodyContainer>
        <PageTable expandedItems={expandedOffices} toggleExpand={toggleExpand}>
          <TableComponent>
            <TableHeaderRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Name_Bn</TableHeaderCell>
              <TableHeaderCell>Code</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableHeaderRow>
            <TableBodyRows />
          </TableComponent>
        </PageTable>
      </OfficeBodyContainer>
    </div>
  );
}

// Custom body container for offices that uses the office-specific context
function OfficeBodyContainer({ children }: { children: React.ReactNode }) {
  const { searchTerm, typeFilter, statusFilter, setFilteredOfficeCount } = useOfficeTableContext();
  const { data: offices = [], isLoading, error } = useOffices("all");

  const filterFn = (office: any) => {
    const matchesSearch =
      searchTerm === "" ||
      office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.nameBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || office.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && office.isActive) ||
      (statusFilter === "inactive" && !office.isActive);

    return matchesSearch && matchesType && matchesStatus;
  };

  return (
    <PageBodyContainer
      data={offices}
      isLoading={isLoading}
      error={error}
      filterFn={filterFn}
      onFilteredCountChange={setFilteredOfficeCount}
    >
      {children}
    </PageBodyContainer>
  );
}

export default function OfficeTablePage() {
  return (
    <OfficeTableProvider>
      <OfficeTableContent />
    </OfficeTableProvider>
  );
}
