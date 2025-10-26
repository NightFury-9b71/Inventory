"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOfficeById } from "@/lib/api";
import { Office } from "@/types/office";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building, MapPin, Hash, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "@/auth-context";

export default function OfficeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [office, setOffice] = useState<Office | null>(null);
  const [loading, setLoading] = useState(true);
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
          Back to Offices
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Office Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-lg font-semibold">{office.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Name (Bengali)</label>
              <p className="text-lg">{office.nameBn}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Code</label>
              <p className="flex items-center gap-2">
                <Hash className="h-4 w-4" />
                {office.code}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Type</label>
              <p>{office.type}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <p className="flex items-center gap-2">
                {office.isActive ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-green-600">Active</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-red-600">Inactive</span>
                  </>
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">ID</label>
              <p>{office.id}</p>
            </div>
            {office.description && (
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p>{office.description}</p>
              </div>
            )}
            {office.orderIndex !== undefined && (
              <div>
                <label className="text-sm font-medium text-gray-500">Order Index</label>
                <p>{office.orderIndex}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {office.subOffices && office.subOffices.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Child Offices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {office.subOffices.map((childOffice) => (
                <div
                  key={childOffice.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => router.push(`/offices/${childOffice.id}`)}
                >
                  <h3 className="font-semibold">{childOffice.name}</h3>
                  <p className="text-sm text-gray-600">{childOffice.code}</p>
                  <p className="text-xs text-gray-500">{childOffice.type}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}