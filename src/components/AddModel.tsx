import React, { useState } from 'react';
import { Search, Plus, Loader2 } from 'lucide-react';
import axios from 'axios';
import type { HotWheelsModel, SearchResult } from '../types';

interface AddModelProps {
  onAdd: (model: HotWheelsModel) => void;
}

export function AddModel({ onAdd }: AddModelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError('');
    setResults([]);
    
    try {
      const response = await axios.get(`/api/search?query=${encodeURIComponent(searchQuery)}`, {
        timeout: 30000,
        validateStatus: (status) => status < 500
      });

      if (response.status === 200 && Array.isArray(response.data)) {
        setResults(response.data);
        if (response.data.length === 0) {
          setError('No results found. Try a different search term.');
        }
      } else {
        throw new Error(response.data?.error || 'Invalid response format');
      }
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.error || err.message
        : 'Failed to search. Please try again.';
      setError(errorMessage);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (modelId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/model/${modelId}`, {
        timeout: 30000,
        validateStatus: (status) => status < 500
      });
      
      if (response.status === 200 && response.data) {
        const newModel: HotWheelsModel = {
          ...response.data,
          owned: false,
        };
        
        onAdd(newModel);
        setResults([]);
        setSearchQuery('');
      } else {
        throw new Error(response.data?.error || 'Invalid model data');
      }
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.error || err.message
        : 'Failed to add model. Please try again.';
      setError(errorMessage);
      console.error('Add error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search Hot Wheels database..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Search'}
        </button>
      </div>

      {error && (
        <div className="text-red-500 mb-4 p-2 bg-red-50 rounded-lg">{error}</div>
      )}

      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Search Results</h3>
          <div className="space-y-2">
            {results.map((result, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <div>
                  <span className="text-gray-700">{result.title}</span>
                  {result.description && (
                    <p className="text-sm text-gray-500">{result.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleAdd(result.url.split('/models/')[1])}
                  disabled={loading}
                  className="p-1 text-blue-500 hover:bg-blue-50 rounded-full disabled:opacity-50"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}