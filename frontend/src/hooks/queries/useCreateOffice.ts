import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOffice } from "@/lib/api";
import { Office } from "@/types/office";
import { officeKeys } from "./useOffices";

interface CreateOfficeData {
  name: string;
  nameBn: string;
  code: string;
  type: string;
  description?: string;
  orderIndex?: number;
  isActive: boolean;
  parentId?: number;
}

export function useCreateOffice() {
  const queryClient = useQueryClient();

  return useMutation<Office, Error, CreateOfficeData>({
    mutationFn: (data) => createOffice(data),
    onSuccess: (newOffice, variables) => {
      // Invalidate all office lists
      queryClient.invalidateQueries({ queryKey: officeKeys.lists() });
      
      // If it has a parent, invalidate that parent's detail
      if (variables.parentId) {
        queryClient.invalidateQueries({
          queryKey: officeKeys.detail(variables.parentId),
        });
      }
    },
  });
}
