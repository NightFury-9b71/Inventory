'use client';

import { Card } from '@/components/ui/card';
import { BarChart3, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReportsPage() {
  const reportTypes = [
    {
      title: 'Inventory Report',
      description: 'Complete inventory status with stock levels',
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Purchase Report',
      description: 'Summary of all purchases and expenses',
      icon: BarChart3,
      color: 'green'
    },
    {
      title: 'Distribution Report',
      description: 'Items distributed to offices',
      icon: FileText,
      color: 'purple'
    },
    {
      title: 'Low Stock Report',
      description: 'Items that need restocking',
      icon: FileText,
      color: 'orange'
    },
    {
      title: 'Category Report',
      description: 'Items grouped by categories',
      icon: BarChart3,
      color: 'indigo'
    },
    {
      title: 'Movement Report',
      description: 'Item transfers between offices',
      icon: FileText,
      color: 'cyan'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
        <p className="text-slate-600 mt-1">Generate comprehensive inventory reports</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reportTypes.map((report, index) => {
          const Icon = report.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className={`bg-${report.color}-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`h-6 w-6 text-${report.color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {report.title}
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                {report.description}
              </p>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
