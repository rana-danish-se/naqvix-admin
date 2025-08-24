import  { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import { communityAPI } from '../services/communityApi';
import AnnouncementsList from '../components/AnnoucementsList';
import VideosList from '../components/VideoList';
import GalleriesList from '../components/GalleriesList';
import CreateEditModal from '../components/CreateEditModal';
import TabNavigation from '../components/TabNavigation';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadinSpinner';

const Community = () => {
  const [activeTab, setActiveTab] = useState('announcements');
  const [announcements, setAnnouncements] = useState([]);
  const [videos, setVideos] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch data based on active tab
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let data;
      switch (activeTab) {
        case 'announcements':
          data = await communityAPI.getAnnouncements();
          setAnnouncements(data);
          break;
        case 'videos':
          data = await communityAPI.getVideos();
          setVideos(data);
          break;
        case 'gallery':
          data = await communityAPI.getGalleries();
          setGalleries(data);
          break;
      }
    } catch (error) {
      toast.error(`Error fetching ${activeTab}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleSave = async (formData, selectedFiles) => {
    try {
      let result;
      
      if (editingItem) {
        // Update existing item
        switch (activeTab) {
          case 'announcements':
            result = await communityAPI.updateAnnouncement(editingItem._id, formData);
            break;
          case 'videos':
            result = await communityAPI.updateVideo(editingItem._id, formData);
            break;
          case 'gallery':
            result = await communityAPI.updateGallery(editingItem._id, formData, selectedFiles);
            break;
        }
        toast.success(`${getTabLabel(activeTab).slice(0, -1)} updated successfully!`);
      } else {
        // Create new item
        switch (activeTab) {
          case 'announcements':
            result = await communityAPI.createAnnouncement(formData);
            break;
          case 'videos':
            result = await communityAPI.createVideo(formData);
            break;
          case 'gallery':
            result = await communityAPI.createGallery(formData, selectedFiles);
            console.log(result)
            break;
        }
        toast.success(`${getTabLabel(activeTab).slice(0, -1)} created successfully!`);
      }
      
      closeModal();
      fetchData();
    } catch (error) {
      toast.error(`Error saving ${activeTab.slice(0, -1)}: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      switch (activeTab) {
        case 'announcements':
          await communityAPI.deleteAnnouncement(id);
          break;
        case 'videos':
          await communityAPI.deleteVideo(id);
          break;
        case 'gallery':
          await communityAPI.deleteGallery(id);
          break;
      }
      toast.success(`${getTabLabel(activeTab).slice(0, -1)} deleted successfully!`);
      fetchData();
    } catch (error) {
      toast.error(`Error deleting ${activeTab.slice(0, -1)}: ${error.message}`);
    }
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'announcements': return announcements;
      case 'videos': return videos;
      case 'gallery': return galleries;
      default: return [];
    }
  };

  const getTabLabel = (tab) => {
    switch (tab) {
      case 'announcements': return 'Announcements';
      case 'videos': return 'Videos';
      case 'gallery': return 'Gallery';
      default: return '';
    }
  };

  const renderContent = () => {
    const currentData = getCurrentData();
    
    if (loading) {
      return <LoadingSpinner />;
    }

    if (currentData.length === 0) {
      return (
        <EmptyState
          activeTab={activeTab}
          getTabLabel={getTabLabel}
          onCreateNew={() => openModal()}
        />
      );
    }

    switch (activeTab) {
      case 'announcements':
        return (
          <AnnouncementsList
            announcements={announcements}
            onEdit={openModal}
            onDelete={handleDelete}
          />
        );
      case 'videos':
        return (
          <VideosList
            videos={videos}
            onEdit={openModal}
            onDelete={handleDelete}
          />
        );
      case 'gallery':
        return (
          <GalleriesList
            galleries={galleries}
            onEdit={openModal}
            onDelete={handleDelete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Community Management</h1>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New {getTabLabel(activeTab).slice(0, -1)}
            </button>
          </div>

          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            getTabLabel={getTabLabel}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>

      {/* Modal */}
      {showModal && (
        <CreateEditModal
          activeTab={activeTab}
          editingItem={editingItem}
          onSave={handleSave}
          onClose={closeModal}
          getTabLabel={getTabLabel}
        />
      )}
    </div>
  );
};

export default Community;