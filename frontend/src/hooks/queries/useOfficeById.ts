import { useQuery } from "@tanstack/react-query";
import { getOfficeById } from "@/lib/api";
import { Office } from "@/types/office";
import { officeKeys } from "./useOffices";

export function useOfficeById(id: number | string, enabled: boolean = true) {
  return useQuery<Office, Error>({
    queryKey: officeKeys.detail(Number(id)),
    queryFn: () => getOfficeById(Number(id)),
    enabled: enabled && !!id,
  });
}
