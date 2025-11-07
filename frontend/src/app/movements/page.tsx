'use client';

import React from 'react';
import { PageTableProvider } from '@/contexts/PageTableContext';
import {  PageHeader } from '@/components/table';
import { Card } from '@/components/ui/card';
import { ArrowLeftRight } from 'lucide-react';

function MovementsPageContent() {
  return (
    <div className="p-6">
      {/* Toolbar: Header */}
      <PageToolbar>
        <PageHeader 
          title="Item Movements"
          subtitle="Track transfers between offices"
        />
      </PageToolbar>

      {/* Info Card */}
      <Card className="p-12 text-center mt-4">
        <ArrowLeftRight className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Movement Tracking
        </h2>
        <p className="text-slate-600 max-w-md mx-auto">
          View and manage the movement of items between different locations, offices, and departments.
        </p>
      </Card>
    </div>
  );
}

export default function MovementsPage() {
  return (
    <PageTableProvider>
      <MovementsPageContent />
    </PageTableProvider>
  );
}
