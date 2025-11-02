import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOffice } from "@/lib/api";
import { Office } from "@/types/office";
import { officeKeys } from "./useOffices";

export function useUpdateOffice(officeId: number) {
  const queryClient = useQueryClient();

  return useMutation<Office, Error, Partial<Office>>({
    mutationFn: (data) => updateOffice(officeId, data),
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
