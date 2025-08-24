import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import AnnouncementForm from './AnnoucementForm';
import VideoForm from './VideoForm';
import GalleryForm from './GalleryForm';
// import AnnouncementForm from './forms/AnnouncementForm';
// import VideoForm from './forms/VideoForm';
// import GalleryForm from './forms/GalleryForm';

const CreateEditModal = ({ activeTab, editingItem, onSave, onClose, getTabLabel }) => {
  const [formData, setFormData] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setFormData({ ...editingItem });
    } else {
      setFormData({});
    }
    setSelectedFiles([]);
  }, [editingItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await onSave(formData, selectedFiles);
    } catch (error) {
      // Error handling is done in parent component
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.warning('Maximum 5 images allowed');
      return;
    }
    setSelectedFiles(files);
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'announcements':
        return (
          <AnnouncementForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={onClose}
            saving={saving}
            isEditing={!!editingItem}
          />
        );
      case 'videos':
        return (
          <VideoForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={onClose}
            saving={saving}
            isEditing={!!editingItem}
          />
        );
      case 'gallery':
        return (
          <GalleryForm
            formData={formData}
            setFormData={setFormData}
            selectedFiles={selectedFiles}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            onCancel={onClose}
            saving={saving}
            isEditing={!!editingItem}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingItem ? 'Edit' : 'Create New'} {getTabLabel(activeTab).slice(0, -1)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={saving}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default CreateEditModal;