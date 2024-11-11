import React from 'react';
import type { CollectionStats as StatsType } from '../types';

interface CollectionStatsProps {
  stats: StatsType;
}

export function CollectionStats({ stats }: CollectionStatsProps) {
  const completionRate = Math.round((stats.owned / stats.total) * 100);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6">Collection Statistics</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-blue-600 text-sm font-medium">Total Models</p>
          <p className="text-3xl font-bold text-blue-700">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-green-600 text-sm font-medium">Owned Models</p>
          <p className="text-3xl font-bold text-green-700">{stats.owned}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-purple-600 text-sm font-medium">Completion</p>
          <p className="text-3xl font-bold text-purple-700">{completionRate}%</p>
        </div>
      </div>

      {/* Series Breakdown */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Series Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(stats.series).map(([series, count]) => (
            <div key={series} className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-600 font-medium">{series}</p>
              <p className="text-2xl font-bold text-gray-800">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}