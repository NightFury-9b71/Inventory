"use client";

import React from "react";
import { PageToolbar, PageHeader, PageSearch, PageFilter, PageTable } from "@/components/page";
import { useCategories } from "@/hooks/queries/useCategories";
import { usePageTable } from "@/hooks/usePageTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ItemCategory } from "@/types/inventory";

export default function CategoriesPage() {
  const { data: categories = [], isLoading, error } = useCategories();

  const {
    searchTerm,
    filters,
    filteredData,
    filterOptions,
    setSearchTerm,
    setFilter,
    clearFilters,
  } = usePageTable({
    data: categories,
    searchKeys: ['name', 'nameBn', 'code'],
    filters: [{ key: 'status', value: 'all' }]
  });

  // Define table columns
  const columns = [
    {
      key: "name",
      header: "Name",
    },
    {
      key: "nameBn",
      header: "Name (Bengali)",
    },
    {
      key: "code",
      header: "Code",
    },
    {
      key: "description",
      header: "Description",
      render: (category: ItemCategory) => (
        <span className="max-w-xs truncate">{category.description || "-"}</span>
      ),
    },
    {
      key: "itemCount",
      header: "Items",
      render: (category: ItemCategory) => (
        <span>{category.itemCount || 0}</span>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      render: (category: ItemCategory) => (
        <span className={category.isActive ? "text-green-600" : "text-red-600"}>
          {category.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (category: ItemCategory) => (
        <Link href={`/categories/${category.id}`}>
          <Button variant="outline" size="sm">View</Button>
        </Link>
      ),
    },
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
      {/* Toolbar: Header + Search + Filters */}
      <PageToolbar>
        <PageHeader
          title="Categories"
          subtitle="Organize your inventory items"
          totalCount={filteredData.length}
          countLabel={filteredData.length === 1 ? "Category" : "Categories"}
        />
        <div className="flex gap-2">
          <PageSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <PageFilter
            label="Status"
            value={filters.status}
            options={filterOptions.status}
            onChange={(value) => setFilter('status', value)}
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

      {/* Simple Table: Just pass data and columns */}
      <PageTable data={filteredData} columns={columns} isLoading={isLoading} />
    </div>
  );
}
