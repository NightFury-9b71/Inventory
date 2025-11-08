"use client";

import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getUnits } from "@/services/unit_service";
import { Unit } from "@/types/unit";

interface UnitSelectProps {
  value?: number;
  onChange: (value: number) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export default function UnitSelect({
  value,
  onChange,
  label = "Unit",
  placeholder = "Select a unit",
  required = false
}: UnitSelectProps) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const data = await getUnits();
        setUnits(data);
      } catch (error) {
        console.error("Failed to fetch units:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  return (
    <div>
      <Label htmlFor="unit">{label}</Label>
      <Select
        value={value?.toString() || ""}
        onValueChange={(val) => onChange(Number(val))}
        disabled={loading}
      >
        <SelectTrigger>
          <SelectValue placeholder={loading ? "Loading units..." : placeholder} />
        </SelectTrigger>
        <SelectContent>
          {units.map((unit) => (
            <SelectItem key={unit.id} value={unit.id.toString()}>
              {unit.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
