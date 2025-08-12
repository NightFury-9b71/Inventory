"use client";

import { useEffect, useState } from "react";
import {
  getOffices,
  getParentOffices,
  getFacultyOffices,
  getDepartmentOffices,
} from "@/lib/api";
import { Office } from "@/types/office";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useLayout } from "@/components/layout-context";
import { SidebarItems } from "@/types/constant";
import { useAuth } from "@/auth-context";
import axios from "axios";

export default function OfficeTablePage() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { selectedItem } = useLayout();
  const { user } = useAuth();

  useEffect(() => {
    switch (selectedItem) {
      case SidebarItems.ALL_OFFICES:
        loadData(getOffices);
        break;
      case SidebarItems.PARENT_OFFICES:
        loadData(getParentOffices);
        break;
      case SidebarItems.FACULTIES:
        loadData(getFacultyOffices);
        break;
      case SidebarItems.DEPARTMENTS:
        loadData(getDepartmentOffices);
        break;
      default:
        setOffices([]);
        break;
    }
  }, [selectedItem]);

  const loadData = async (fetchFn: () => Promise<Office[]>) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFn();
      setOffices(data);
    } catch (err: any) {
      console.error("Failed to fetch offices", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("You are not authorized to view this content.");
        } else {
          setError("An error occurred while fetching data.");
        }
      } else {
        setError("Unexpected error occurred.");
      }
      setOffices([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {error ? "Access Denied" : `Total ${offices.length} Entries`}
        </h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="text-red-600 font-semibold">{error}</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Name_Bn</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offices.map((office) => (
              <TableRow key={office.id}>
                <TableCell>{office.name}</TableCell>
                <TableCell>{office.nameBn}</TableCell>
                <TableCell>{office.code}</TableCell>
                <TableCell>{office.type}</TableCell>
                <TableCell>{office.isActive ? "Active" : "Inactive"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
