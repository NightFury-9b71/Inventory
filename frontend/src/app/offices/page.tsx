"use client";

import { 
  PageHeader, 
  PageTitle, 
  PageSubtitle, 
  PageToolbar,
  PageBody,
  PageFooter,
  PageSearch,
  PageFilter,
  Table,
  useTable
} from "@/components/table";
import { Office, OfficeType } from "@/types/office";
import { getOffices, createOffice, updateOffice, deleteOffice } from "@/services/office_service";
import { Button } from "@/components/ui/button";

export default function OfficeTablePage() {
  const columns = [
    { key: "name" as keyof Office, label: "Name" },
    { key: "nameBn" as keyof Office, label: "Name (Bengali)" },
    { key: "code" as keyof Office, label: "Code" },
    { key: "type" as keyof Office, label: "Type" },
    { key: "isActive" as keyof Office, label: "Status" },
  ];

  const filters = [
    {
      key: 'type',
      label: 'Type',
      options: [
        { value: 'all', label: 'All Types' },
        { value: OfficeType.OFFICE, label: 'Office' },
        { value: OfficeType.FACULTY, label: 'Faculty' },
        { value: OfficeType.DEPARTMENT, label: 'Department' },
        { value: OfficeType.FACILITY, label: 'Facility' },
        { value: OfficeType.HALL, label: 'Hall' },
        { value: OfficeType.INSTITUTE, label: 'Institute' },
        { value: OfficeType.CENTER, label: 'Center' },
      ],
    },
    {
      key: 'isActive',
      label: 'Status',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'Inactive' },
      ],
    },
  ];

  const {
    data: tableData,
    totalCount,
    isLoading,
    error,
    searchTerm,
    filters: tableFilters,
    handleSearch,
    handleFilter,
    clearFilters,
    currentPage,
    totalPages,
    handlePageChange,
    hasPagination,
    expandedRows,
    toggleRowExpansion,
    hasExpansion,
    actions,
  } = useTable({
    data: [],
    columns,
    searchableKeys: ['name', 'nameBn', 'code'],
    filterableKeys: ['type', 'isActive'],
    pagination: {
      enabled: true,
      pageSize: 10,
    },
    expandable: {
      enabled: true,
      childrenKey: 'subOffices',
    },
    crud: {
      basePath: '/offices',
      getAll: getOffices,
      create: createOffice,
      update: (id, data) => updateOffice(Number(id), data),
      delete: (id) => deleteOffice(Number(id)),
    },
  });

  if (error) {
    return (
      <div>
        <div className="text-center py-8">
          <p className="text-red-600 font-semibold">An error occurred while fetching data.</p>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <PageHeader>
        <PageTitle title="Office Management" totalCount={totalCount} />
        <PageSubtitle subtitle="Manage all offices, faculties, and departments" />
        <PageToolbar>
          <PageSearch
            searchTerm={searchTerm}
            setSearchTerm={handleSearch}
            placeholder="Search offices..."
          />
          {filters.map((filter) => (
            <PageFilter
              key={filter.key}
              label={filter.label}
              value={tableFilters[filter.key] || ""}
              options={filter.options}
              onChange={(value) => handleFilter(filter.key, value)}
            />
          ))}
          {(searchTerm || Object.values(tableFilters).some(v => v)) && (
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          )}
        </PageToolbar>
      </PageHeader>

      {/* Page Body */}
      <PageBody>
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : tableData.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No offices found</p>
          </div>
        ) : (
          <Table
            data={tableData}
            columns={columns}
            page="/offices"
            actions={actions}
            itemName="office"
            confirmationText="delete"
            hasExpansion={hasExpansion}
            childrenKey="subOffices"
            expandedRows={expandedRows}
            onToggleExpansion={toggleRowExpansion}
          />
        )}
      </PageBody>

      {/* Page Footer */}
      <PageFooter
        hasPagination={hasPagination}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalCount={totalCount}
      />
    </div>
  );
}
