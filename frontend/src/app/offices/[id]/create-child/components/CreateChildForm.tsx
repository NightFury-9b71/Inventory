"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";

type OfficeFormData = {
  name: string;
  nameBn: string;
  code: string;
  type: string;
  description: string;
  orderIndex: string;
  isActive: boolean;
};

type Props = {
  office: OfficeFormData;
  saving: boolean;
  error: string | null;
  onInputChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function CreateChildForm({
  office,
  saving,
  error,
  onInputChange,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Child Office</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={office.name}
              onChange={(e) => onInputChange("name", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="nameBn">Name (Bengali)</Label>
            <Input
              id="nameBn"
              value={office.nameBn}
              onChange={(e) => onInputChange("nameBn", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              value={office.code}
              onChange={(e) => onInputChange("code", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Select
              value={office.type}
              onValueChange={(value: string) => onInputChange("type", value)}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select office type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OFFICE">Office</SelectItem>
                <SelectItem value="FACULTY">Faculty</SelectItem>
                <SelectItem value="DEPARTMENT">Department</SelectItem>
                <SelectItem value="FACILITY">Facility</SelectItem>
                <SelectItem value="HALL">Hall</SelectItem>
                <SelectItem value="INSTITUTE">Institute</SelectItem>
                <SelectItem value="CENTER">Center</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={office.description}
              onChange={(e) => onInputChange("description", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="orderIndex">Order Index</Label>
            <Input
              id="orderIndex"
              type="number"
              value={office.orderIndex}
              onChange={(e) => onInputChange("orderIndex", e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={office.isActive}
              onCheckedChange={(checked) => onInputChange("isActive", checked)}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Adding..." : "Add Child Office"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </CardContent>
    </Card>
  );
}
