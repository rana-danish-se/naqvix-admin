import React from 'react';
import { Plus } from 'lucide-react';

const EmptyState = ({ activeTab, getTabLabel, onCreateNew }) => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 text-xl mb-4">
        No {getTabLabel(activeTab).toLowerCase()} found
      </div>
      <button
        onClick={onCreateNew}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <Plus className="h-5 w-5 mr-2" />
        Create your first {getTabLabel(activeTab).slice(0, -1).toLowerCase()}
      </button>
    </div>
  );
};

export default EmptyState;