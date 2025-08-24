import axios from 'axios';

const API_URL =
  import.meta.env.VITE_BACKEND_URL_TEAM || 'http://localhost:4000/api/team';


export const getTeamMembers = () => axios.get(API_URL);
export const createTeamMember = (data) => axios.post(API_URL, data);
export const updateTeamMember = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);
export const deleteTeamMember = (id) => axios.delete(`${API_URL}/${id}`);
