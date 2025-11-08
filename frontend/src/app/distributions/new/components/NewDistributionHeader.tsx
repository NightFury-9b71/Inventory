"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onBack: () => void;
};

export default function NewDistributionHeader({ onBack }: Props) {
  return (
    <div className="mb-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Distributions
      </Button>
      <h1 className="text-2xl font-bold text-gray-900">Create New Distribution</h1>
      <p className="text-gray-600">Distribute items to offices</p>
    </div>
  );
}