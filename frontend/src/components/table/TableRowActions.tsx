// components/table/TableRowActions.tsx
"use client";
import { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react"; // from lucide-react (used in shadcn/ui)
import { Button } from "@/components/ui/button"; // shadcn or your custom button
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";
import Can from "../auth/Can";

type Props<T> = {
  row: T;
  page: string;
  actions: {
    showView: boolean;
    showEdit: boolean;
    showDelete: boolean;
    onView: (row: T) => void;
    onEdit: (row: T) => void;
    onDelete: (row: T) => void;
  };
  itemName?: string;
  confirmationText?: string;
  isDeleting?: boolean;
};

export function TableRowActions<T extends { id: string | number }>({
  row,
  page,
  actions,
  itemName = "item",
  confirmationText = "delete",
  isDeleting = false
}: Props<T>) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    actions.onDelete(row);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2 justify-end">
        {actions.showView && (
          <Can page={page} action="view">
            <Button
              size="sm"
              variant="outline"
              onClick={() => actions.onView(row)}
              className="hover:bg-blue-50"
            >
              <Eye className="w-4 h-4 text-blue-600" />
            </Button>
          </Can>
        )}
        {actions.showEdit && (
          <Can page={page} action="edit">
            <Button
              size="sm"
              variant="outline"
              onClick={() => actions.onEdit(row)}
              className="hover:bg-yellow-50"
            >
              <Edit className="w-4 h-4 text-yellow-600" />
            </Button>
          </Can>
        )}
        {actions.showDelete && (
          <Can page={page} action="delete">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setDeleteDialogOpen(true)}
              className="hover:bg-red-50"
              disabled={isDeleting}
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </Can>
        )}
      </div>

      {actions.showDelete && (
        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDelete}
          title={`Delete ${itemName}`}
          description={`Are you sure you want to delete this ${itemName}? This action cannot be undone.`}
          confirmationText={confirmationText}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
}