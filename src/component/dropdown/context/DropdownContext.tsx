'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import { DropdownController } from '../hooks/useDropdown';

const DropdownContext = createContext<DropdownController | undefined>(undefined);

export const DropdownProvider: React.FC<{
  value: DropdownController;
  children: ReactNode;
}> = ({ value, children }) => (
  <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>
);

export const useDropdownContext = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('useDropdownContext must be used within a DropdownProvider');
  return ctx;
};
