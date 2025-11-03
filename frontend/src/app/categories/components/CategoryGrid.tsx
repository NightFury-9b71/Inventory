"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderTree, Plus, Edit, Trash2 } from "lucide-react";
import { useCategoryTableContext } from "../context/CategoryTableContext";
import { useCategories, useDeleteCategory } from "@/hooks/queries/useCategories";
import { toast } from "sonner";

export default function CategoryGrid() {
  const { searchTerm } = useCategoryTableContext();
  const { data: categories = [], isLoading } = useCategories();
  const deleteCategory = useDeleteCategory();

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteCategory.mutateAsync(id);
        toast.success("Category deleted successfully");
      } catch (error: any) {
        toast.error(error.message || "Failed to delete category");
      }
    }
  };

  // Filter categories
  const filterFn = (category: any) => {
    const matchesSearch =
      searchTerm === "" ||
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.nameBn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.code.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  };

  const filteredCategories = categories.filter(filterFn);

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

  if (filteredCategories.length === 0) {
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
      {filteredCategories.map((category) => (
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
                onClick={() => handleDelete(category.id, category.name)}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{category.name}</h3>
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
