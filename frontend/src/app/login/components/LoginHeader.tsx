"use client";

import React from "react";
import { Building } from "lucide-react";

export default function LoginHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
        <Building className="h-8 w-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
      <p className="text-gray-600">Sign in to your account</p>
    </div>
  );
}
