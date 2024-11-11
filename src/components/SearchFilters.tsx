import React from 'react';

interface SearchFiltersProps {
  filters: {
    year: string;
    series: string;
    color: string;
  };
  onFilterChange: (filters: any) => void;
  years: number[];
  series: string[];
  colors: string[];
}

export function SearchFilters({ filters, onFilterChange, years, series, colors }: SearchFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm mb-4">
      <select
        value={filters.year}
        onChange={(e) => onFilterChange({ ...filters, year: e.target.value })}
        className="rounded-lg border border-gray-300 p-2"
      >
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      <select
        value={filters.series}
        onChange={(e) => onFilterChange({ ...filters, series: e.target.value })}
        className="rounded-lg border border-gray-300 p-2"
      >
        <option value="">All Series</option>
        {series.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select
        value={filters.color}
        onChange={(e) => onFilterChange({ ...filters, color: e.target.value })}
        className="rounded-lg border border-gray-300 p-2"
      >
        <option value="">All Colors</option>
        {colors.map((color) => (
          <option key={color} value={color}>{color}</option>
        ))}
      </select>
    </div>
  );
}