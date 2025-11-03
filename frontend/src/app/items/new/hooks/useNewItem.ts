import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateItem } from "@/hooks/queries/useItems";
import { ItemFormData } from "@/types/inventory";
import { toast } from "sonner";

export function useNewItem() {
  const router = useRouter();

  const [item, setItem] = useState<ItemFormData>({
    name: "",
    nameBn: "",
    categoryId: 0,
    code: "",
    description: "",
    units: "",
    unitPrice: 0,
    quantity: 0,
  });

  const createMutation = useCreateItem();

  const handleInputChange = (field: string, value: any) => {
    setItem({ ...item, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createMutation.mutateAsync(item);
      toast.success("Item created successfully", {
        description: `${item.name} has been added to inventory.`,
      });
      router.push("/items");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create item";
      toast.error("Failed to create item", {
        description: errorMessage,
      });
    }
  };

  const handleBack = () => router.back();
  const handleCancel = () => router.push("/items");

  return {
    item,
    saving: createMutation.isPending,
    error: createMutation.error ? "Failed to create item" : null,
    handleInputChange,
    handleSubmit,
    handleBack,
    handleCancel,
  };
}
