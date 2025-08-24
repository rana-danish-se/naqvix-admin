
import { ImageIcon, ExternalLink } from 'lucide-react';

const GalleriesList = ({ galleries, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {galleries.map((item) => (
        <div key={item._id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          {item.images && item.images.length > 0 && (
            <div className="relative">
              <img
                src={item.images[0].url}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              {item.images.length > 1 && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
                  +{item.images.length - 1} more
                </div>
              )}
              <div className="absolute inset-0  bg-opacity-20 flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-white" />
              </div>
            </div>
          )}
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
            {item.description && (
              <p className="text-gray-600 mb-3 text-sm">{item.description}</p>
            )}
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm mb-2 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View Link
              </a>
            )}
            <div className="text-xs text-gray-500 mb-3">
              {item.images?.length || 0} images • Created: {new Date(item.createdAt).toLocaleDateString()}
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

export default GalleriesList;