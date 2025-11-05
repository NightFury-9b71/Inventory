"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type DeleteConfirmationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmationText: string;
  warningMessage?: string;
  isDeleting?: boolean;
};

export function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmationText,
  warningMessage,
  isDeleting = false,
}: DeleteConfirmationDialogProps) {
  const [inputValue, setInputValue] = useState("");
  const isConfirmDisabled = inputValue !== confirmationText || isDeleting;

  const handleConfirm = () => {
    if (!isConfirmDisabled) {
      onConfirm();
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setInputValue("");
    }
    onOpenChange(newOpen);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p>{description}</p>
            {warningMessage && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                <p className="text-destructive font-medium text-sm">
                  ⚠️ {warningMessage}
                </p>
              </div>
            )}
            <div className="space-y-2 pt-2">
              <Label htmlFor="confirm-input" className="text-foreground">
                Type <span className="font-semibold">{confirmationText}</span> to confirm:
              </Label>
              <Input
                id="confirm-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Type "${confirmationText}" to confirm`}
                disabled={isDeleting}
                autoComplete="off"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
