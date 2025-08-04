"use client";

import { useEffect, useState } from "react";
import { getOffices } from "@/lib/api";
import { Office } from "@/types/office";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export default function OfficeTablePage() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffices();
  }, []);

  const loadOffices = async () => {
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Offices</h1>
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