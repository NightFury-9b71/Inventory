"use client";

import { useEffect, useState } from "react";
import { getOffices, getParentOffices, getFacultyOffices, getDepartmentOffices } from "@/lib/api";
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


export default function OfficeTablePage() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const {selectedItem} = useLayout();

  useEffect(() => {
    
    switch (selectedItem) {
      case SidebarItems.ALL_OFFICES:
        loadAllOffices();
        break;
      case SidebarItems.PARENT_OFFICES: 
        loadParentOffices();
        break;
      case SidebarItems.FACULTIES:
        loadFacultyOffices();
        break;
      case SidebarItems.DEPARTMENTS:
        loadDepartmentOffices();
        break;
      default:
        setOffices([]);
        break;
    }
  }, [selectedItem]);

  const loadAllOffices = async () => {
    setLoading(true);
    try {
      const data = await getOffices();
      setOffices(data);
    } catch (err) {
      console.error("Failed to fetch offices", err);
    } finally {
      setLoading(false);
    }
  };

  const loadParentOffices = async () => {
    setLoading(true);
    try {
      const data = await getParentOffices();
      setOffices(data);
    } catch (err) {
      console.error("Failed to fetch parent offices", err);
    } finally {
      setLoading(false);
    }
  };

  const loadFacultyOffices = async () => {
      setLoading(true);
    try {
      const data = await getFacultyOffices();
      setOffices(data);
    } catch (err) {
      console.error("Failed to fetch parent offices", err);
    } finally {
      setLoading(false);
    }
  };

  const loadDepartmentOffices = async () => {
    setLoading(true);
    try {
      const data = await getDepartmentOffices();
      setOffices(data);
    } catch (err) {
      console.error("Failed to fetch parent offices", err);
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Total {offices.length} Entries </h1>
      </div>
      {loading ? (
        <p>Loading...</p>
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