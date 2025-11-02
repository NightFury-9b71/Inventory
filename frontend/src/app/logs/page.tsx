'use client';

import React from 'react';
import { PageTableProvider } from '@/contexts/PageTableContext';
import { PageToolbar, PageHeader } from '@/components/page';
import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';

function LogsPageContent() {
  return (
    <div className="p-6">
      {/* Toolbar: Header */}
      <PageToolbar>
        <PageHeader 
          title="Audit Logs"
          subtitle="Track all system activities"
        />
      </PageToolbar>

      {/* Info Card */}
      <Card className="p-12 text-center mt-4">
        <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Activity Logs
        </h2>
        <p className="text-slate-600 max-w-md mx-auto">
          Complete audit trail of all inventory operations including item additions, 
          purchases, distributions, and user activities.
        </p>
      </Card>
    </div>
  );
}

export default function LogsPage() {
  return (
    <PageTableProvider>
      <LogsPageContent />
    </PageTableProvider>
  );
}
