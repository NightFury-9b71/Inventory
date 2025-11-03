import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOffice } from "@/lib/api";
import { officeKeys } from "./useOffices";

export function useDeleteOffice(officeId: number) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: () => deleteOffice(officeId),
    onSuccess: () => {
      // Invalidate the specific office
      queryClient.invalidateQueries({
        queryKey: officeKeys.detail(officeId),
      });
      
      // Invalidate all office lists to ensure consistency
      queryClient.invalidateQueries({ queryKey: officeKeys.lists() });
    },
  });
}
