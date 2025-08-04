'use client';

import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  Settings,
  FileText,
  BarChart3,
  Menu,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);      // for mobile sidebar
  const [isCollapsed, setIsCollapsed] = useState(false); // for desktop collapse

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '#' },
    { icon: Users, label: 'Team', href: '#' },
    { icon: FileText, label: 'Documents', href: '#' },
    { icon: BarChart3, label: 'Analytics', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
  ];

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const toggleMobile = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-2">
        <Button variant="outline" onClick={toggleMobile}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative top-0 left-0 h-full z-50 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          ${isCollapsed ? 'md:w-16' : 'md:w-64'}
          w-64
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {!isCollapsed && <span className="font-semibold text-lg">Menu</span>}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapse}
              className="ml-auto hidden md:flex"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobile}
              className="ml-auto md:hidden"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                title={isCollapsed ? item.label : ''}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </a>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div
              className={`
                flex items-center gap-3 px-3 py-2
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    john@example.com
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur bg-opacity-40 z-40 md:hidden"
          onClick={toggleMobile}
        />
      )}
    </>
  );
}
