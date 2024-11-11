import React from 'react';

export interface FilterState {
  series: string;
  year: string;
  owned: string;
}

interface FiltersProps {
  onFilterChange: (filters: Partial<FilterState>) => void;
  series: string[];
  years: number[];
}

export function Filters({ onFilterChange, series, years }: FiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          onChange={(e) => onFilterChange({ series: e.target.value })}
          className="rounded-lg border border-gray-300 p-2"
        >
          <option value="">All Series</option>
          {series.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => onFilterChange({ year: e.target.value })}
          className="rounded-lg border border-gray-300 p-2"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => onFilterChange({ owned: e.target.value })}
          className="rounded-lg border border-gray-300 p-2"
        >
          <option value="">All Models</option>
          <option value="true">Owned</option>
          <option value="false">Not Owned</option>
        </select>
      </div>
    </div>
  );
}