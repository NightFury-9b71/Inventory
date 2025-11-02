import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCreateOffice } from "@/hooks/queries/useCreateOffice";
import { toast } from "sonner";

export function useCreateChildOffice() {
  const params = useParams();
  const router = useRouter();
  const parentId = params.id as string;

  const [office, setOffice] = useState({
    name: "",
    nameBn: "",
    code: "",
    type: "",
    description: "",
    orderIndex: "",
    isActive: true,
  });

  const createMutation = useCreateOffice();

  const handleInputChange = (field: string, value: any) => {
    setOffice({ ...office, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newOffice = {
        ...office,
        orderIndex: office.orderIndex ? Number(office.orderIndex) : undefined,
        parentId: Number(parentId),
      };
      await createMutation.mutateAsync(newOffice);
      toast.success("Child office added successfully!", {
        description: "The new office has been created under the selected parent.",
      });
      router.push(`/offices/${parentId}`);
    } catch (err: any) {
      toast.error("Failed to add child office", {
        description: "Please check your input and try again.",
      });
    }
  };

  const handleBack = () => router.back();
  const handleCancel = () => router.push(`/offices/${parentId}`);

  return {
    office,
    saving: createMutation.isPending,
    error: createMutation.error ? "Failed to add child office" : null,
    parentId,
    handleInputChange,
    handleSubmit,
    handleBack,
    handleCancel,
  };
}
