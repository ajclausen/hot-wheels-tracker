import React from 'react';
import { Search } from 'lucide-react';
import { ModelCard } from './ModelCard';
import { CollectionStats } from './CollectionStats';
import type { HotWheelsModel, CollectionStats as StatsType } from '../types';

interface InventoryViewProps {
  models: HotWheelsModel[];
  stats: StatsType;
  onToggleOwned: (id: string) => void;
  onEditNotes: (id: string) => void;
  onOpenSearch: () => void;
}

export function InventoryView({ models, stats, onToggleOwned, onEditNotes, onOpenSearch }: InventoryViewProps) {
  const ownedModels = models.filter(model => model.owned);

  return (
    <div className="pb-20">
      <CollectionStats stats={stats} />
      
      {/* Floating Search Button */}
      <button
        onClick={onOpenSearch}
        className="fixed right-6 bottom-24 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-20"
        aria-label="Search Models"
      >
        <Search className="h-6 w-6" />
      </button>
      
      {ownedModels.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No models in your inventory yet.</p>
          <p className="text-gray-400 text-sm">Go to Search to add some!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ownedModels.map(model => (
            <ModelCard
              key={model.id}
              model={model}
              onToggleOwned={onToggleOwned}
              onEditNotes={onEditNotes}
            />
          ))}
        </div>
      )}
    </div>
  );
}