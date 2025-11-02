import { useParams, useRouter } from "next/navigation";
import { useOfficeById } from "@/hooks/queries/useOfficeById";

export function useOfficeDetail() {
  const params = useParams();
  const router = useRouter();
  const officeId = params.id as string;

  const {
    data: office,
    isLoading: loading,
    error: queryError,
  } = useOfficeById(officeId);

  const error = queryError ? "Failed to load office details" : null;

  const handleBack = () => router.back();
  const handleEdit = () => router.push(`/offices/${officeId}/edit`);
  const handleAddChild = () => router.push(`/offices/${officeId}/create-child`);
  const handleNavigateToChild = (id: number) => router.push(`/offices/${id}`);

  return {
    office: office || null,
    loading,
    error,
    officeId,
    handlers: {
      handleBack,
      handleEdit,
      handleAddChild,
      handleNavigateToChild,
    },
  };
}
