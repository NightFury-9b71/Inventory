"use client";
import { useAuth } from "@/contexts/AuthContext";
import { canPerformAction } from "@/lib/polices";

interface CanProps {
  page: string;
  action: string;
  children: React.ReactNode;
}

export default function Can({ page, action, children }: CanProps) {
  const { role } = useAuth();
  const allowed = canPerformAction(role as any, page, action);
  if (!allowed) return null;
  return <>{children}</>;
}
