'use client';

import { Card } from '@/components/ui/card';
import { Settings as SettingsIcon, User, Bell, Shield, Database } from 'lucide-react';

export default function SettingsPage() {
  const settingSections = [
    {
      icon: User,
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      color: 'blue'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure system notifications and alerts',
      color: 'green'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Security settings and access control',
      color: 'red'
    },
    {
      icon: Database,
      title: 'Data Management',
      description: 'Backup and restore data',
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">System configuration and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {settingSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className={`bg-${section.color}-100 p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 text-${section.color}-600`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {section.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {section.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
