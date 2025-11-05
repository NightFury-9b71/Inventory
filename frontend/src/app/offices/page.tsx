"use client";

import React from "react";
import { PageHeader, PageTitle, PageSubtitle, PageToolbar, PageBody, PageFooter, PageSearch, PageFilter, PageTable } from "@/components/page";
import { Button } from "@/components/ui/button";
import { useTableData } from "@/hooks/useTableData";
import { Office } from "@/types/office";
import TableActions from "@/components/TableActions";
import { useOfficeCrud } from "./hooks/useOfficeCrud";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";

const OfficeActions: React.FC<{ office: Office }> = ({ office }) => {
  const { handleView, handleEdit, handleDelete } = useOfficeCrud();
  
  return (
    <TableActions
      item={office}
      itemName={office.name}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={() => handleDelete(office)}
      showView={true}
      showEdit={true}
      showDelete={true}
    />
  );
};

export default function OfficeTablePage() {
  const {
    offices,
    isLoading,
    error,
    deleteDialogState,
  } = useOfficeCrud();

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
  } = useTableData({
    data: offices,
    searchKeys: ['name', 'nameBn', 'code'],
    filters: [
      { key: 'type', value: 'all' },
      { key: 'status', value: 'all' }
    ],
  });

  // Define table columns
  const columns = [
    { key: "name", header: "Name" },
    { key: "nameBn", header: "Name (Bengali)" },
    { key: "code", header: "Code" },
    { key: "type", header: "Type" },
    { key: "isActive", header: "Status" },
    { key: "actions", header: "Actions", render: (office: Office) => <OfficeActions office={office} /> },
  ];

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
      {/* Header with integrated toolbar */}
      <PageHeader>
        <PageTitle title="Office Management" totalCount={filteredData.length} countLabel={filteredData.length === 1 ? 'Office' : 'Offices'} />
        <PageSubtitle subtitle="Manage all offices, faculties, and departments" />
        <PageToolbar>
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
        </PageToolbar>
      </PageHeader>

      <PageBody>
        <PageTable 
          data={filteredData} 
          columns={columns} 
          isLoading={isLoading}
          expandedOffices={expandedItems}
          onToggleExpand={toggleExpand}
        />
      </PageBody>

      <PageFooter>
        {/* Pagination will go here */}
      </PageFooter>

      {deleteDialogState.item && (
        <DeleteConfirmationDialog
          open={deleteDialogState.open}
          onOpenChange={deleteDialogState.onOpenChange}
          onConfirm={deleteDialogState.onConfirm}
          title={`Delete ${deleteDialogState.item.name}`}
          description={`Are you sure you want to delete this office? This action cannot be undone.`}
          confirmationText="delete"
          isDeleting={deleteDialogState.isDeleting}
        />
      )}
    </div>
  );
}
