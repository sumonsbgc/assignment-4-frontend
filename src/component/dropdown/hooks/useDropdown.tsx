'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { getDropdownPosition } from '../utils/index';
import { DropdownPosition } from '../types/dropdown.types';

export type DropdownController = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  coords: { top: number; left: number };
  triggerRef: React.RefObject<HTMLDivElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  updatePosition: () => void;
};

export function useDropdown(
  defaultOpen = false,
  defaultPosition: DropdownPosition = 'bottom-right'
): DropdownController {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    if (!dropdownRef.current) return;

    requestAnimationFrame(() => {
      setCoords(getDropdownPosition(triggerRef.current!, dropdownRef.current, defaultPosition));
    });
  }, [defaultPosition]);

  // Recalculate on open, resize, scroll
  useEffect(() => {
    if (!isOpen) return;
    updatePosition();
    const resize = () => updatePosition();
    const scroll = () => updatePosition();

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', scroll, true);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', scroll, true);
    };
  }, [isOpen, updatePosition]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        close();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, close]);

  return {
    isOpen,
    open,
    close,
    toggle,
    coords,
    triggerRef,
    dropdownRef,
    updatePosition
  };
}
