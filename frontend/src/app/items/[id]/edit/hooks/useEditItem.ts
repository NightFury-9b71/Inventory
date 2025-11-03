import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useItemById, useUpdateItem } from "@/hooks/queries/useItems";
import { Item, ItemFormData } from "@/types/inventory";
import { toast } from "sonner";

export function useEditItem() {
  const params = useParams();
  const router = useRouter();
  const itemId = Number(params.id);

  const {
    data: initialItem,
    isLoading: loading,
    error: queryError,
  } = useItemById(itemId);

  const [item, setItem] = useState<(ItemFormData & { isActive?: boolean }) | null>(
    initialItem ? {
      name: initialItem.name,
      nameBn: initialItem.nameBn,
      categoryId: initialItem.categoryId,
      code: initialItem.code,
      description: initialItem.description,
      units: initialItem.units,
      unitPrice: initialItem.unitPrice,
      quantity: initialItem.quantity,
      isActive: initialItem.isActive,
    } : null
  );

  const updateMutation = useUpdateItem();

  // Sync state when data loads
  if (initialItem && !item) {
    setItem({
      name: initialItem.name,
      nameBn: initialItem.nameBn,
      categoryId: initialItem.categoryId,
      code: initialItem.code,
      description: initialItem.description,
      units: initialItem.units,
      unitPrice: initialItem.unitPrice,
      quantity: initialItem.quantity,
      isActive: initialItem.isActive,
    });
  }

  const error = queryError ? "Failed to load item details" : null;

  const handleInputChange = (field: string, value: any) => {
    if (!item) return;
    setItem({ ...item, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    try {
      await updateMutation.mutateAsync({ id: itemId, data: item });
      toast.success("Item updated successfully", {
        description: `${item.name} has been updated.`,
      });
      router.push(`/items/${itemId}`);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update item";
      toast.error("Failed to update item", {
        description: errorMessage,
      });
    }
  };

  const handleBack = () => router.back();
  const handleCancel = () => router.push(`/items/${itemId}`);

  return {
    item,
    loading,
    error: error || (updateMutation.error ? "Failed to update item" : null),
    saving: updateMutation.isPending,
    itemId,
    handleInputChange,
    handleSubmit,
    handleBack,
    handleCancel,
  };
}
