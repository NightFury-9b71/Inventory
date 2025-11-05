"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react";
import { PermissionGuard } from "@/components/auth/Guards";
import { Permission } from "@/types/auth";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";
import { useOfficeCrud } from "../hooks/useOfficeCrud";

type Props = {
  officeName?: string;
};

export default function HeaderActions({ 
  officeName = "",
}: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { handleBack, handleEdit, handleAddChild, handleDelete, deleting } = useOfficeCrud();

  const handleDeleteConfirm = () => {
    if (handleDelete) {
      handleDelete();
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Offices
          </Button>
          <div className="flex gap-2">
            {/* Only show Edit button if user has permission */}
            <PermissionGuard permission={Permission.EDIT_OFFICE}>
              <Button variant="outline" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Office
              </Button>
            </PermissionGuard>
            
            {/* Only show Add Child button if user has permission */}
            <PermissionGuard permission={Permission.CREATE_OFFICE}>
              <Button onClick={handleAddChild}>
                <Plus className="h-4 w-4 mr-2" />
                Add Child Office
              </Button>
            </PermissionGuard>

            {/* Only show Delete button if user has permission */}
            <PermissionGuard permission={Permission.DELETE_OFFICE}>
              <Button 
                variant="destructive" 
                onClick={() => setShowDeleteDialog(true)}
                disabled={deleting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {deleting ? "Deleting..." : "Delete Office"}
              </Button>
            </PermissionGuard>
          </div>
        </div>
      </div>

      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteConfirm}
        title="Delete Office"
        description={`You are about to delete "${officeName}". This action cannot be undone.`}
        confirmationText={officeName}
        warningMessage="This will permanently delete the office and all its associated data."
        isDeleting={deleting}
      />
    </>
  );
}
