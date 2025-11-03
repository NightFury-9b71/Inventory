"use client";

import React from "react";
import { CategoryTableProvider } from "./context/CategoryTableContext";
import { useCategoryTableContext } from "./context/CategoryTableContext";
import { PageToolbar, PageHeader, PageSearch, PageFilter, PageBodyContainer, PageTable } from "@/components/page";
import CategoryTableBodyRows from "./components/CategoryTableBodyRows";
import TableComponent from "@/components/TableComponent";
import TableHeaderRow from "@/components/TableHeaderRow";
import TableHeaderCell from "@/components/TableHeaderCell";
import { useCategories } from "@/hooks/queries/useCategories";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

function CategoryTableContent() {
  const {
    filteredCategoryCount,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    clearFilters,
  } = useCategoryTableContext();

  return (
    <div className="p-6">
      {/* Toolbar: Header + Search + Filters */}
      <PageToolbar>
        <PageHeader
          title="Categories"
          subtitle="Organize your inventory items"
          totalCount={filteredCategoryCount}
          countLabel={filteredCategoryCount === 1 ? "Category" : "Categories"}
        />
        <div className="flex gap-2">
          <PageSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <PageFilter
            label="Status"
            value={statusFilter}
            options={[
              { value: "all", label: "All" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" }
            ]}
            onChange={setStatusFilter}
          />
          <Button onClick={clearFilters} variant="outline">
            Clear Filters
          </Button>
          <Link href="/categories/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </Link>
        </div>
      </PageToolbar>

      {/* Body: Data fetching + table rendering */}
      <CategoryBodyContainer>
        <PageTable>
          <TableComponent>
            <TableHeaderRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Name_Bn</TableHeaderCell>
              <TableHeaderCell>Code</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Items</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableHeaderRow>
            <CategoryTableBodyRows />
          </TableComponent>
        </PageTable>
      </CategoryBodyContainer>
    </div>
  );
}

// Custom body container for categories that uses the category-specific context
function CategoryBodyContainer({ children }: { children: React.ReactNode }) {
  const { searchTerm, statusFilter, setFilteredCategoryCount } = useCategoryTableContext();
  const { data: categories = [], isLoading, error } = useCategories();

  const filterFn = (category: any) => {
    const matchesSearch =
      searchTerm === "" ||
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.nameBn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && category.isActive) ||
      (statusFilter === "inactive" && !category.isActive);

    return matchesSearch && matchesStatus;
  };

  return (
    <PageBodyContainer
      data={categories}
      isLoading={isLoading}
      error={error}
      filterFn={filterFn}
      onFilteredCountChange={setFilteredCategoryCount}
    >
      {children}
    </PageBodyContainer>
  );
}

export default function CategoriesPage() {
  return (
    <CategoryTableProvider>
      <CategoryTableContent />
    </CategoryTableProvider>
  );
}
