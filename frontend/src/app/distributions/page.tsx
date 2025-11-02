'use client';

import React from 'react';
import { PageTableProvider } from '@/contexts/PageTableContext';
import { PageToolbar, PageHeader } from '@/components/page';
import { Card } from '@/components/ui/card';
import { Send, Building2, Package } from 'lucide-react';

function DistributionsPageContent() {
  return (
    <div className="p-6">
      {/* Toolbar: Header */}
      <PageToolbar>
        <PageHeader 
          title="Distributions"
          subtitle="Allocate items to offices and departments"
        />
      </PageToolbar>

      {/* Info Card */}
      <Card className="p-12 text-center mt-4">
        <Send className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Distribution Management
        </h2>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          Track and manage the distribution of items to different offices, departments, and faculties.
        </p>
        <div className="grid gap-4 md:grid-cols-3 max-w-3xl mx-auto mt-8">
          <Card className="p-6">
            <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Select Office</h3>
            <p className="text-sm text-slate-600">Choose destination</p>
          </Card>
          <Card className="p-6">
            <Package className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Select Items</h3>
            <p className="text-sm text-slate-600">Choose quantities</p>
          </Card>
          <Card className="p-6">
            <Send className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Distribute</h3>
            <p className="text-sm text-slate-600">Complete transfer</p>
          </Card>
        </div>
      </Card>
    </div>
  );
}

export default function DistributionsPage() {
  return (
    <PageTableProvider>
      <DistributionsPageContent />
    </PageTableProvider>
  );
}
