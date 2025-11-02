'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp, BarChart3, PieChart } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-600 mt-1">Insights and trends for your inventory</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Stock Trends
          </h3>
          <p className="text-sm text-slate-600">
            Track stock levels over time
          </p>
        </Card>

        <Card className="p-6">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <BarChart3 className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Purchase Analysis
          </h3>
          <p className="text-sm text-slate-600">
            Analyze spending patterns
          </p>
        </Card>

        <Card className="p-6">
          <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <PieChart className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Distribution Insights
          </h3>
          <p className="text-sm text-slate-600">
            See where items are allocated
          </p>
        </Card>
      </div>

      <Card className="p-12 text-center">
        <BarChart3 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Advanced Analytics Coming Soon
        </h2>
        <p className="text-slate-600 max-w-md mx-auto">
          Comprehensive charts, graphs, and insights to help you make data-driven decisions.
        </p>
      </Card>
    </div>
  );
}
