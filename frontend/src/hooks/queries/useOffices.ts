import { useQuery } from "@tanstack/react-query";
import {
  getOffices,
  getParentOffices,
  getFacultyOffices,
  getDepartmentOffices,
} from "@/lib/api";
import { Office } from "@/types/office";

export const officeKeys = {
  all: ["offices"] as const,
  lists: () => [...officeKeys.all, "list"] as const,
  list: (filter: string) => [...officeKeys.lists(), filter] as const,
  details: () => [...officeKeys.all, "detail"] as const,
  detail: (id: number) => [...officeKeys.details(), id] as const,
};

export function useOffices(filter: "all" | "parent" | "faculty" | "department" = "all") {
  return useQuery<Office[], Error>({
    queryKey: officeKeys.list(filter),
    queryFn: () => {
      switch (filter) {
        case "parent":
          return getParentOffices();
        case "faculty":
          return getFacultyOffices();
        case "department":
          return getDepartmentOffices();
        default:
          return getOffices();
      }
    },
  });
}
