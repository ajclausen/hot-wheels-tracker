import React, { useState, useMemo, useRef } from 'react';
import { TabNavigation } from './components/TabNavigation';
import { InventoryView } from './components/InventoryView';
import { SearchView } from './components/SearchView';
import { ProfileView } from './components/ProfileView';
import { Modal } from './components/Modal';
import { NotesEditor } from './components/NotesEditor';
import type { HotWheelsModel, CollectionStats as StatsType } from './types';
import { mockDatabase } from './mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [models, setModels] = useState<HotWheelsModel[]>(mockDatabase.models.map(model => ({
    ...model,
    owned: false
  })));
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const stats: StatsType = useMemo(() => {
    const ownedModels = models.filter(m => m.owned);
    const seriesCounts = ownedModels.reduce((acc, model) => {
      acc[model.series] = (acc[model.series] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: models.length,
      owned: ownedModels.length,
      series: seriesCounts
    };
  }, [models]);

  const handleToggleOwned = (id: string) => {
    setModels(models.map(model =>
      model.id === id ? { ...model, owned: !model.owned } : model
    ));
  };

  const handleEditNotes = (id: string) => {
    setSelectedModelId(id);
    setIsNotesModalOpen(true);
  };

  const handleSaveNotes = (notes: string) => {
    if (selectedModelId) {
      setModels(models.map(model =>
        model.id === selectedModelId ? { ...model, notes } : model
      ));
      setIsNotesModalOpen(false);
    }
  };

  const handleAddModel = (newModel: HotWheelsModel) => {
    setModels(prev => prev.map(model =>
      model.id === newModel.id ? { ...model, owned: true } : model
    ));
  };

  const handleOpenSearch = () => {
    setActiveTab('search');
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const selectedModel = selectedModelId 
    ? models.find(model => model.id === selectedModelId)
    : null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hot Wheels Collection
          </h1>
        </header>

        {activeTab === 'inventory' && (
          <InventoryView
            models={models}
            stats={stats}
            onToggleOwned={handleToggleOwned}
            onEditNotes={handleEditNotes}
            onOpenSearch={handleOpenSearch}
          />
        )}

        {activeTab === 'search' && (
          <SearchView
            models={models}
            onAddModel={handleAddModel}
            onToggleOwned={handleToggleOwned}
            onEditNotes={handleEditNotes}
            searchInputRef={searchInputRef}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView />
        )}

        <Modal
          isOpen={isNotesModalOpen}
          onClose={() => setIsNotesModalOpen(false)}
          title={`Edit Notes - ${selectedModel?.name}`}
        >
          <NotesEditor
            initialNotes={selectedModel?.notes}
            onSave={handleSaveNotes}
            onClose={() => setIsNotesModalOpen(false)}
          />
        </Modal>
      </div>

      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}