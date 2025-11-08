"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react";
import Can from "@/components/auth/Can";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";

type Props = {
  itemName?: string;
  handleBack?: () => void;
  handleEdit?: () => void;
  handleAddChild?: () => void;
  handleDelete?: () => void | Promise<void>;
  deleting?: boolean;
};

export default function HeaderActions({ 
  itemName = "",
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
            Back to Items
          </Button>
          <div className="flex gap-2">
            {/* Only show Edit button if user has permission */}
            <Can page="/items" action="edit">
              <Button variant="outline" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Item
              </Button>
            </Can>
            
            {/* Only show Add Child button if user has permission */}
            <Can page="/items" action="create">
              <Button onClick={handleAddChild}>
                <Plus className="h-4 w-4 mr-2" />
                Add Child Item
              </Button>
            </Can>

            {/* Only show Delete button if user has permission */}
            <Can page="/items" action="delete">
              <Button 
                variant="destructive" 
                onClick={() => setShowDeleteDialog(true)}
                disabled={deleting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {deleting ? "Deleting..." : "Delete Item"}
              </Button>
            </Can>
          </div>
        </div>
      </div>

      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteConfirm}
        title="Delete Item"
        description={`You are about to delete "${itemName}". This action cannot be undone.`}
        confirmationText={itemName}
        warningMessage="This will permanently delete the item and all its associated data."
        isDeleting={deleting}
      />
    </>
  );
}
