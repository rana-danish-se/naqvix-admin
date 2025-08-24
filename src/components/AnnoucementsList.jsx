import { Edit2, Trash2, ExternalLink } from 'lucide-react';

const AnnouncementsList = ({ announcements, onEdit, onDelete }) => {
  console.log({announcements})
  return (
    <div className="space-y-4">
      {announcements &&
        announcements.map((item) => (
          <div
            key={item._id}
            className="bg-white p-6 rounded-lg shadow border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-3">{item.description}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-2 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Link
                  </a>
                )}
                <div className="text-sm text-gray-500">
                  Created: {new Date(item.createdAt).toLocaleDateString()}
                  {item.slug && <span className="ml-4">Slug: {item.slug}</span>}
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Edit"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(item._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnnouncementsList;
