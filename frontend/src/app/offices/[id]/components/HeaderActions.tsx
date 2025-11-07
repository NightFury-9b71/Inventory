"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react";
import Can from "@/components/auth/Can";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";

type Props = {
  officeName?: string;
  handleBack?: () => void;
  handleEdit?: () => void;
  handleAddChild?: () => void;
  handleDelete?: () => void;
  deleting?: boolean;
};

export default function HeaderActions({ 
  officeName = "",
  handleBack,
  handleEdit,
  handleAddChild,
  handleDelete,
  deleting = false,
}: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
            <Can page="/offices" action="edit">
              <Button variant="outline" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Office
              </Button>
            </Can>
            
            {/* Only show Add Child button if user has permission */}
            <Can page="/offices" action="create">
              <Button onClick={handleAddChild}>
                <Plus className="h-4 w-4 mr-2" />
                Add Child Office
              </Button>
            </Can>

            {/* Only show Delete button if user has permission */}
            <Can page="/offices" action="delete">
              <Button 
                variant="destructive" 
                onClick={() => setShowDeleteDialog(true)}
                disabled={deleting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {deleting ? "Deleting..." : "Delete Office"}
              </Button>
            </Can>
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
