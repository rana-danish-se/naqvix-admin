import React from 'react';
import { Play, ExternalLink } from 'lucide-react';

const VideosList = ({ videos, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((item) => (
        <div key={item._id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          {item.thumbnailUrl && (
            <div className="relative">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <Play className="h-12 w-12 text-white" />
              </div>
            </div>
          )}
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
            {item.description && (
              <p className="text-gray-600 mb-3 text-sm">{item.description}</p>
            )}
            <a
              href={item.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm mb-2 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Watch on YouTube
            </a>
            <div className="text-xs text-gray-500 mb-3">
              Created: {new Date(item.createdAt).toLocaleDateString()}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(item)}
                className="flex-1 px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 text-sm transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item._id)}
                className="flex-1 px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50 text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideosList;
