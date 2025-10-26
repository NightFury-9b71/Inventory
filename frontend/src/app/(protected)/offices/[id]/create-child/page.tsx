"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createOffice } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { useAuth } from "@/auth-context";
import { toast } from "sonner";

export default function AddChildOfficePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parentId = params.id as string;

  const [office, setOffice] = useState({
    name: "",
    nameBn: "",
    code: "",
    type: "",
    description: "",
    orderIndex: "",
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      const newOffice = {
        ...office,
        orderIndex: office.orderIndex ? Number(office.orderIndex) : undefined,
        parentId: Number(parentId),
      };
      await createOffice(newOffice);
      toast.success("Child office added successfully!", {
        description: "The new office has been created under the selected parent."
      });
      router.push(`/offices/${parentId}`);
    } catch (err: any) {
      toast.error("Failed to add child office", {
        description: "Please check your input and try again."
      });
      setError("Failed to add child office");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setOffice({ ...office, [field]: value });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Office Details
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Child Office</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={office.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="nameBn">Name (Bengali)</Label>
              <Input
                id="nameBn"
                value={office.nameBn}
                onChange={(e) => handleInputChange("nameBn", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                value={office.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={office.type}
                onValueChange={(value) => handleInputChange("type", value)}
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
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="orderIndex">Order Index</Label>
              <Input
                id="orderIndex"
                type="number"
                value={office.orderIndex}
                onChange={(e) => handleInputChange("orderIndex", e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={office.isActive}
                onCheckedChange={(checked) => handleInputChange("isActive", checked)}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Adding..." : "Add Child Office"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/offices/${parentId}`)}
              >
                Cancel
              </Button>
            </div>
          </form>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}