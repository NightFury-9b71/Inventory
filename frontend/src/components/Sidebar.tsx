'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Settings, 
  BarChart3, 
  Menu, 
  LogOut,
  Package,
  FolderTree,
  ShoppingCart,
  Send,
  ArrowLeftRight,
  FileText,
  QrCode,
  AlertTriangle,
  Building2,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarItems } from '@/types/constant';
import Link from 'next/link';
import { useAuth } from '@/auth-context';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);      // for mobile sidebar
  const [isCollapsed, setIsCollapsed] = useState(false); // for desktop collapse
  const [selectedItem, setSelectedItem] = useState<string | null>(SidebarItems.ALL_OFFICES);
  const { user, logout } = useAuth();

  const sidebarSections = [
    {
      title: 'Main',
      items: [
        { icon: Home, label: 'Dashboard', href: '/dashboard' },
        { icon: Building2, label: 'Offices', href: '/offices' },
      ]
    },
    {
      title: 'Inventory',
      items: [
        { icon: Package, label: 'Items', href: '/items' },
        { icon: FolderTree, label: 'Categories', href: '/categories' },
        { icon: AlertTriangle, label: 'Low Stock', href: '/items?filter=low-stock' },
      ]
    },
    {
      title: 'Operations',
      items: [
        { icon: ShoppingCart, label: 'Purchases', href: '/purchases' },
        { icon: Send, label: 'Distributions', href: '/distributions' },
        { icon: ArrowLeftRight, label: 'Movements', href: '/movements' },
      ]
    },
    {
      title: 'Reports & Tools',
      items: [
        { icon: BarChart3, label: 'Reports', href: '/reports' },
        { icon: QrCode, label: 'Barcode Scan', href: '/barcode' },
        { icon: TrendingUp, label: 'Analytics', href: '/analytics' },
      ]
    },
    {
      title: 'System',
      items: [
        { icon: FileText, label: 'Audit Logs', href: '/logs' },
        { icon: Settings, label: 'Settings', href: '/settings' },
      ]
    }
  ];

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const toggleMobile = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
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
          overflow-y-auto
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-lg">Inventory</span>
              </div>
            )}
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
          <nav className="flex-1 p-4 space-y-6">
            {sidebarSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {!isCollapsed && (
                  <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {section.title}
                  </h3>
                )}
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      onClick={() => {
                        setSelectedItem(item.label);
                        setIsOpen(false); // Close mobile sidebar on navigation
                      }}
                      className={`
                        flex items-center w-full gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors
                        ${isCollapsed ? 'justify-center' : ''} 
                        ${selectedItem === item.label ? 'bg-blue-50 text-blue-700 font-medium' : ''}
                      `}
                      title={isCollapsed ? item.label : ''}
                    >
                      <item.icon className={`h-5 w-5 flex-shrink-0 ${selectedItem === item.label ? 'text-blue-600' : ''}`} />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Logout Button */}
            <div className="pt-4 border-t border-gray-200">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className={`
                  w-full gap-3 px-3 py-2 text-red-600 hover:bg-red-50 hover:text-red-700
                  ${isCollapsed ? 'justify-center' : 'justify-start'}
                `}
                title={isCollapsed ? 'Logout' : ''}
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>Logout</span>}
              </Button>
            </div>
          </nav>

          {/* Footer */}
          {/* <div className="p-4 border-t border-gray-200">
            <div
              className={`
                flex items-center gap-3 px-3 py-2
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.name || user?.username || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.role || 'Administrator'}
                  </p>
                </div>
              )}
            </div>
          </div> */}
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
