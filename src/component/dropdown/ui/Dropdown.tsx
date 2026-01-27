'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { useDropdown, DropdownController } from '../hooks/useDropdown';
import { DropdownProvider } from '../context/DropdownContext';
import { DropdownPosition } from '../types/dropdown.types';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  position?: DropdownPosition;
  hook?: DropdownController; // pass external hook for full control
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  className,
  position = 'bottom-left',
  hook
}) => {
  const internal = useDropdown(false, position);
  const ctrl = hook ?? internal;

  const { isOpen, toggle, triggerRef, dropdownRef, coords, open, close } = ctrl;

  return (
    <>
      <div ref={triggerRef} onClick={toggle} className="inline-block cursor-pointer">
        {trigger}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'absolute',
              top: coords.top,
              left: coords.left,
              zIndex: 29,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'scale(1)' : 'scale(0.95)',
              transformOrigin: position.startsWith('bottom') ? 'top left' : 'bottom left',
              transition: 'opacity 0.2s ease, transform 0.2s ease'
            }}
            className={className}
          >
            <DropdownProvider value={ctrl}>{children}</DropdownProvider>
          </div>,
          document.body
        )}
    </>
  );
};
