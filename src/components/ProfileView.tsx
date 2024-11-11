import React from 'react';
import { Settings, Share2, Download, Upload, User, ChevronRight } from 'lucide-react';

export function ProfileView() {
  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-blue-100 rounded-full p-4">
            <User className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Collector Profile</h2>
            <p className="text-gray-500">Member since 2023</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button className="w-full bg-white p-4 rounded-lg shadow-md flex items-center justify-between hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            <Settings className="h-5 w-5 text-gray-500" />
            <span>Settings</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>

        <button className="w-full bg-white p-4 rounded-lg shadow-md flex items-center justify-between hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            <Share2 className="h-5 w-5 text-gray-500" />
            <span>Share Collection</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>

        <button className="w-full bg-white p-4 rounded-lg shadow-md flex items-center justify-between hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            <Download className="h-5 w-5 text-gray-500" />
            <span>Export Collection</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>

        <button className="w-full bg-white p-4 rounded-lg shadow-md flex items-center justify-between hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            <Upload className="h-5 w-5 text-gray-500" />
            <span>Import Collection</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}