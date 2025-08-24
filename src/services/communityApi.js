import axios from 'axios';

const API_BASE =

  'https://naqvix-server.vercel.app/api/community';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 300000, // 5 minutes
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message =
        error.response.data?.message ||
        error.response.statusText ||
        'An error occurred';
      throw new Error(message);
    } else if (error.request) {
      throw new Error('Network error - please check your connection');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

export const communityAPI = {
  // Announcements
  async getAnnouncements() {
    const response = await apiClient.get('/annoucement');
    return response.data;
  },

  async createAnnouncement(data) {
    const response = await apiClient.post('/annoucement', data);
    return response.data;
  },

  async updateAnnouncement(id, data) {
    const response = await apiClient.put(`/annoucement/${id}`, data);
    return response.data;
  },

  async deleteAnnouncement(id) {
    const response = await apiClient.delete(`/annoucement/${id}`);
    return response.data;
  },

  // Videos
  async getVideos() {
    const response = await apiClient.get('/video');
    return response.data;
  },

  async createVideo(data) {
    const response = await apiClient.post('/video', data);
    return response.data;
  },

  async updateVideo(id, data) {
    const response = await apiClient.put(`/video/${id}`, data);
    return response.data;
  },

  async deleteVideo(id) {
    const response = await apiClient.delete(`/video/${id}`);
    return response.data;
  },

  // Galleries
  async getGalleries() {
    const response = await apiClient.get('/gallery');
    return response.data;
  },

  async createGallery(data, files = []) {
    const formData = new FormData();
    formData.append('title', data.title || '');
    formData.append('description', data.description || '');
    formData.append('link', data.link || '');

    files.forEach((file) => {
      formData.append('images', file);
    });

    const response = await apiClient.post('/gallery', formData);
    return response.data;
  },

  async updateGallery(id, data, files = []) {
    const formData = new FormData();
    formData.append('title', data.title || '');
    formData.append('description', data.description || '');
    formData.append('link', data.link || '');

    files.forEach((file) => {
      formData.append('images', file);
    });

    const response = await apiClient.put(`/gallery/${id}`, formData);
    return response.data;
  },

  async deleteGallery(id) {
    const response = await apiClient.delete(`/gallery/${id}`);
    return response.data;
  },
};
