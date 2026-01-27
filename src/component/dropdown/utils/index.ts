import { DropdownPosition } from '../types/dropdown.types';

export const getDropdownPosition = (
  trigger: HTMLDivElement,
  dropdown: HTMLDivElement | null,
  position: DropdownPosition
) => {
  const rect = trigger.getBoundingClientRect();
  const width = dropdown?.offsetWidth ?? 0;
  const height = dropdown?.offsetHeight ?? 0;

  // account for scrolling
  const scrollX = window.scrollX || window.pageXOffset;
  const scrollY = window.scrollY || window.pageYOffset;

  switch (position) {
    case 'bottom-left':
      return { top: rect.bottom + scrollY, left: rect.left + scrollX };
    case 'bottom-right':
      return { top: rect.bottom + scrollY, left: rect.right - width + scrollX };
    case 'top-left':
      return { top: rect.top - height + scrollY, left: rect.left + scrollX };
    case 'top-right':
      return {
        top: rect.top - height + scrollY,
        left: rect.right - width + scrollX
      };
    case 'center': {
      const viewportWidth = window.innerWidth;
      return {
        top: rect.bottom + scrollY,
        left: viewportWidth / 2 - width / 2
      };
    }
  }
};
