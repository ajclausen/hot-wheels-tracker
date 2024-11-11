import React from 'react';
import { Check, Edit3 } from 'lucide-react';

interface ModelCardProps {
  model: {
    id: string;
    name: string;
    series: string;
    year: number;
    imageUrl: string;
    owned: boolean;
    notes?: string;
  };
  onToggleOwned: (id: string) => void;
  onEditNotes: (id: string) => void;
}

export function ModelCard({ model, onToggleOwned, onEditNotes }: ModelCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <img
          src={model.imageUrl}
          alt={model.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => onToggleOwned(model.id)}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            model.owned ? 'bg-green-500' : 'bg-gray-200'
          }`}
        >
          <Check className={`h-5 w-5 ${model.owned ? 'text-white' : 'text-gray-500'}`} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{model.name}</h3>
        <div className="text-sm text-gray-600 mb-2">
          <p>{model.series}</p>
          <p>{model.year}</p>
        </div>
        {model.notes && (
          <p className="text-sm text-gray-500 italic mb-2">{model.notes}</p>
        )}
        <button
          onClick={() => onEditNotes(model.id)}
          className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
        >
          <Edit3 className="h-4 w-4" />
          <span>Edit Notes</span>
        </button>
      </div>
    </div>
  );
}