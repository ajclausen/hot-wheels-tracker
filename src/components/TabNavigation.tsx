import React from 'react';
import { Car, Search, User } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around">
          <button
            onClick={() => onTabChange('inventory')}
            className={`flex flex-col items-center py-3 px-6 ${
              activeTab === 'inventory' ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <Car className="h-6 w-6" />
            <span className="text-sm mt-1">Inventory</span>
          </button>

          <button
            onClick={() => onTabChange('search')}
            className={`flex flex-col items-center py-3 px-6 ${
              activeTab === 'search' ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <Search className="h-6 w-6" />
            <span className="text-sm mt-1">Search</span>
          </button>

          <button
            onClick={() => onTabChange('profile')}
            className={`flex flex-col items-center py-3 px-6 ${
              activeTab === 'profile' ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <User className="h-6 w-6" />
            <span className="text-sm mt-1">Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
}