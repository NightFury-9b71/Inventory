"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PageToolbar, PageHeader, PageSearch, PageFilter, PageTable } from "@/components/page";
import { Button } from "@/components/ui/button";
import { useOffices } from "@/hooks/queries/useOffices";
import { usePageTable } from "@/hooks/usePageTable";
import { Office } from "@/types/office";

export default function OfficeTablePage() {
  const router = useRouter();
  const { data: offices = [], isLoading, error } = useOffices("all");

  const {
    searchTerm,
    filters,
    expandedItems,
    filteredData,
    filterOptions,
    setSearchTerm,
    setFilter,
    toggleExpand,
    clearFilters,
  } = usePageTable({
    data: offices,
    searchKeys: ['name', 'nameBn', 'code'],
    filters: [
      { key: 'type', value: 'all' },
      { key: 'status', value: 'all' }
    ],
    enableHierarchy: true
  });

  // Define table columns
  const columns = [
    { key: "name", header: "Name" },
    { key: "nameBn", header: "Name (Bengali)" },
    { key: "code", header: "Code" },
    { key: "type", header: "Type" },
    { key: "isActive", header: "Status" },
  ];

  const handleRowClick = (office: Office) => {
    router.push(`/offices/${office.id}`);
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600 font-semibold">An error occurred while fetching data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Toolbar: Header + Search + Filters */}
      <PageToolbar>
        <PageHeader 
          title="Office Management"
          subtitle="Manage all offices, faculties, and departments"
          totalCount={filteredData.length}
          countLabel={filteredData.length === 1 ? 'Office' : 'Offices'}
        />
        <div className="flex gap-2">
          <PageSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <PageFilter
            label="Type"
            value={filters.type}
            options={filterOptions.type}
            onChange={(value) => setFilter('type', value)}
          />
          <PageFilter
            label="Status"
            value={filters.status}
            options={filterOptions.status}
            onChange={(value) => setFilter('status', value)}
          />
          <Button onClick={clearFilters} variant="outline">
            Clear Filters
          </Button>
        </div>
      </PageToolbar>

      {/* Hierarchical Table with office rendering built-in */}
      <PageTable 
        data={filteredData} 
        columns={columns} 
        isLoading={isLoading}
        expandedOffices={expandedItems}
        onToggleExpand={toggleExpand}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
