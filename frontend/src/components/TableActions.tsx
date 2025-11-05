"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";

interface TableActionsProps<T = any> {
  item: T;
  itemName: string;
  basePath?: string; // Made optional since handlers can be provided
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: () => void;
  isDeleting?: boolean;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  confirmationText?: string;
}

export default function TableActions<T extends { id: number | string }>({
  item,
  itemName,
  basePath,
  onView,
  onEdit,
  onDelete,
  isDeleting = false,
  showView = true,
  showEdit = true,
  showDelete = true,
  confirmationText,
}: TableActionsProps<T>) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleView = () => {
    if (onView) {
      onView(item);
    } else if (basePath) {
      router.push(`${basePath}/${item.id}`);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(item);
    } else if (basePath) {
      router.push(`${basePath}/${item.id}/edit`);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        {showView && (
          <Button variant="ghost" size="sm" onClick={handleView}>
            <Eye className="h-4 w-4" />
          </Button>
        )}
        {showEdit && (
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            <Edit className="h-4 w-4" />
          </Button>
        )}
        {showDelete && onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteDialogOpen(true)}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showDelete && onDelete && (
        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDelete}
          title={`Delete ${itemName}`}
          description={`Are you sure you want to delete this ${itemName.toLowerCase()}? This action cannot be undone.`}
          confirmationText={confirmationText || "delete"}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
}
