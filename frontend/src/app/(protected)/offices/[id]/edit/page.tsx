"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOfficeById, updateOffice } from "@/lib/api";
import { Office } from "@/types/office";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save } from "lucide-react";
import { useAuth } from "@/auth-context";

export default function EditOfficePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [office, setOffice] = useState<Office | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const officeId = params.id as string;

  useEffect(() => {
    const loadOffice = async () => {
      try {
        setLoading(true);
        const data = await getOfficeById(Number(officeId));
        setOffice(data);
      } catch (err: any) {
        console.error("Failed to fetch office", err);
        setError("Failed to load office details");
      } finally {
        setLoading(false);
      }
    };

    if (officeId) {
      loadOffice();
    }
  }, [officeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!office) return;

    try {
      setSaving(true);
      await updateOffice(Number(officeId), office);
      router.push(`/offices/${officeId}`);
    } catch (err: any) {
      console.error("Failed to update office", err);
      setError("Failed to update office");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof Office, value: any) => {
    if (!office) return;
    setOffice({ ...office, [field]: value });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <p>Loading office details...</p>
        </div>
      </div>
    );
  }

  if (error || !office) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || "Office not found"}</p>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
          <CardTitle>Edit Office</CardTitle>
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
                disabled
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                value={office.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                required
                disabled
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={office.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="orderIndex">Order Index</Label>
              <Input
                id="orderIndex"
                type="number"
                value={office.orderIndex || ""}
                onChange={(e) => handleInputChange("orderIndex", e.target.value ? Number(e.target.value) : undefined)}
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
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/offices/${officeId}`)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}