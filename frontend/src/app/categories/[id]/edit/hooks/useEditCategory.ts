import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCategoryById, useUpdateCategory } from "@/hooks/queries/useCategories";
import { CategoryFormData } from "@/types/inventory";
import { toast } from "sonner";

export function useEditCategory() {
  const params = useParams();
  const router = useRouter();
  const categoryId = Number(params.id);

  const {
    data: initialCategory,
    isLoading: loading,
    error: queryError,
  } = useCategoryById(categoryId);

  const [category, setCategory] = useState<(CategoryFormData & { isActive?: boolean }) | null>(
    initialCategory
      ? {
          name: initialCategory.name,
          nameBn: initialCategory.nameBn,
          code: initialCategory.code,
          description: initialCategory.description,
          isActive: initialCategory.isActive,
        }
      : null
  );

  const updateMutation = useUpdateCategory();

  // Sync state when data loads
  if (initialCategory && !category) {
    setCategory({
      name: initialCategory.name,
      nameBn: initialCategory.nameBn,
      code: initialCategory.code,
      description: initialCategory.description,
      isActive: initialCategory.isActive,
    });
  }

  const error = queryError ? "Failed to load category details" : null;

  const handleInputChange = (field: string, value: any) => {
    if (!category) return;
    setCategory({ ...category, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;

    try {
      await updateMutation.mutateAsync({ id: categoryId, data: category });
      toast.success("Category updated successfully", {
        description: `${category.name} has been updated.`,
      });
      router.push("/categories");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update category";
      toast.error("Failed to update category", {
        description: errorMessage,
      });
    }
  };

  const handleBack = () => router.back();
  const handleCancel = () => router.push("/categories");

  return {
    category,
    loading,
    error: error || (updateMutation.error ? "Failed to update category" : null),
    saving: updateMutation.isPending,
    categoryId,
    handleInputChange,
    handleSubmit,
    handleBack,
    handleCancel,
  };
}
