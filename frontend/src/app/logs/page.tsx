'use client';

import React from 'react';
import { PageHeader, PageTitle, PageSubtitle, PageToolbar } from '@/components/table';
import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';

function LogsPageContent() {
  return (
    <div>
      {/* Toolbar: Header */}
      <PageHeader>
        <PageTitle title="Audit Logs" />
        <PageSubtitle subtitle="Track all system activities" />
      </PageHeader>

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
  return <LogsPageContent />;
}
