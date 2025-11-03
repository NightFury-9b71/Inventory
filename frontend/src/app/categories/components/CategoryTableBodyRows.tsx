"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCategoryTableContext } from "../context/CategoryTableContext";
import { useCategories, useDeleteCategory } from "@/hooks/queries/useCategories";
import { toast } from "sonner";

export default function CategoryTableBodyRows() {
  const { searchTerm, statusFilter } = useCategoryTableContext();
  const { data: categories = [] } = useCategories();
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

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && category.isActive) ||
      (statusFilter === "inactive" && !category.isActive);

    return matchesSearch && matchesStatus;
  };

  const filteredCategories = categories.filter(filterFn);

  return (
    <tbody className="bg-white divide-y divide-slate-200">
      {filteredCategories.map((category) => (
        <tr key={category.id} className="hover:bg-slate-50">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-slate-900">{category.name}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-slate-600">{category.nameBn || "-"}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-slate-600">{category.code}</div>
          </td>
          <td className="px-6 py-4">
            <div className="text-sm text-slate-600 max-w-xs truncate">
              {category.description || "-"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-semibold text-blue-600">
              {category.itemCount || 0} items
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {category.isActive ? (
              <Badge variant="success">Active</Badge>
            ) : (
              <Badge variant="secondary">Inactive</Badge>
            )}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex items-center gap-2">
              <Link href={`/categories/${category.id}`}>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
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
          </td>
        </tr>
      ))}
    </tbody>
  );
}
