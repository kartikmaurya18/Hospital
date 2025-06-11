import { useState, useMemo } from 'react';

export const useSearch = (items = [], searchFields = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search term filtering
      const matchesSearch = searchTerm === '' || searchFields.some((field) => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });

      // Additional filters
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const itemValue = item[key];
        if (Array.isArray(value)) {
          return value.includes(itemValue);
        }
        return itemValue === value;
      });

      return matchesSearch && matchesFilters;
    });
  }, [items, searchTerm, filters, searchFields]);

  const setFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearAll = () => {
    clearFilters();
    clearSearch();
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilter,
    filteredItems,
    clearFilters,
    clearSearch,
    clearAll,
  };
}; 