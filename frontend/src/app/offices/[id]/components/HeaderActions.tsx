"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Plus } from "lucide-react";
import { PermissionGuard } from "@/components/auth/Guards";
import { Permission } from "@/types/auth";

type Props = {
  onBack?: () => void;
  onEdit?: () => void;
  onAddChild?: () => void;
};

export default function HeaderActions({ onBack, onEdit, onAddChild }: Props) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Offices
        </Button>
        <div className="flex gap-2">
          {/* Only show Edit button if user has permission */}
          <PermissionGuard permission={Permission.EDIT_OFFICE}>
            <Button variant="outline" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Office
            </Button>
          </PermissionGuard>
          
          {/* Only show Add Child button if user has permission */}
          <PermissionGuard permission={Permission.CREATE_OFFICE}>
            <Button onClick={onAddChild}>
              <Plus className="h-4 w-4 mr-2" />
              Add Child Office
            </Button>
          </PermissionGuard>
        </div>
      </div>
    </div>
  );
}
