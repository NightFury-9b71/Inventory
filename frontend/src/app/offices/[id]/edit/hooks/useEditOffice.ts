import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useOfficeById } from "@/hooks/queries/useOfficeById";
import { useUpdateOffice } from "@/hooks/queries/useUpdateOffice";
import { Office } from "@/types/office";

export function useEditOffice() {
  const params = useParams();
  const router = useRouter();
  const officeId = params.id as string;

  const {
    data: initialOffice,
    isLoading: loading,
    error: queryError,
  } = useOfficeById(officeId);

  const [office, setOffice] = useState<Office | null>(initialOffice || null);
  const updateMutation = useUpdateOffice(Number(officeId));

  // Sync state when data loads
  if (initialOffice && !office) {
    setOffice(initialOffice);
  }

  const error = queryError ? "Failed to load office details" : null;

  const handleInputChange = (field: keyof Office, value: any) => {
    if (!office) return;
    setOffice({ ...office, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!office) return;

    try {
      await updateMutation.mutateAsync(office);
      router.push(`/offices/${officeId}`);
    } catch (err) {
      console.error("Failed to update office", err);
    }
  };

  const handleBack = () => router.back();
  const handleCancel = () => router.push(`/offices/${officeId}`);

  return {
    office,
    loading,
    error: error || (updateMutation.error ? "Failed to update office" : null),
    saving: updateMutation.isPending,
    officeId,
    handleInputChange,
    handleSubmit,
    handleBack,
    handleCancel,
  };
}
