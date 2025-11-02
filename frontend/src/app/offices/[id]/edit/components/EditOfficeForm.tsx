"use client";

import React from "react";
import { Office } from "@/types/office";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Save } from "lucide-react";

type Props = {
  office: Office;
  saving: boolean;
  onInputChange: (field: keyof Office, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function EditOfficeForm({
  office,
  saving,
  onInputChange,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Office</CardTitle>
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
              disabled
            />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              value={office.type}
              onChange={(e) => onInputChange("type", e.target.value)}
              required
              disabled
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={office.description || ""}
              onChange={(e) => onInputChange("description", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="orderIndex">Order Index</Label>
            <Input
              id="orderIndex"
              type="number"
              value={office.orderIndex || ""}
              onChange={(e) =>
                onInputChange(
                  "orderIndex",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
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
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
