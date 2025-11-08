import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/services/category_service";
import { CategoryFormData } from "@/types/item";
import { toast } from "sonner";

export function useNewCategory() {
  const router = useRouter();

  const [category, setCategory] = useState<CategoryFormData>({
    name: "",
    nameBn: "",
    code: "",
    description: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: any) => {
    setCategory({ ...category, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await createCategory(category);
      toast.success("Category created successfully", {
        description: `${category.name} has been added.`,
      });
      router.push("/categories");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create category";
      setError(errorMessage);
      toast.error("Failed to create category", {
        description: errorMessage,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => router.back();
  const handleCancel = () => router.push("/categories");

  return {
    category,
    saving,
    error,
    handleInputChange,
    handleSubmit,
    handleBack,
    handleCancel,
  };
}
