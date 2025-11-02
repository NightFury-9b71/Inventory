'use client';

import React from 'react';
import { useCategories, useDeleteCategory } from '@/hooks/queries/useCategories';
import { PageTableProvider, usePageTableContext } from '@/contexts/PageTableContext';
import { PageToolbar, PageHeader, PageSearch, PageBodyContainer } from '@/components/page';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderTree, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

function CategoriesPageContent() {
  const { 
    searchTerm, 
    setSearchTerm, 
    statusFilter,
    setStatusFilter,
    clearFilters,
    filteredCount,
    setFilteredCount 
  } = usePageTableContext();

  const { data: categories = [], isLoading, error } = useCategories();
  const deleteCategory = useDeleteCategory();

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteCategory.mutateAsync(id);
        toast.success('Category deleted successfully');
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete category');
      }
    }
  };

  const filterFn = (category: any) => {
    const matchesSearch =
      searchTerm === "" ||
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.nameBn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.code.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  };

  return (
    <div className="p-6">
      {/* Toolbar: Header + Search + Add Button */}
      <PageToolbar>
        <PageHeader 
          title="Categories"
          subtitle="Organize your inventory items"
          totalCount={filteredCount}
          countLabel={filteredCount === 1 ? 'Category' : 'Categories'}
        />
        <div className="flex gap-2">
          <PageSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Link href="/categories/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </Link>
        </div>
      </PageToolbar>

      {/* Body: Data fetching + grid rendering */}
      <PageBodyContainer
        data={categories}
        isLoading={isLoading}
        error={error}
        filterFn={filterFn}
        onFilteredCountChange={setFilteredCount}
      >
        <CategoriesGrid 
          onDelete={handleDelete}
        />
      </PageBodyContainer>
    </div>
  );
}

function CategoriesGrid({ 
  filteredData = [], 
  isLoading = false,
  onDelete 
}: { 
  filteredData?: any[];
  isLoading?: boolean;
  onDelete: (id: number, name: string) => void;
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <Card className="p-12 text-center">
        <FolderTree className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No categories found</h3>
        <p className="text-slate-600 mb-4">Create your first category to get started</p>
        <Link href="/categories/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredData.map((category) => (
        <Card key={category.id} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FolderTree className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex gap-2">
              <Link href={`/categories/${category.id}/edit`}>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onDelete(category.id, category.name)}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {category.name}
          </h3>
          {category.nameBn && (
            <p className="text-sm text-slate-600 mb-2">{category.nameBn}</p>
          )}
          {category.description && (
            <p className="text-sm text-slate-600 mb-4">{category.description}</p>
          )}
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm text-slate-600">Code: {category.code}</span>
            <span className="text-sm font-semibold text-blue-600">
              {category.itemCount || 0} items
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <PageTableProvider>
      <CategoriesPageContent />
    </PageTableProvider>
  );
}
