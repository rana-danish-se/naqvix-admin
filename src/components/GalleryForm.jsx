import React from 'react';

const GalleryForm = ({
  formData,
  setFormData,
  selectedFiles,
  onFileChange,
  onSubmit,
  onCancel,
  saving,
  isEditing
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          required
          maxLength="150"
          value={formData.title || ''}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter gallery title"
          disabled={saving}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          rows="4"
          value={formData.description || ''}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter gallery description"
          disabled={saving}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Link (Optional)
        </label>
        <input
          type="url"
          value={formData.link || ''}
          onChange={(e) => setFormData({...formData, link: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://example.com"
          disabled={saving}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Images {!isEditing && '*'} (Max 5 images)
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onFileChange}
          required={!isEditing}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={saving}
        />
        {selectedFiles.length > 0 && (
          <p className="text-sm text-gray-600 mt-1">
            {selectedFiles.length} file(s) selected
          </p>
        )}
        {isEditing && (
          <p className="text-sm text-gray-500 mt-1">
            Leave empty to keep existing images, or select new images to replace all
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          disabled={saving}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : isEditing ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default GalleryForm;