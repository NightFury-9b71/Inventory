import { SidebarItems } from '@/types/constant';
import React, { createContext, useContext, useState } from 'react';

type LayoutContextType = {
  selectedItem: string | null;
  setSelectedItem: (item: string) => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(SidebarItems.ALL_OFFICES);

  return (
    <LayoutContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};