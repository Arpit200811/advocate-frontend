// utils/dropdownHelper.js
// Helper functions for managing dropdown state, click outside detection, and keyboard accessibility.
import React from 'react';

export const useDropdown = (initialState = null) => {
  const [openDropdown, setOpenDropdown] = React.useState(initialState);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest('[data-dropdown]')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  // Close on Escape key
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && openDropdown) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [openDropdown]);

  const toggle = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return { openDropdown, toggle, setOpenDropdown };
};
